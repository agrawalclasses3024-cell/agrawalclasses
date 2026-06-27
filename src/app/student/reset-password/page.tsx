"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";

  const [form, setForm] = useState({ password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">❌</div>
        <p className="text-gray-600 font-medium">Invalid reset link.</p>
        <Link href="/student/forgot-password" className="mt-4 inline-block text-[#1a3c5e] text-sm font-medium hover:underline">
          Request a new one
        </Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("Passwords do not match");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    const res = await fetch("/api/student/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: form.password }),
    });
    const data = await res.json();
    if (res.ok) {
      setDone(true);
      setTimeout(() => router.push("/student/login"), 2500);
    } else {
      setError(data.error || "Reset failed. Link may have expired.");
    }
    setLoading(false);
  };

  const inp = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20 focus:border-[#1a3c5e]";

  return done ? (
    <div className="text-center py-6">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Password Reset!</h2>
      <p className="text-sm text-gray-500">Redirecting you to sign in...</p>
    </div>
  ) : (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Set New Password</h1>
      <p className="text-sm text-gray-500 mb-6">Choose a strong password for your account.</p>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>
      )}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input type="password" required value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Min. 6 characters" className={inp} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input type="password" required value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            placeholder="Repeat password" className={inp} />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3 bg-[#1a3c5e] text-white font-semibold rounded-xl hover:bg-[#0f2540] transition-colors disabled:opacity-60">
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <p className="text-xl font-bold text-[#1a3c5e]">Agrawal Classes</p>
            <p className="text-xs text-[#e8a020] font-semibold">by CA Nidhi Agrawal</p>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Suspense>
            <ResetForm />
          </Suspense>
          <div className="text-center mt-6">
            <Link href="/student/login" className="text-sm text-[#1a3c5e] font-medium hover:underline">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
