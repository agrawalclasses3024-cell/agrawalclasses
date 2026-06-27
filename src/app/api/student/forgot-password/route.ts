import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const student = await prisma.student.findUnique({ where: { email } });

  // Always return success (don't reveal if email exists)
  if (!student) return NextResponse.json({ success: true });

  const token = crypto.randomBytes(32).toString("hex");
  await prisma.student.update({ where: { email }, data: { resetToken: token } });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://classesbycanidhiagrawal.in";
  const resetLink = `${siteUrl}/student/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Agrawal Classes <noreply@classesbycanidhiagrawal.in>",
    to: email,
    subject: "Reset Your Password — Agrawal Classes",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9fafb;border-radius:12px;">
        <div style="text-align:center;margin-bottom:24px;">
          <h2 style="color:#1a3c5e;margin:0;">Agrawal Classes</h2>
          <p style="color:#e8a020;font-size:12px;margin:4px 0 0;">by CA Nidhi Agrawal</p>
        </div>
        <div style="background:white;border-radius:10px;padding:28px;">
          <p style="color:#374151;font-size:15px;">Hi <strong>${student.name}</strong>,</p>
          <p style="color:#6b7280;font-size:14px;">We received a request to reset your password. Click the button below to set a new password.</p>
          <div style="text-align:center;margin:28px 0;">
            <a href="${resetLink}" style="background:#1a3c5e;color:white;padding:13px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
              Reset Password
            </a>
          </div>
          <p style="color:#9ca3af;font-size:12px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
          <p style="color:#9ca3af;font-size:12px;">Or copy this link:<br/><a href="${resetLink}" style="color:#1a3c5e;word-break:break-all;">${resetLink}</a></p>
        </div>
        <p style="text-align:center;color:#d1d5db;font-size:11px;margin-top:20px;">© Agrawal Classes · classesbycanidhiagrawal.in</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
