import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About CA Nidhi Agrawal | Agrawal Classes",
  description:
    "Meet CA Nidhi Agrawal — Chartered Accountant and Commerce educator with 10+ years of experience teaching Class 11, 12 & B.Com students across India.",
};

const milestones = [
  { year: "2014", event: "Became an Associate Chartered Accountant (ACA) — ICAI Membership No. 426028" },
  { year: "2014", event: "Started teaching Commerce to Class 11 & 12 students in Gopalganj, Bihar" },
  { year: "2017", event: "Expanded batches to B.Com students; growing reputation across Gopalganj district" },
  { year: "2019", event: "Elevated to Fellow Chartered Accountant (FCA) by ICAI — a mark of outstanding professional standing" },
  { year: "2020", event: "Launched live online classes, reaching students across Bihar and beyond" },
  { year: "2022", event: "Started YouTube channel (@canidhiagrawal3024) — free lectures for Commerce students nationwide" },
  { year: "2024", event: "Pan-India student base established; thousands of students taught across online and offline batches" },
  { year: "2025", event: "Launched Agrawal Classes as a structured digital platform — recorded courses, live sessions & more" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2540] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About CA Nidhi Agrawal</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Chartered Accountant · Commerce Educator · Mentor to thousands of students across India
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-[#f0f7ff] rounded-2xl p-10 flex flex-col items-center justify-center text-center">
            <div className="w-28 h-28 rounded-full bg-[#1a3c5e] flex items-center justify-center text-5xl text-white mb-4">
              🎓
            </div>
            <h2 className="text-xl font-bold text-[#1a3c5e]">CA Nidhi Agrawal</h2>
            <p className="text-[#e8a020] font-semibold text-sm mt-1">Chartered Accountant</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["FCA — ICAI #426028", "Since 2014", "Pan-India Reach"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-[#1a3c5e] text-white rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#1a3c5e] mb-4">
              Passionate About Making Commerce Accessible
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                CA Nidhi Agrawal is a qualified Chartered Accountant and an experienced Commerce
                educator who has been transforming the way students learn Accountancy, Business
                Studies, and Economics for over a decade.
              </p>
              <p>
                Starting her teaching journey in Gopalganj, Bihar, she quickly built a reputation
                for her clarity of explanation, student-friendly approach, and commitment to
                academic excellence. Her students consistently achieve outstanding results in board
                examinations.
              </p>
              <p>
                Today, through Agrawal Classes, she reaches students across India — through live
                online sessions, her YouTube channel, recorded video courses, and face-to-face
                batches. Her mission is simple: make quality Commerce education available to every
                student, regardless of where they live.
              </p>
            </div>
            <Link
              href="/courses"
              className="inline-block mt-6 px-7 py-3 bg-[#e8a020] text-white font-semibold rounded-full text-sm hover:bg-[#d4911a] transition-colors"
            >
              Explore Her Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="bg-[#f0f7ff] py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1a3c5e] mb-8">Teaching Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "💡",
                title: "Concept First",
                desc: "Every topic is taught from fundamentals — not shortcuts — so students genuinely understand and can apply knowledge.",
              },
              {
                icon: "📊",
                title: "Practice-Driven",
                desc: "Rigorous practice through solved examples, past papers, and custom exercises builds exam confidence.",
              },
              {
                icon: "❤️",
                title: "Student-Centric",
                desc: "Every student is different. CA Nidhi Agrawal adapts her teaching to ensure no one is left behind.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm text-left">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#1a3c5e] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a3c5e] text-center mb-10">
            Journey & Milestones
          </h2>
          <div className="relative border-l-2 border-[#e8a020] pl-8 space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-[2.65rem] top-1 w-4 h-4 rounded-full bg-[#e8a020] border-2 border-white shadow" />
                <p className="text-xs font-bold text-[#e8a020] mb-1">{m.year}</p>
                <p className="text-sm text-gray-700">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
