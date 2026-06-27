"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Forgot Password?</h1>
              <p className="text-sm text-gray-500 mb-6">
                Enter your registered email. We&apos;ll send reset instructions.
              </p>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/20 focus:border-[#1a3c5e]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1a3c5e] text-white font-semibold rounded-xl hover:bg-[#0f2540] transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Check Your Email</h2>
              <p className="text-sm text-gray-500 mb-2">
                If <strong>{email}</strong> is registered, you will receive a password reset link shortly.
              </p>
              <p className="text-xs text-gray-400 mb-6">
                (Email service will be configured soon. Please contact us on WhatsApp for immediate help.)
              </p>
              <a
                href="https://wa.me/917250185258"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-full hover:bg-green-600 transition-colors"
              >
                Contact on WhatsApp
              </a>
            </div>
          )}

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
