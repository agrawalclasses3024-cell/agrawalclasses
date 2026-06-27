import Link from "next/link";

const stats = [
  { value: "5,000+", label: "Students Taught" },
  { value: "10+", label: "Years of Experience" },
  { value: "CA Qualified", label: "Expert Educator" },
  { value: "Pan-India", label: "Online Reach" },
];

const batches = [
  {
    title: "Class 11 Commerce",
    subjects: ["Accountancy", "Business Studies", "Economics"],
    modes: ["Live Online", "Face-to-Face", "Recorded"],
    href: "/courses#class11",
  },
  {
    title: "Class 12 Commerce",
    subjects: ["Accountancy", "Business Studies", "Economics"],
    modes: ["Live Online", "Face-to-Face", "Recorded"],
    href: "/courses#class12",
  },
  {
    title: "B.Com Programme",
    subjects: ["Financial Accounting", "Business Law", "Cost Accounting"],
    modes: ["Live Online", "Recorded"],
    href: "/courses#bcom",
  },
];

const testimonials = [
  {
    name: "Priya Singh",
    grade: "Class 12 — 94% in Accounts",
    quote:
      "CA Nidhi ma'am explains every concept with such clarity. I went from struggling to topping my class.",
  },
  {
    name: "Rohit Kumar",
    grade: "B.Com — Patna University",
    quote:
      "The recorded lectures are so well-structured. I could study at my own pace and still clear every exam.",
  },
  {
    name: "Anjali Sharma",
    grade: "Class 11 — Gopalganj",
    quote:
      "Face-to-face classes are amazing. Ma'am makes Economics genuinely interesting and easy to understand.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2540] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 bg-[#e8a020]/20 text-[#e8a020] text-sm font-semibold rounded-full mb-4 border border-[#e8a020]/30">
              Trusted Commerce Coaching · Pan-India
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Commerce Made{" "}
              <span className="text-[#e8a020]">Clear, Confident</span>{" "}
              & Career-Ready
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Learn from <strong className="text-white">CA Nidhi Agrawal</strong> — Chartered
              Accountant and Commerce educator with 10+ years of expertise. Live classes, recorded
              courses, and personal mentorship for Class 11, 12 & B.Com students.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="px-7 py-3 bg-[#e8a020] text-white font-semibold rounded-full hover:bg-[#d4911a] transition-colors text-sm"
              >
                Explore Courses
              </Link>
              <a
                href="https://wa.me/917250185258"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm"
              >
                Talk to Us on WhatsApp
              </a>
            </div>
          </div>

          {/* Hero Card */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-[#e8a020]/20 border-4 border-[#e8a020] mx-auto mb-4 flex items-center justify-center text-4xl">
              🎓
            </div>
            <h2 className="text-xl font-bold mb-1">CA Nidhi Agrawal</h2>
            <p className="text-[#e8a020] text-sm font-semibold mb-4">
              Chartered Accountant · Commerce Educator
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                "✓ Live Online Classes",
                "✓ Face-to-Face Batches",
                "✓ YouTube Live Sessions",
                "✓ Recorded Courses",
              ].map((item) => (
                <div key={item} className="bg-white/10 rounded-lg px-3 py-2 text-left">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#f0f7ff] py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="py-4">
              <p className="text-3xl font-bold text-[#1a3c5e]">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a3c5e]">Our Courses & Batches</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Structured programmes designed for board excellence and beyond
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <div
                key={batch.title}
                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#1a3c5e]/30 transition-all"
              >
                <h3 className="text-lg font-bold text-[#1a3c5e] mb-3">{batch.title}</h3>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Subjects</p>
                  <ul className="space-y-1">
                    {batch.subjects.map((s) => (
                      <li key={s} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e8a020] inline-block" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {batch.modes.map((mode) => (
                    <span
                      key={mode}
                      className="text-xs px-3 py-1 bg-[#f0f7ff] text-[#1a3c5e] rounded-full font-medium"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
                <Link
                  href={batch.href}
                  className="block text-center px-5 py-2 bg-[#1a3c5e] text-white text-sm font-semibold rounded-full hover:bg-[#0f2540] transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/courses"
              className="inline-block px-8 py-3 border-2 border-[#1a3c5e] text-[#1a3c5e] font-semibold rounded-full hover:bg-[#1a3c5e] hover:text-white transition-colors text-sm"
            >
              View All Courses & Fee Details
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f0f7ff] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a3c5e]">Why Agrawal Classes?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "CA-Qualified Expertise",
                desc: "Learn from a practising Chartered Accountant who brings real-world knowledge into every lesson.",
              },
              {
                icon: "📱",
                title: "Learn Anywhere, Anytime",
                desc: "Access live classes, YouTube sessions, and recorded lectures from any device, any location.",
              },
              {
                icon: "📚",
                title: "Complete Study Material",
                desc: "Comprehensive notes, practice sets, and sample papers included with every course.",
              },
              {
                icon: "🏆",
                title: "Proven Results",
                desc: "Hundreds of students have scored 90%+ in board exams after joining Agrawal Classes.",
              },
              {
                icon: "🤝",
                title: "Personal Mentorship",
                desc: "Direct doubt-solving sessions and personal guidance from CA Nidhi Agrawal.",
              },
              {
                icon: "🌍",
                title: "Pan-India Reach",
                desc: "Students from across India join our online batches. Geography is no longer a barrier.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#1a3c5e] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a3c5e]">What Our Students Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a3c5e] flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#1a3c5e]">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.grade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#e8a020] py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Excel in Commerce?
          </h2>
          <p className="text-white/90 text-base mb-8">
            Join thousands of students learning from CA Nidhi Agrawal. Enrol today and take the
            first step toward academic excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/courses"
              className="px-8 py-3 bg-[#1a3c5e] text-white font-semibold rounded-full hover:bg-[#0f2540] transition-colors text-sm"
            >
              View Courses
            </Link>
            <a
              href="https://wa.me/917250185258"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-[#1a3c5e] font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm"
            >
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
