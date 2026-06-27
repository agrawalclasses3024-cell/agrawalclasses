import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();
    if (!name || !email || !phone || !password)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    const existing = await prisma.student.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const hashed = await bcrypt.hash(password, 10);
    const student = await prisma.student.create({
      data: { name, email, phone, password: hashed },
    });

    // Send welcome email with login credentials (fire and forget)
    sendWelcomeEmail({ name, email, phone, password }).catch(() => {});

    return NextResponse.json({ success: true, id: student.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
