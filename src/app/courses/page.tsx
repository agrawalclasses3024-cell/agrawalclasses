import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courses & Batches | Agrawal Classes by CA Nidhi Agrawal",
  description:
    "Explore Commerce courses for Class 11, 12 & B.Com. Live online, face-to-face, and recorded batch options available.",
};

const courses = [
  {
    id: "class11",
    level: "Class 11",
    title: "Class 11 Commerce",
    tagline: "Build a strong foundation in Commerce from Day 1",
    subjects: [
      { name: "Accountancy", topics: ["Journal Entries", "Ledger & Trial Balance", "Final Accounts", "Depreciation", "Bills of Exchange"] },
      { name: "Business Studies", topics: ["Nature of Business", "Forms of Business", "Management Principles", "Marketing"] },
      { name: "Economics", topics: ["Basic Concepts", "Indian Economy", "Statistics", "Development Issues"] },
    ],
    modes: [
      { name: "Live Online", desc: "Interactive live classes via Zoom/Google Meet" },
      { name: "Face-to-Face", desc: "Offline batches at Gopalganj, Bihar" },
      { name: "Recorded", desc: "On-demand video lectures, watch anytime" },
    ],
    duration: "Full Academic Year (April – March)",
    badge: "Foundation",
    color: "#1a3c5e",
  },
  {
    id: "class12",
    level: "Class 12",
    title: "Class 12 Commerce",
    tagline: "Score 90%+ in Board Exams with expert guidance",
    subjects: [
      { name: "Accountancy", topics: ["Partnership Accounts", "Company Accounts", "Cash Flow", "Ratio Analysis", "Financial Statements"] },
      { name: "Business Studies", topics: ["Management", "Organising", "Directing", "Controlling", "Marketing Mix"] },
      { name: "Economics", topics: ["Macro Economics", "Micro Economics", "Indian Economy", "Government Budget"] },
    ],
    modes: [
      { name: "Live Online", desc: "Interactive live classes via Zoom/Google Meet" },
      { name: "Face-to-Face", desc: "Offline batches at Gopalganj, Bihar" },
      { name: "Recorded", desc: "On-demand video lectures, watch anytime" },
    ],
    duration: "Full Academic Year (April – March)",
    badge: "Most Popular",
    color: "#e8a020",
  },
  {
    id: "bcom",
    level: "B.Com",
    title: "B.Com Programme",
    tagline: "Master commerce concepts for degree-level excellence",
    subjects: [
      { name: "Financial Accounting", topics: ["Advanced Accounts", "Corporate Accounting", "AS Standards"] },
      { name: "Business Law", topics: ["Contract Act", "Sale of Goods", "Company Law Basics"] },
      { name: "Cost Accounting", topics: ["Cost Concepts", "Marginal Costing", "Standard Costing"] },
    ],
    modes: [
      { name: "Live Online", desc: "Interactive live classes via Zoom/Google Meet" },
      { name: "Recorded", desc: "On-demand video lectures, watch anytime" },
    ],
    duration: "Semester-wise (customised batches)",
    badge: "Advanced",
    color: "#1a3c5e",
  },
];

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2540] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Courses & Batches</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive Commerce programmes for Class 11, Class 12, and B.Com students — live,
            recorded, and face-to-face options available.
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {courses.map((course) => (
            <div
              key={course.id}
              id={course.id}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Course Header */}
              <div
                className="p-8 text-white"
                style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}cc)` }}
              >
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full mb-3 inline-block">
                      {course.badge}
                    </span>
                    <h2 className="text-2xl font-bold">{course.title}</h2>
                    <p className="text-white/80 mt-1">{course.tagline}</p>
                  </div>
                  <div className="text-sm text-white/70">
                    <span className="font-medium text-white">Duration:</span> {course.duration}
                  </div>
                </div>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-8">
                {/* Subjects */}
                <div>
                  <h3 className="font-bold text-[#1a3c5e] mb-4 text-sm uppercase tracking-wide">
                    Subjects & Topics Covered
                  </h3>
                  <div className="space-y-4">
                    {course.subjects.map((subject) => (
                      <div key={subject.name}>
                        <p className="font-semibold text-sm text-gray-800 mb-1">{subject.name}</p>
                        <div className="flex flex-wrap gap-2">
                          {subject.topics.map((topic) => (
                            <span
                              key={topic}
                              className="text-xs px-2 py-1 bg-[#f0f7ff] text-[#1a3c5e] rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modes + CTA */}
                <div>
                  <h3 className="font-bold text-[#1a3c5e] mb-4 text-sm uppercase tracking-wide">
                    Learning Modes Available
                  </h3>
                  <div className="space-y-3 mb-6">
                    {course.modes.map((mode) => (
                      <div key={mode.name} className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#e8a020] mt-1.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{mode.name}</p>
                          <p className="text-xs text-gray-500">{mode.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/917250185258"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-5 py-2.5 bg-[#e8a020] text-white text-sm font-semibold rounded-full hover:bg-[#d4911a] transition-colors"
                    >
                      Enrol Now via WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="flex-1 text-center px-5 py-2.5 border border-[#1a3c5e] text-[#1a3c5e] text-sm font-semibold rounded-full hover:bg-[#1a3c5e] hover:text-white transition-colors"
                    >
                      Send Enquiry
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Included Banner */}
      <section className="bg-[#f0f7ff] py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1a3c5e] mb-6">What's Included in Every Course</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "📹", label: "Live / Recorded Lectures" },
              { icon: "📄", label: "Study Notes & PDFs" },
              { icon: "📝", label: "Practice Question Banks" },
              { icon: "🎯", label: "Previous Year Papers" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
