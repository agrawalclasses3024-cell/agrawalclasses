import type { DistrictData } from "@/lib/districtData";
import Link from "next/link";

export default function DistrictPage({ district }: { district: DistrictData }) {
  const { name, nameHQ, nearbyTowns, studentCount, heroHeading, heroSubheading, localNote, faq, jsonLdAreaServed } = district;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        name: "Agrawal Classes by CA Nidhi Agrawal",
        url: "https://www.classesbycanidhiagrawal.in",
        telephone: "+91-7250185258",
        description: `Best Commerce coaching for ${name} district students by CA Nidhi Agrawal. Class 11, 12 & B.Com.`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gopalganj",
          addressRegion: "Bihar",
          addressCountry: "IN",
        },
        areaServed: jsonLdAreaServed.map((area) => ({ "@type": "City", name: area })),
        founder: { "@type": "Person", name: "CA Nidhi Agrawal", jobTitle: "Chartered Accountant & Commerce Teacher" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2540] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#e8a020]/20 text-[#e8a020] text-sm font-semibold rounded-full mb-4 border border-[#e8a020]/30">
            {name} District, Bihar
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">{heroHeading}</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">{heroSubheading}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/917250185258"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-[#e8a020] text-white font-semibold rounded-full hover:bg-[#d4911a] transition-colors text-sm"
            >
              WhatsApp Enquiry
            </a>
            <Link
              href="/student/register"
              className="px-7 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              Register Free
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f0f7ff] py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: studentCount, label: `${name} Students` },
            { value: "10+", label: "Years Experience" },
            { value: "CA Qualified", label: "Expert Teacher" },
            { value: "BSEB", label: "Board Specialist" },
          ].map((s) => (
            <div key={s.label} className="py-4">
              <p className="text-2xl font-bold text-[#1a3c5e]">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local connect */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1a3c5e] text-white rounded-2xl p-8 md:flex gap-8 items-start">
            <div className="text-5xl mb-4 md:mb-0">📍</div>
            <div>
              <h2 className="text-xl font-bold mb-2">Agrawal Classes aur {name} ka Connection</h2>
              <p className="text-gray-300 leading-relaxed">{localNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-14 px-4 bg-[#f9fafb]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a3c5e] mb-2 text-center">
            Courses Available for {name} Students
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            All courses follow Bihar Board (BSEB) syllabus
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: `Class 11 Commerce — ${name}`,
                subjects: ["Accountancy", "Business Studies", "Economics"],
                href: "/courses#class11",
              },
              {
                title: `Class 12 Commerce — ${name}`,
                subjects: ["Accountancy", "Business Studies", "Economics"],
                href: "/courses#class12",
                badge: "Most Popular",
              },
              {
                title: `B.Com — ${name}`,
                subjects: ["Financial Accounting", "Business Law", "Cost Accounting"],
                href: "/courses#bcom",
              },
            ].map((course) => (
              <div key={course.title} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                {course.badge && (
                  <span className="inline-block text-xs bg-[#e8a020] text-white px-3 py-0.5 rounded-full mb-3 font-semibold">
                    {course.badge}
                  </span>
                )}
                <h3 className="font-bold text-[#1a3c5e] mb-3 text-sm">{course.title}</h3>
                <ul className="space-y-1 mb-4">
                  {course.subjects.map((s) => (
                    <li key={s} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8a020] inline-block" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href={course.href} className="text-[#1a3c5e] text-sm font-semibold hover:underline">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning modes */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a3c5e] mb-8 text-center">
            {name} ke Students Kaise Padhte Hain?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🖥️", title: "Live Online Classes", desc: `${name} se ghar baithe live interactive classes join karo. Zoom/Google Meet pe real-time padhai.` },
              { icon: "📹", title: "Recorded Lectures", desc: "Kabhi bhi, kahin bhi — recorded lectures apni speed pe dekho. Exam ke time dobara review karo." },
              { icon: "🏫", title: "Face-to-Face (Gopalganj)", desc: `${nameHQ} se ${name === "Gopalganj" ? "seedha" : "30-60 km me"} Gopalganj centre aake offline batch join kar sakte hain.` },
            ].map((mode) => (
              <div key={mode.title} className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{mode.icon}</div>
                <h3 className="font-bold text-[#1a3c5e] mb-2">{mode.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby towns */}
      <section className="bg-[#f0f7ff] py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl font-bold text-[#1a3c5e] mb-4">
            {name} District ke In Towns ke Students Bhi Join Kar Sakte Hain
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {nearbyTowns.map((town) => (
              <span key={town} className="px-4 py-2 bg-white border border-[#1a3c5e]/20 text-[#1a3c5e] rounded-full text-sm font-medium shadow-sm">
                {town}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a3c5e] mb-8 text-center">
            {name} Students ke Common Questions
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-[#1a3c5e] mb-2">{item.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#e8a020] py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            {name} ke Students — Abhi Join Karo!
          </h2>
          <p className="text-white/90 text-base mb-8">
            CA Nidhi Agrawal se Commerce padho aur Bihar Board me top karo. Online batches available hain — koi travel ki zarurat nahi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/917250185258"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#1a3c5e] text-white font-semibold rounded-full hover:bg-[#0f2540] transition-colors text-sm"
            >
              WhatsApp: +91 72501 85258
            </a>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-[#1a3c5e] font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
