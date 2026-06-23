import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.adminUser.findMany();
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("GET admin users error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch admin users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id, email, name, role, status } = body;

    if (action === "create") {
      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }
      const newAdmin = await db.adminUser.create({
        data: {
          email,
          name,
          role: role || "ADMIN",
          status: status || "ACTIVE",
          clerkId: `clerk_${Date.now()}`
        }
      });
      return NextResponse.json(newAdmin);
    }

    if (action === "update") {
      if (!id) {
        return NextResponse.json({ error: "Admin ID is required" }, { status: 400 });
      }
      const updated = await db.adminUser.update({
        where: { id },
        data: {
          name,
          role,
          status,
          lastSeen: new Date().toISOString()
        }
      });
      return NextResponse.json(updated);
    }

    if (action === "delete") {
      if (!id) {
        return NextResponse.json({ error: "Admin ID is required" }, { status: 400 });
      }
      const deleted = await db.adminUser.delete({
        where: { id }
      });
      return NextResponse.json(deleted);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("POST admin users error:", error);
    return NextResponse.json({ error: error.message || "Failed to perform admin action" }, { status: 500 });
  }
}
