import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const className = searchParams.get("class") || undefined;
    
    const students = await db.student.findMany({
      where: className ? { class: className } : undefined
    });
    return NextResponse.json(students);
  } catch (error: any) {
    console.error("GET students error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id, name, class: className, rollNo, parentName, parentPhone, parentEmail, attendance, photo, academicRecord, bulkData } = body;

    if (action === "create") {
      if (!name || !className || !rollNo) {
        return NextResponse.json({ error: "Name, Class, and Roll No are required" }, { status: 400 });
      }
      const student = await db.student.create({
        data: {
          name,
          class: className,
          rollNo,
          parentName: parentName || "",
          parentPhone: parentPhone || "",
          parentEmail: parentEmail || "",
          attendance: parseFloat(attendance) || 100.0,
          photo,
          academicRecord: academicRecord || "{}"
        }
      });
      return NextResponse.json(student);
    }

    if (action === "update") {
      if (!id) {
        return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
      }
      const updated = await db.student.update({
        where: { id },
        data: {
          name,
          class: className,
          rollNo,
          parentName,
          parentPhone,
          parentEmail,
          attendance: parseFloat(attendance) || 100.0,
          photo,
          academicRecord
        }
      });
      return NextResponse.json(updated);
    }

    if (action === "delete") {
      if (!id) {
        return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
      }
      const deleted = await db.student.delete({
        where: { id }
      });
      return NextResponse.json(deleted);
    }

    if (action === "import") {
      if (!bulkData || !Array.isArray(bulkData)) {
        return NextResponse.json({ error: "Valid CSV bulk array data is required" }, { status: 400 });
      }
      // bulkData is an array of student objects
      const imported = await db.student.createMany({
        data: bulkData.map(item => ({
          name: item.name,
          class: item.class || "I",
          rollNo: String(item.rollNo || Date.now()),
          parentName: item.parentName || "",
          parentPhone: String(item.parentPhone || ""),
          parentEmail: item.parentEmail || "",
          attendance: parseFloat(item.attendance) || 100.0,
          academicRecord: item.academicRecord || "{}",
          photo: item.photo || null
        }))
      });
      return NextResponse.json(imported);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("POST students error:", error);
    return NextResponse.json({ error: error.message || "Failed to perform student database action" }, { status: 500 });
  }
}
