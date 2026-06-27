import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAdminEnquiryAlert } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, course, mode, message } = body;

    if (!name || !phone || !course) {
      return NextResponse.json({ error: "Name, phone and course are required" }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: { name, phone, email: email || null, course, mode: mode || null, message: message || null },
    });

    // Notify admin (fire and forget)
    sendAdminEnquiryAlert({ name, email, phone, course, mode, message }).catch(() => {});

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Enquiry save error:", error);
    return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 });
  }
}
