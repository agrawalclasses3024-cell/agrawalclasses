"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Enquiry = {
  id: number; name: string; phone: string; email: string | null;
  course: string; mode: string | null; message: string | null; status: string; createdAt: string;
};

type Application = {
  id: number; course: string; mode: string | null; message: string | null;
  status: string; adminNote: string | null; createdAt: string;
  student: { id: number; name: string; email: string; phone: string };
  enrollment: { id: number } | null;
};

type Enrollment = {
  id: number; course: string; amount: number; paymentMode: string;
  paymentDate: string; startDate: string; expiryDate: string;
  status: string; notes: string | null; createdAt: string;
  student: { id: number; name: string; email: string; phone: string };
};

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const badge = (s: string) => {
  const m: Record<string, string> = {
    new: "bg-blue-100 text-blue-700", contacted: "bg-yellow-100 text-yellow-700",
    enrolled: "bg-green-100 text-green-700", closed: "bg-gray-100 text-gray-500",
    pending: "bg-yellow-100 text-yellow-700", approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600", active: "bg-green-100 text-green-700",
    expired: "bg-gray-100 text-gray-500", suspended: "bg-red-100 text-red-600",
  };
  return m[s] ?? "bg-gray-100 text-gray-500";
};

const today = () => new Date().toISOString().split("T")[0];

