import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Agrawal Classes <noreply@classesbycanidhiagrawal.in>";
const ADMIN_EMAIL = "agrawalclasses3024@gmail.com";

export async function sendWelcomeEmail(student: { name: string; email: string; phone: string; password: string }) {
  await resend.emails.send({
    from: FROM,
    to: student.email,
    subject: "Welcome to Agrawal Classes — Your Account is Ready!",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:32px;background:#f9fafb;border-radius:12px;">
        <div style="text-align:center;margin-bottom:24px;">
          <h2 style="color:#1a3c5e;margin:0;">Agrawal Classes</h2>
          <p style="color:#e8a020;font-size:12px;margin:4px 0 0;">by CA Nidhi Agrawal</p>
        </div>
        <div style="background:white;border-radius:10px;padding:28px;">
          <p style="color:#374151;font-size:15px;">Hi <strong>${student.name}</strong>, welcome aboard! 🎉</p>
          <p style="color:#6b7280;font-size:14px;">Your student account has been created successfully. Here are your login details:</p>
          <div style="background:#f0f7ff;border-radius:8px;padding:16px;margin:20px 0;border-left:4px solid #1a3c5e;">
            <p style="margin:0 0 8px;font-size:13px;color:#374151;"><strong>Email:</strong> ${student.email}</p>
            <p style="margin:0;font-size:13px;color:#374151;"><strong>Password:</strong> ${student.password}</p>
          </div>
          <p style="color:#6b7280;font-size:13px;">Please change your password after first login.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://classesbycanidhiagrawal.in/student/login" style="background:#1a3c5e;color:white;padding:13px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
              Login to Your Dashboard
            </a>
          </div>
          <p style="color:#6b7280;font-size:13px;">After login, you can apply for your desired course. Our team will review and activate your access.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
          <p style="color:#9ca3af;font-size:12px;">Need help? WhatsApp us: <a href="https://wa.me/917250185258" style="color:#1a3c5e;">+91 72501 85258</a></p>
        </div>
        <p style="text-align:center;color:#d1d5db;font-size:11px;margin-top:20px;">© Agrawal Classes · classesbycanidhiagrawal.in</p>
      </div>
    `,
  });
}

export async function sendAdminEnquiryAlert(enquiry: { name: string; email?: string | null; phone: string; course: string; mode?: string | null; message?: string | null }) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Enquiry: ${enquiry.name} — ${enquiry.course}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;background:#f9fafb;border-radius:12px;">
        <h3 style="color:#1a3c5e;margin:0 0 16px;">📩 New Enquiry Received</h3>
        <div style="background:white;border-radius:8px;padding:20px;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#6b7280;width:100px;">Name</td><td style="padding:6px 0;font-weight:bold;color:#111;">${enquiry.name}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;color:#111;"><a href="https://wa.me/91${enquiry.phone.replace(/\D/g,"")}" style="color:#16a34a;">${enquiry.phone}</a></td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;color:#111;">${enquiry.email || "—"}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Course</td><td style="padding:6px 0;color:#111;">${enquiry.course}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Mode</td><td style="padding:6px 0;color:#111;">${enquiry.mode || "—"}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Message</td><td style="padding:6px 0;color:#111;">${enquiry.message || "—"}</td></tr>
          </table>
        </div>
        <div style="margin-top:16px;text-align:center;">
          <a href="https://classesbycanidhiagrawal.in/admin" style="background:#1a3c5e;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:bold;">View Admin Panel</a>
        </div>
      </div>
    `,
  });
}

export async function sendAdminApplicationAlert(data: { studentName: string; studentEmail: string; studentPhone: string; course: string; mode?: string | null; message?: string | null }) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Course Application: ${data.studentName} — ${data.course}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;background:#f9fafb;border-radius:12px;">
        <h3 style="color:#1a3c5e;margin:0 0 16px;">📋 New Course Application</h3>
        <div style="background:white;border-radius:8px;padding:20px;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#6b7280;width:100px;">Student</td><td style="padding:6px 0;font-weight:bold;color:#111;">${data.studentName}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Email</td><td style="padding:6px 0;color:#111;">${data.studentEmail}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Phone</td><td style="padding:6px 0;color:#111;"><a href="https://wa.me/91${data.studentPhone.replace(/\D/g,"")}" style="color:#16a34a;">${data.studentPhone}</a></td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Course</td><td style="padding:6px 0;color:#111;">${data.course}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Mode</td><td style="padding:6px 0;color:#111;">${data.mode || "Offline"}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Message</td><td style="padding:6px 0;color:#111;">${data.message || "—"}</td></tr>
          </table>
        </div>
        <div style="margin-top:16px;text-align:center;">
          <a href="https://classesbycanidhiagrawal.in/admin" style="background:#e8a020;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:bold;">Review Application →</a>
        </div>
      </div>
    `,
  });
}

export async function sendEnrollmentConfirmation(data: { studentName: string; studentEmail: string; course: string; expiryDate: string; amount: number }) {
  const expiry = new Date(data.expiryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  await resend.emails.send({
    from: FROM,
    to: data.studentEmail,
    subject: `Course Access Activated — ${data.course}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:32px;background:#f9fafb;border-radius:12px;">
        <div style="text-align:center;margin-bottom:24px;">
          <h2 style="color:#1a3c5e;margin:0;">Agrawal Classes</h2>
          <p style="color:#e8a020;font-size:12px;margin:4px 0 0;">by CA Nidhi Agrawal</p>
        </div>
        <div style="background:white;border-radius:10px;padding:28px;">
          <p style="color:#374151;font-size:15px;">Hi <strong>${data.studentName}</strong>,</p>
          <p style="color:#6b7280;font-size:14px;">Great news! Your course enrollment has been activated. 🎉</p>
          <div style="background:#f0fdf4;border-radius:8px;padding:16px;margin:20px 0;border-left:4px solid #16a34a;">
            <p style="margin:0 0 8px;font-size:13px;color:#374151;"><strong>Course:</strong> ${data.course}</p>
            <p style="margin:0 0 8px;font-size:13px;color:#374151;"><strong>Fees Paid:</strong> ₹${data.amount.toLocaleString("en-IN")}</p>
            <p style="margin:0;font-size:13px;color:#374151;"><strong>Valid Till:</strong> ${expiry}</p>
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://classesbycanidhiagrawal.in/student/dashboard" style="background:#1a3c5e;color:white;padding:13px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
              Go to Dashboard
            </a>
          </div>
          <p style="color:#9ca3af;font-size:12px;">Need help? WhatsApp: <a href="https://wa.me/917250185258" style="color:#1a3c5e;">+91 72501 85258</a></p>
        </div>
        <p style="text-align:center;color:#d1d5db;font-size:11px;margin-top:20px;">© Agrawal Classes · classesbycanidhiagrawal.in</p>
      </div>
    `,
  });

  // Also notify admin
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Enrollment Created: ${data.studentName} — ${data.course}`,
    html: `<div style="font-family:Arial,sans-serif;padding:20px;"><h3 style="color:#1a3c5e;">✅ New Enrollment Created</h3><p><strong>${data.studentName}</strong> enrolled in <strong>${data.course}</strong></p><p>Amount: ₹${data.amount.toLocaleString("en-IN")} · Valid till: ${expiry}</p><a href="https://classesbycanidhiagrawal.in/admin" style="color:#1a3c5e;">View Admin Panel</a></div>`,
  });
}
