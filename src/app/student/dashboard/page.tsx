"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Enrollment {
  id: number;
  course: string;
  amount: number;
  paymentMode: string;
  paymentDate: string;
  startDate: string;
  expiryDate: string;
  status: string;
  notes: string | null;
}

interface Application {
  id: number;
  course: string;
  mode: string | null;
  message: string | null;
  status: string;
  adminNote: string | null;
  createdAt: string;
}

interface StudentData {
  id: number;
  name: string;
  email: string;
  phone: string;
  enrollments: Enrollment[];
  applications: Application[];
}

const COURSES = [
  "Class 11 – Commerce (Full Year)",
  "Class 12 – Accounts",
  "Class 12 – Business Studies",
  "Class 12 – Economics",
  "Class 12 – Full Commerce",
  "B.Com – Accounts",
  "B.Com – Finance",
  "CA Foundation",
];

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "courses" | "apply">("overview");
  const [applyForm, setApplyForm] = useState({ course: "", mode: "offline", message: "" });
  const [applyStatus, setApplyStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetch("/api/student/me")
      .then(async (r) => {
        if (r.status === 401) { router.push("/student/login"); return; }
        const d = await r.json();
        setStudent({ ...d.student, enrollments: d.enrollments, applications: d.applications });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const logout = async () => {
    await fetch("/api/student/login", { method: "DELETE" });
    router.push("/student/login");
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);
    setApplyStatus(null);
    const res = await fetch("/api/student/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applyForm),
    });
    const data = await res.json();
    if (res.ok) {
      setApplyStatus({ type: "success", msg: "Application submitted! Admin will review and activate your course." });
      setApplyForm({ course: "", mode: "offline", message: "" });
      const me = await fetch("/api/student/me").then((r) => r.json());
      setStudent(me);
    } else {
      setApplyStatus({ type: "error", msg: data.error || "Failed to submit application." });
    }
    setApplying(false);
  };

  const activeEnrollments = student?.enrollments.filter((e) => e.status === "active") ?? [];
  const expiredEnrollments = student?.enrollments.filter((e) => e.status !== "active") ?? [];
  const pendingApps = student?.applications.filter((a) => a.status === "pending") ?? [];
  const approvedApps = student?.applications.filter((a) => a.status === "approved") ?? [];
  const rejectedApps = student?.applications.filter((a) => a.status === "rejected") ?? [];

  const daysLeft = (expiry: string) => {
    const diff = new Date(expiry).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      active: "bg-green-100 text-green-700",
      expired: "bg-gray-100 text-gray-500",
      suspended: "bg-red-100 text-red-600",
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-600",
    };
    return map[s] ?? "bg-gray-100 text-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-[#1a3c5e] font-semibold">Loading your dashboard...</div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a3c5e] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <Link href="/" className="text-base font-bold tracking-tight">Agrawal Classes</Link>
            <p className="text-[10px] text-[#e8a020] font-medium leading-tight">by CA Nidhi Agrawal</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-blue-200">Hi, {student.name.split(" ")[0]}</span>
            <button
              onClick={logout}
              className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Welcome back, {student.name.split(" ")[0]}!
          </h1>
          <p className="text-sm text-gray-500">{student.email} · {student.phone}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Active Courses", value: activeEnrollments.length, color: "text-green-600" },
            { label: "Pending Applications", value: pendingApps.length, color: "text-yellow-600" },
            { label: "Total Enrollments", value: student.enrollments.length, color: "text-blue-600" },
            { label: "Approved", value: approvedApps.length, color: "text-purple-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
          {(["overview", "courses", "apply"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 min-w-[90px] py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                tab === t ? "bg-white text-[#1a3c5e] shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "overview" ? "Overview" : t === "courses" ? "My Courses" : "Apply Now"}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Active Enrollments */}
            {activeEnrollments.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Active Courses</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {activeEnrollments.map((e) => {
                    const days = daysLeft(e.expiryDate);
                    const urgent = days <= 15;
                    return (
                      <div key={e.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm">{e.course}</h3>
                            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge(e.status)}`}>
                              {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                            </span>
                          </div>
                          <div className={`text-right text-xs font-medium ${urgent ? "text-red-500" : "text-green-600"}`}>
                            {days > 0 ? `${days} days left` : "Expired"}
                          </div>
                        </div>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex justify-between">
                            <span>Valid Till</span>
                            <span className="font-medium text-gray-700">{fmtDate(e.expiryDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fees Paid</span>
                            <span className="font-medium text-gray-700">₹{e.amount.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payment Mode</span>
                            <span className="font-medium text-gray-700 capitalize">{e.paymentMode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payment Date</span>
                            <span className="font-medium text-gray-700">{fmtDate(e.paymentDate)}</span>
                          </div>
                        </div>
                        {urgent && days > 0 && (
                          <div className="mt-3 p-2 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
                            ⚠️ Expiring soon! Contact us to renew.
                          </div>
                        )}
                        {days <= 0 && (
                          <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
                            Course access has expired. Please contact to renew.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Pending Applications */}
            {pendingApps.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Pending Applications</h2>
                <div className="space-y-2">
                  {pendingApps.map((a) => (
                    <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{a.course}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Applied {fmtDate(a.createdAt)} · {a.mode || "Offline"}</div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-yellow-100 text-yellow-700">
                        Pending Review
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">Admin will review and activate your course after payment confirmation.</p>
              </section>
            )}

            {/* Nothing enrolled */}
            {activeEnrollments.length === 0 && pendingApps.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-gray-700 font-semibold mb-2">No Active Courses</h3>
                <p className="text-sm text-gray-400 mb-4">Apply for a course to get started.</p>
                <button
                  onClick={() => setTab("apply")}
                  className="px-6 py-2.5 bg-[#e8a020] text-white text-sm font-semibold rounded-full hover:bg-[#d4911a] transition-colors"
                >
                  Apply for a Course
                </button>
              </div>
            )}
          </div>
        )}

        {/* MY COURSES TAB */}
        {tab === "courses" && (
          <div className="space-y-6">
            {student.enrollments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🎓</div>
                <p className="text-gray-500 text-sm">No enrollments yet.</p>
                <button onClick={() => setTab("apply")} className="mt-4 px-5 py-2 bg-[#e8a020] text-white text-sm font-semibold rounded-full">
                  Apply Now
                </button>
              </div>
            ) : (
              <>
                {/* All Enrollments Table */}
                <div>
                  <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Enrollment History</h2>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wide">
                          <th className="py-3 px-4 text-left font-medium">Course</th>
                          <th className="py-3 px-4 text-left font-medium hidden sm:table-cell">Amount</th>
                          <th className="py-3 px-4 text-left font-medium hidden sm:table-cell">Payment</th>
                          <th className="py-3 px-4 text-left font-medium">Expiry</th>
                          <th className="py-3 px-4 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {student.enrollments.map((e) => (
                          <tr key={e.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-800">{e.course}</div>
                              <div className="text-xs text-gray-400 sm:hidden">₹{e.amount.toLocaleString("en-IN")} · {fmtDate(e.paymentDate)}</div>
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell text-gray-700 font-medium">
                              ₹{e.amount.toLocaleString("en-IN")}
                            </td>
                            <td className="py-3 px-4 hidden sm:table-cell text-gray-500">
                              {fmtDate(e.paymentDate)}
                              <div className="text-xs capitalize">{e.paymentMode}</div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 text-xs">{fmtDate(e.expiryDate)}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium ${statusBadge(e.status)}`}>
                                {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Applications History */}
                {student.applications.length > 0 && (
                  <div>
                    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Application History</h2>
                    <div className="space-y-2">
                      {student.applications.map((a) => (
                        <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{a.course}</div>
                              <div className="text-xs text-gray-400 mt-0.5">Applied {fmtDate(a.createdAt)}</div>
                              {a.adminNote && (
                                <div className="mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                  Admin note: {a.adminNote}
                                </div>
                              )}
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBadge(a.status)}`}>
                              {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* APPLY TAB */}
        {tab === "apply" && (
          <div className="max-w-lg">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-1">Apply for a Course</h2>
              <p className="text-sm text-gray-500 mb-5">
                Submit your application. Admin will review and activate after payment confirmation.
              </p>

              {applyStatus && (
                <div className={`mb-4 p-3 rounded-xl text-sm ${
                  applyStatus.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-600"
                }`}>
                  {applyStatus.msg}
                </div>
              )}

              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Course *</label>
                  <select
                    required
                    value={applyForm.course}
                    onChange={(e) => setApplyForm({ ...applyForm, course: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20 focus:border-[#1a3c5e] bg-white"
                  >
                    <option value="">-- Choose a course --</option>
                    {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Study *</label>
                  <div className="flex gap-3">
                    {["offline", "online"].map((m) => (
                      <label key={m} className={`flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-xl cursor-pointer text-sm transition-all ${
                        applyForm.mode === m
                          ? "border-[#1a3c5e] bg-[#1a3c5e]/5 text-[#1a3c5e] font-medium"
                          : "border-gray-200 text-gray-500"
                      }`}>
                        <input
                          type="radio" name="mode" value={m} className="sr-only"
                          checked={applyForm.mode === m}
                          onChange={() => setApplyForm({ ...applyForm, mode: m })}
                        />
                        {m === "offline" ? "🏫 Offline" : "💻 Online"}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message <span className="text-gray-400">(optional)</span></label>
                  <textarea
                    rows={3}
                    value={applyForm.message}
                    onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                    placeholder="Any specific queries or requirements..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20 focus:border-[#1a3c5e] resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={applying}
                  className="w-full py-3 bg-[#e8a020] text-white font-semibold rounded-xl hover:bg-[#d4911a] transition-colors disabled:opacity-60"
                >
                  {applying ? "Submitting..." : "Submit Application"}
                </button>
              </form>

              <div className="mt-5 p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-blue-700 font-medium mb-1">After submission:</p>
                <ul className="text-xs text-blue-600 space-y-1 list-disc list-inside">
                  <li>Admin reviews your application</li>
                  <li>You&apos;ll be contacted for payment (Cash / PhonePe / UPI)</li>
                  <li>Course access is activated after payment confirmation</li>
                </ul>
                <a
                  href="https://wa.me/917250185258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-green-700 font-semibold hover:underline"
                >
                  <span>💬</span> Quick query? WhatsApp us
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
