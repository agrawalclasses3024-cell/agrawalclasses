import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

  const student = await prisma.student.findFirst({ where: { resetToken: token } });
  if (!student) return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  await prisma.student.update({
    where: { id: student.id },
    data: { password: hashed, resetToken: null },
  });

  return NextResponse.json({ success: true });
}
