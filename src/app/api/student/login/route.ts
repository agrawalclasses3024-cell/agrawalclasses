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

    const response = NextResponse.json({ success: true, name: student.name });
    response.cookies.set("student_session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("student_session", "", { maxAge: 0, path: "/" });
  return response;
}
