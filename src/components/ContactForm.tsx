"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", course: "", mode: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", course: "", mode: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/30 focus:border-[#1a3c5e]";

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#1a3c5e] mb-6">Send an Enquiry</h2>

      {status === "success" && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
          ✅ Enquiry submitted successfully! We will contact you within a few hours via WhatsApp.
        </div>
      )}
      {status === "error" && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          Something went wrong. Please try again or WhatsApp us directly.
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Interested In <span className="text-red-500">*</span>
          </label>
          <select name="course" required value={form.course} onChange={handleChange} className={`${inputClass} text-gray-600`}>
            <option value="">Select a course</option>
            <option>Class 11 Commerce</option>
            <option>Class 12 Commerce</option>
            <option>B.Com Programme</option>
            <option>Not sure — need guidance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Learning Mode</label>
          <select name="mode" value={form.mode} onChange={handleChange} className={`${inputClass} text-gray-600`}>
            <option value="">Select mode</option>
            <option>Live Online Classes</option>
            <option>Face-to-Face (Gopalganj)</option>
            <option>Recorded Video Course</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Any specific questions or requirements..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 bg-[#e8a020] text-white font-semibold rounded-full hover:bg-[#d4911a] transition-colors text-sm disabled:opacity-60"
        >
          {status === "loading" ? "Submitting..." : "Submit Enquiry"}
        </button>
        <p className="text-xs text-gray-400 text-center">
          We typically respond within a few hours via WhatsApp.
        </p>
      </form>
    </div>
  );
}
