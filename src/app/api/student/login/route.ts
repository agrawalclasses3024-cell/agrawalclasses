import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const student = await prisma.student.findUnique({ where: { email } });
    if (!student || !(await bcrypt.compare(password, student.password)))
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const token = `${student.id}:${process.env.NEXTAUTH_SECRET}`;
    const cookieStore = await cookies();
    cookieStore.set("student_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true, name: student.name });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("student_session");
  return NextResponse.json({ success: true });
}