const EMPTY_ENROLLMENT = {
  applicationId: 0, amount: "", paymentMode: "cash", paymentDate: today(),
  startDate: today(), expiryDate: "", notes: "",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"enquiries" | "applications" | "enrollments">("enquiries");

  // Enquiries
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [eqFilter, setEqFilter] = useState("all");

  // Applications
  const [applications, setApplications] = useState<Application[]>([]);
  const [appFilter, setAppFilter] = useState("pending");
  const [appNote, setAppNote] = useState<Record<number, string>>({});
  const [enrollForm, setEnrollForm] = useState(EMPTY_ENROLLMENT);
  const [enrollModal, setEnrollModal] = useState<Application | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  // Enrollments
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [editEnroll, setEditEnroll] = useState<Enrollment | null>(null);
  const [editForm, setEditForm] = useState({ status: "", expiryDate: "", notes: "" });

  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [eq, ap, en] = await Promise.all([
      fetch("/api/admin/enquiries").then((r) => { if (r.status === 401) router.push("/admin/login"); return r.json(); }),
      fetch("/api/admin/applications").then((r) => r.json()),
      fetch("/api/admin/enrollments").then((r) => r.json()),
    ]);
    setEnquiries(Array.isArray(eq) ? eq : []);
    setApplications(Array.isArray(ap) ? ap : []);
    setEnrollments(Array.isArray(en) ? en : []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const logout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); router.push("/admin/login"); };

  // Enquiry status update
  const updateEnqStatus = async (id: number, status: string) => {
    await fetch("/api/admin/enquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  // Application status update
  const updateAppStatus = async (id: number, status: string) => {
    await fetch("/api/admin/applications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status, adminNote: appNote[id] || undefined }) });
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  // Enrollment create
  const submitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnrolling(true);
    setEnrollMsg(null);
    const res = await fetch("/api/admin/enrollment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...enrollForm, amount: parseFloat(enrollForm.amount), applicationId: enrollModal!.id }),
    });
    const data = await res.json();
    if (res.ok) {
      setEnrollMsg({ type: "ok", msg: "Enrollment created successfully!" });
      setEnrollForm(EMPTY_ENROLLMENT);
      await fetchAll();
      setTimeout(() => { setEnrollModal(null); setEnrollMsg(null); }, 1500);
    } else {
      setEnrollMsg({ type: "err", msg: data.error || "Failed to create enrollment." });
    }
    setEnrolling(false);
  };

  // Enrollment update
  const submitEditEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/enrollment", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editEnroll!.id, ...editForm }),
    });
    await fetchAll();
    setEditEnroll(null);
  };

  const filteredEq = eqFilter === "all" ? enquiries : enquiries.filter((e) => e.status === eqFilter);
  const filteredApp = appFilter === "all" ? applications : applications.filter((a) => a.status === appFilter);

  const pendingCount = applications.filter((a) => a.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header */}
      <header className="bg-[#1a3c5e] text-white px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow">
        <div>
          <p className="font-bold text-sm sm:text-base">Agrawal Classes — Admin Panel</p>
          <p className="text-xs text-gray-300">Management Dashboard</p>
        </div>
        <button onClick={logout} className="px-4 py-1.5 text-sm border border-white/30 rounded-full hover:bg-white/10 transition-colors">
          Logout
        </button>
      </header>

      {/* Main Tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6 overflow-x-auto">
          {([
            { key: "enquiries", label: "Enquiries", count: enquiries.filter(e => e.status === "new").length },
            { key: "applications", label: "Applications", count: pendingCount },
            { key: "enrollments", label: "Enrollments", count: null },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                tab === t.key ? "bg-[#1a3c5e] text-white shadow" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t.label}
              {t.count !== null && t.count > 0 && (
                <span className={`text-xs rounded-full px-1.5 py-0.5 ${tab === t.key ? "bg-white/20" : "bg-red-500 text-white"}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : (
          <>
            {/* ─── ENQUIRIES TAB ─── */}
            {tab === "enquiries" && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total", value: enquiries.length, color: "text-[#1a3c5e]" },
                    { label: "New", value: enquiries.filter(e => e.status === "new").length, color: "text-blue-600" },
                    { label: "Contacted", value: enquiries.filter(e => e.status === "contacted").length, color: "text-yellow-600" },
                    { label: "Enrolled", value: enquiries.filter(e => e.status === "enrolled").length, color: "text-green-600" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
                      <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                  {["all", "new", "contacted", "enrolled", "closed"].map((f) => (
                    <button key={f} onClick={() => setEqFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${eqFilter === f ? "bg-[#1a3c5e] text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}>
                      {f}
                    </button>
                  ))}
                </div>

                {filteredEq.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 bg-white rounded-2xl">No enquiries found.</div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-[#f0f7ff] text-[#1a3c5e] text-xs font-semibold">
                          <tr>
                            {["#", "Name", "Phone", "Course", "Mode", "Message", "Date", "Status", "Update"].map(h => (
                              <th key={h} className="px-4 py-3 text-left">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredEq.map((e) => (
                            <tr key={e.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-gray-400">{e.id}</td>
                              <td className="px-4 py-3 font-medium text-gray-800">
                                {e.name}
                                {e.email && <p className="text-xs text-gray-400">{e.email}</p>}
                              </td>
                              <td className="px-4 py-3">
                                <a href={`https://wa.me/91${e.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium">
                                  {e.phone}
                                </a>
                              </td>
                              <td className="px-4 py-3 text-gray-700">{e.course}</td>
                              <td className="px-4 py-3 text-gray-500 text-xs">{e.mode || "—"}</td>
                              <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate">{e.message || "—"}</td>
                              <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{fmtDate(e.createdAt)}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${badge(e.status)}`}>{e.status}</span>
                              </td>
                              <td className="px-4 py-3">
                                <select value={e.status} onChange={(ev) => updateEnqStatus(e.id, ev.target.value)}
                                  className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#1a3c5e]">
                                  {["new", "contacted", "enrolled", "closed"].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ─── APPLICATIONS TAB ─── */}
            {tab === "applications" && (
              <div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {["pending", "approved", "rejected", "all"].map((f) => (
                    <button key={f} onClick={() => setAppFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${appFilter === f ? "bg-[#1a3c5e] text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}>
                      {f} ({applications.filter(a => f === "all" ? true : a.status === f).length})
                    </button>
                  ))}
                </div>

                {filteredApp.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 bg-white rounded-2xl">No applications.</div>
                ) : (
                  <div className="space-y-4">
                    {filteredApp.map((a) => (
                      <div key={a.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-gray-800">{a.student.name}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge(a.status)}`}>
                                {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {a.student.email} ·{" "}
                              <a href={`https://wa.me/91${a.student.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                {a.student.phone}
                              </a>
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs">
                              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{a.course}</span>
                              {a.mode && <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{a.mode}</span>}
                              <span className="text-gray-400">Applied {fmtDate(a.createdAt)}</span>
                            </div>
                            {a.message && <p className="text-xs text-gray-500 mt-1 italic">&ldquo;{a.message}&rdquo;</p>}
                            {a.adminNote && (
                              <p className="text-xs text-blue-600 mt-1 bg-blue-50 px-2 py-1 rounded">Admin note: {a.adminNote}</p>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 min-w-[140px]">
                            {a.status === "pending" && (
                              <>
                                <input
                                  type="text"
                                  placeholder="Add note (optional)"
                                  value={appNote[a.id] || ""}
                                  onChange={(e) => setAppNote({ ...appNote, [a.id]: e.target.value })}
                                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#1a3c5e]"
                                />
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => { setEnrollModal(a); setEnrollForm({ ...EMPTY_ENROLLMENT }); }}
                                    className="flex-1 py-1.5 bg-[#e8a020] text-white text-xs font-semibold rounded-lg hover:bg-[#d4911a]"
                                  >
                                    Enroll
                                  </button>
                                  <button
                                    onClick={() => updateAppStatus(a.id, "rejected")}
                                    className="flex-1 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </>
                            )}
                            {a.status === "approved" && !a.enrollment && (
                              <button
                                onClick={() => { setEnrollModal(a); setEnrollForm({ ...EMPTY_ENROLLMENT }); }}
                                className="py-1.5 px-3 bg-[#e8a020] text-white text-xs font-semibold rounded-lg hover:bg-[#d4911a]"
                              >
                                Create Enrollment
                              </button>
                            )}
                            {a.enrollment && (
                              <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-lg text-center">✓ Enrolled</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ─── ENROLLMENTS TAB ─── */}
            {tab === "enrollments" && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total", value: enrollments.length, color: "text-[#1a3c5e]" },
                    { label: "Active", value: enrollments.filter(e => e.status === "active").length, color: "text-green-600" },
                    { label: "Expired", value: enrollments.filter(e => e.status === "expired").length, color: "text-gray-500" },
                    { label: "Revenue", value: `₹${enrollments.reduce((s, e) => s + e.amount, 0).toLocaleString("en-IN")}`, color: "text-[#e8a020]" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
                      <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                {enrollments.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 bg-white rounded-2xl">No enrollments yet.</div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-[#f0f7ff] text-[#1a3c5e] text-xs font-semibold">
                          <tr>
                            {["Student", "Course", "Amount", "Payment", "Start", "Expiry", "Status", "Manage"].map(h => (
                              <th key={h} className="px-4 py-3 text-left">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {enrollments.map((en) => (
                            <tr key={en.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="font-medium text-gray-800">{en.student.name}</div>
                                <div className="text-xs text-gray-400">{en.student.email}</div>
                                <a href={`https://wa.me/91${en.student.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">{en.student.phone}</a>
                              </td>
                              <td className="px-4 py-3 text-gray-700 text-xs max-w-[140px]">{en.course}</td>
                              <td className="px-4 py-3 font-medium text-gray-800">₹{en.amount.toLocaleString("en-IN")}</td>
                              <td className="px-4 py-3 text-gray-500 text-xs">
                                {fmtDate(en.paymentDate)}
                                <div className="capitalize">{en.paymentMode}</div>
                              </td>
                              <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{fmtDate(en.startDate)}</td>
                              <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{fmtDate(en.expiryDate)}</td>
                              <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge(en.status)}`}>
                                  {en.status.charAt(0).toUpperCase() + en.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => { setEditEnroll(en); setEditForm({ status: en.status, expiryDate: en.expiryDate.split("T")[0], notes: en.notes || "" }); }}
                                  className="text-xs px-3 py-1 bg-[#1a3c5e]/10 text-[#1a3c5e] rounded-lg hover:bg-[#1a3c5e]/20"
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* ─── ENROLLMENT MODAL ─── */}
      {enrollModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Create Enrollment</h2>
                <button onClick={() => { setEnrollModal(null); setEnrollMsg(null); }} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
              <div className="mb-4 p-3 bg-blue-50 rounded-xl text-sm">
                <p className="font-medium text-blue-800">{enrollModal.student.name}</p>
                <p className="text-blue-600 text-xs">{enrollModal.course}</p>
              </div>

              {enrollMsg && (
                <div className={`mb-4 p-3 rounded-xl text-sm ${enrollMsg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                  {enrollMsg.msg}
                </div>
              )}

              <form onSubmit={submitEnrollment} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Amount (₹) *</label>
                    <input type="number" required value={enrollForm.amount}
                      onChange={e => setEnrollForm({ ...enrollForm, amount: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e]"
                      placeholder="e.g. 5000" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Payment Mode *</label>
                    <select value={enrollForm.paymentMode}
                      onChange={e => setEnrollForm({ ...enrollForm, paymentMode: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e] bg-white">
                      <option value="cash">Cash</option>
                      <option value="phonepay">PhonePay</option>
                      <option value="upi">UPI</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Payment Date *</label>
                  <input type="date" required value={enrollForm.paymentDate}
                    onChange={e => setEnrollForm({ ...enrollForm, paymentDate: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Start Date *</label>
                    <input type="date" required value={enrollForm.startDate}
                      onChange={e => setEnrollForm({ ...enrollForm, startDate: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Expiry Date *</label>
                    <input type="date" required value={enrollForm.expiryDate}
                      onChange={e => setEnrollForm({ ...enrollForm, expiryDate: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Notes (optional)</label>
                  <textarea rows={2} value={enrollForm.notes}
                    onChange={e => setEnrollForm({ ...enrollForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e] resize-none"
                    placeholder="Any internal notes..." />
                </div>
                <button type="submit" disabled={enrolling}
                  className="w-full py-3 bg-[#e8a020] text-white font-bold rounded-xl hover:bg-[#d4911a] disabled:opacity-60">
                  {enrolling ? "Creating..." : "Activate Enrollment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ─── EDIT ENROLLMENT MODAL ─── */}
      {editEnroll && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Update Enrollment</h2>
                <button onClick={() => setEditEnroll(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
              <div className="mb-4 p-3 bg-gray-50 rounded-xl text-sm">
                <p className="font-medium text-gray-800">{editEnroll.student.name}</p>
                <p className="text-gray-500 text-xs">{editEnroll.course}</p>
              </div>
              <form onSubmit={submitEditEnroll} className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Status</label>
                  <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e] bg-white">
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">New Expiry Date</label>
                  <input type="date" value={editForm.expiryDate} onChange={e => setEditForm({ ...editForm, expiryDate: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Notes</label>
                  <textarea rows={2} value={editForm.notes} onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3c5e] resize-none" />
                </div>
                <button type="submit" className="w-full py-3 bg-[#1a3c5e] text-white font-bold rounded-xl hover:bg-[#0f2540]">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
