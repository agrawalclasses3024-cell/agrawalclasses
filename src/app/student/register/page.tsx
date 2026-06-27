"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("Passwords do not match");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    const res = await fetch("/api/student/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/student/login?registered=1");
    } else {
      setError(data.error || "Registration failed");
    }
    setLoading(false);
  };

  const inp = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20 focus:border-[#1a3c5e] transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <p className="text-xl font-bold text-[#1a3c5e]">Agrawal Classes</p>
            <p className="text-xs text-[#e8a020] font-semibold">by CA Nidhi Agrawal</p>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
          <p className="text-sm text-gray-500 mb-6">Join Agrawal Classes and start learning</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input name="name" type="text" required value={form.name} onChange={handle} placeholder="Your full name" className={inp} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input name="email" type="email" required value={form.email} onChange={handle} placeholder="your@email.com" className={inp} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
              <input name="phone" type="tel" required value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" className={inp} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input name="password" type="password" required value={form.password} onChange={handle} placeholder="Min. 6 characters" className={inp} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input name="confirm" type="password" required value={form.confirm} onChange={handle} placeholder="Repeat password" className={inp} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#e8a020] text-white font-semibold rounded-xl hover:bg-[#d4911a] transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/student/login" className="text-[#1a3c5e] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
