import { NextRequest, NextResponse } from "next/server";
import { getStudentSession } from "@/lib/studentAuth";
import { prisma } from "@/lib/prisma";
import { sendAdminApplicationAlert } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const student = await getStudentSession();
  if (!student) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { course, mode, message } = await req.json();
  if (!course) return NextResponse.json({ error: "Course is required" }, { status: 400 });

  const existing = await prisma.application.findFirst({
    where: { studentId: student.id, course, status: { in: ["pending", "approved"] } },
  });
  if (existing)
    return NextResponse.json({ error: "You have already applied for this course" }, { status: 409 });

  const application = await prisma.application.create({
    data: { studentId: student.id, course, mode: mode || null, message: message || null },
  });

  // Notify admin (fire and forget)
  sendAdminApplicationAlert({
    studentName: student.name,
    studentEmail: student.email,
    studentPhone: student.phone,
    course,
    mode,
    message,
  }).catch(() => {});

  return NextResponse.json({ success: true, id: application.id }, { status: 201 });
}
