import { NextResponse } from "next/server";
import { getStudentSession } from "@/lib/studentAuth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const student = await getStudentSession();
  if (!student) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: "desc" },
  });

  const applications = await prisma.application.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: "desc" },
    include: { enrollment: true },
  });

  return NextResponse.json({ student, enrollments, applications });
}
