import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const settings = await db.syncSettings.findFirst();
    const logs = await db.editorialLog.findMany();
    
    // Parse customCategories string to array for the client
    let customCategoriesArray: string[] = [];
    if (settings && settings.customCategories) {
      customCategoriesArray = settings.customCategories
        .split(",")
        .map((c: string) => c.trim())
        .filter(Boolean);
    }

    const formattedSettings = settings ? {
      ...settings,
      customCategories: customCategoriesArray
    } : null;

    return NextResponse.json({ settings: formattedSettings, logs });
  } catch (error: any) {
    console.error("GET settings error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { autoPublish, highFrequency, regionalSync, category, scheduleTime, customCategories } = body;

    // Convert customCategories array back to comma-separated string for DB
    let customCategoriesString = undefined;
    if (Array.isArray(customCategories)) {
      customCategoriesString = customCategories
        .map((c: string) => c.trim())
        .filter(Boolean)
        .join(",");
    }

    const updated = await db.syncSettings.update({
      data: {
        autoPublish: autoPublish !== undefined ? autoPublish : undefined,
        highFrequency: highFrequency !== undefined ? highFrequency : undefined,
        regionalSync: regionalSync !== undefined ? regionalSync : undefined,
        category: category || undefined,
        scheduleTime: scheduleTime || undefined,
        customCategories: customCategoriesString
      }
    });

    // Parse customCategories string back to array for response
    let responseCategories: string[] = [];
    if (updated.customCategories) {
      responseCategories = updated.customCategories
        .split(",")
        .map((c: string) => c.trim())
        .filter(Boolean);
    }

    await db.editorialLog.create({
      data: {
        level: "INFO",
        message: `Sync configurations updated: Auto-Publish = ${updated.autoPublish}, Category = ${updated.category}, Time = ${updated.scheduleTime}`
      }
    });

    return NextResponse.json({
      ...updated,
      customCategories: responseCategories
    });
  } catch (error: any) {
    console.error("POST settings error:", error);
    return NextResponse.json({ error: error.message || "Failed to save settings" }, { status: 500 });
  }
}

