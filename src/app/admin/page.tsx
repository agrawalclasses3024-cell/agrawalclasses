"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Enquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  course: string;
  mode: string | null;
  message: string | null;
  status: string;
  createdAt: string;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  enrolled: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/enquiries")
      .then((r) => {
        if (r.status === 401) { router.push("/admin/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) { setEnquiries(data); setLoading(false); } });
  }, [router]);

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const filtered = filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);
  const counts = { all: enquiries.length, new: enquiries.filter(e => e.status === "new").length, contacted: enquiries.filter(e => e.status === "contacted").length, enrolled: enquiries.filter(e => e.status === "enrolled").length };

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Header */}
      <header className="bg-[#1a3c5e] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-bold">Agrawal Classes — Admin</p>
          <p className="text-xs text-gray-300">Enquiry Management Dashboard</p>
        </div>
        <button onClick={logout} className="px-4 py-1.5 text-sm border border-white/30 rounded-full hover:bg-white/10 transition-colors">
          Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Enquiries", value: counts.all, color: "text-[#1a3c5e]" },
            { label: "New", value: counts.new, color: "text-blue-600" },
            { label: "Contacted", value: counts.contacted, color: "text-yellow-600" },
            { label: "Enrolled", value: counts.enrolled, color: "text-green-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "new", "contacted", "enrolled", "closed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${filter === f ? "bg-[#1a3c5e] text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
            >
              {f} {f === "all" ? `(${counts.all})` : f === "new" ? `(${counts.new})` : ""}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading enquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl">No enquiries found.</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f0f7ff] text-[#1a3c5e] font-semibold">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Course</th>
                    <th className="px-4 py-3 text-left">Mode</th>
                    <th className="px-4 py-3 text-left">Message</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-400">{e.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {e.name}
                        {e.email && <p className="text-xs text-gray-400 font-normal">{e.email}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <a href={`https://wa.me/91${e.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium">
                          {e.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{e.course}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{e.mode || "—"}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate">{e.message || "—"}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(e.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[e.status] || "bg-gray-100 text-gray-500"}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={e.status}
                          onChange={(ev) => updateStatus(e.id, ev.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#1a3c5e]"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="closed">Closed</option>
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
    </div>
  );
}
