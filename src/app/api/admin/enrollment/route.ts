import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sendEnrollmentConfirmation } from "@/lib/email";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.NEXTAUTH_SECRET;
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { applicationId, amount, paymentMode, paymentDate, startDate, expiryDate, notes } = await req.json();

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { student: true },
  });
  if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });

  const enrollment = await prisma.enrollment.create({
    data: {
      studentId: application.studentId,
      applicationId,
      course: application.course,
      amount: parseFloat(amount),
      paymentMode: paymentMode || "cash",
      paymentDate: new Date(paymentDate),
      startDate: new Date(startDate),
      expiryDate: new Date(expiryDate),
      notes: notes || null,
      status: "active",
    },
  });

  await prisma.application.update({
    where: { id: applicationId },
    data: { status: "approved" },
  });

  // Send confirmation email to student + notify admin (fire and forget)
  sendEnrollmentConfirmation({
    studentName: application.student.name,
    studentEmail: application.student.email,
    course: application.course,
    expiryDate: expiryDate,
    amount: parseFloat(amount),
  }).catch(() => {});

  return NextResponse.json({ success: true, enrollment });
}

export async function PATCH(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status, expiryDate, notes } = await req.json();
  const updated = await prisma.enrollment.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(expiryDate && { expiryDate: new Date(expiryDate) }),
      ...(notes !== undefined && { notes }),
    },
  });
  return NextResponse.json(updated);
}
