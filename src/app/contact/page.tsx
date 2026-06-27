import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Agrawal Classes by CA Nidhi Agrawal",
  description:
    "Get in touch with Agrawal Classes for course enquiries, admissions, and more. WhatsApp, email, or visit us at Gopalganj, Bihar.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2540] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Have questions about admissions, courses, or schedules? We&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a3c5e] mb-6">Get in Touch</h2>
            <div className="space-y-5">
              {[
                {
                  icon: "💬",
                  title: "WhatsApp (Preferred)",
                  desc: "Fastest response. Click to chat directly.",
                  action: (
                    <a
                      href="https://wa.me/917250185258"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-5 py-2 bg-green-500 text-white text-sm font-semibold rounded-full hover:bg-green-600 transition-colors"
                    >
                      Open WhatsApp
                    </a>
                  ),
                },
                {
                  icon: "📍",
                  title: "Centre Address",
                  desc: "Main Road, Gopalganj, Bihar — 841428",
                },
                {
                  icon: "▶",
                  title: "YouTube Channel",
                  desc: "Watch free lectures and live sessions — @canidhiagrawal3024",
                  action: (
                    <a
                      href="https://youtube.com/@canidhiagrawal3024"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors"
                    >
                      Visit YouTube Channel
                    </a>
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                    {item.action}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-[#f0f7ff] rounded-2xl p-6 border border-gray-200 text-center">
              <p className="text-sm text-gray-500">📍 Gopalganj, Bihar, India</p>
              <p className="text-xs text-gray-400 mt-1">Google Maps integration coming soon</p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a3c5e] mb-6">Send an Enquiry</h2>
            <form className="space-y-4" action="#" method="POST">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/30 focus:border-[#1a3c5e]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/30 focus:border-[#1a3c5e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/30 focus:border-[#1a3c5e]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Interested In <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/30 focus:border-[#1a3c5e] text-gray-600"
                >
                  <option value="">Select a course</option>
                  <option>Class 11 Commerce</option>
                  <option>Class 12 Commerce</option>
                  <option>B.Com Programme</option>
                  <option>Not sure — need guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Learning Mode
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/30 focus:border-[#1a3c5e] text-gray-600">
                  <option value="">Select mode</option>
                  <option>Live Online Classes</option>
                  <option>Face-to-Face (Gopalganj)</option>
                  <option>Recorded Video Course</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Any specific questions or requirements..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3c5e]/30 focus:border-[#1a3c5e] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#e8a020] text-white font-semibold rounded-full hover:bg-[#d4911a] transition-colors text-sm"
              >
                Submit Enquiry
              </button>
              <p className="text-xs text-gray-400 text-center">
                We typically respond within a few hours via WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
