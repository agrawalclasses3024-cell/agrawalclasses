import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Resources | Agrawal Classes by CA Nidhi Agrawal",
  description:
    "Free study materials, sample papers, and YouTube lectures for Class 11, 12 & B.Com Commerce students.",
};

const youtubeVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Accountancy — Journal Entries Made Easy | Class 11",
    views: "45K views",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Partnership Accounts — Complete Chapter | Class 12",
    views: "62K views",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Cash Flow Statement — Step by Step | Class 12 Board",
    views: "38K views",
  },
];

const resources = [
  {
    category: "Class 11",
    items: [
      { title: "Accountancy — Chapter-wise Notes", type: "PDF" },
      { title: "Business Studies — Key Definitions", type: "PDF" },
      { title: "Economics — Important Diagrams", type: "PDF" },
      { title: "Class 11 Sample Paper 2024-25", type: "PDF" },
    ],
  },
  {
    category: "Class 12",
    items: [
      { title: "Accountancy — Formula Sheet", type: "PDF" },
      { title: "Partnership Accounts — Practice Questions", type: "PDF" },
      { title: "Business Studies — Case Studies Bank", type: "PDF" },
      { title: "Class 12 Previous Year Papers (5 Years)", type: "PDF" },
    ],
  },
  {
    category: "B.Com",
    items: [
      { title: "Financial Accounting — Summary Notes", type: "PDF" },
      { title: "Cost Accounting — Formula Booklet", type: "PDF" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a3c5e] to-[#0f2540] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Free Resources</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Quality study material, notes, and video lectures — available free for all Commerce
            students.
          </p>
        </div>
      </section>

      {/* YouTube Videos */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-[#1a3c5e]">Latest YouTube Lectures</h2>
            <a
              href="https://youtube.com/@canidhiagrawal3024"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors"
            >
              ▶ Subscribe on YouTube
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {youtubeVideos.map((video, i) => (
              <a
                key={i}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative bg-[#1a3c5e] aspect-video flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-2 right-3 text-xs text-white/70">{video.views}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#1a3c5e] transition-colors leading-snug">
                    {video.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Free Downloads */}
      <section className="bg-[#f0f7ff] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a3c5e] mb-8">Free Study Material</h2>
          <div className="space-y-10">
            {resources.map((section) => (
              <div key={section.category}>
                <h3 className="text-base font-bold text-[#e8a020] mb-4 uppercase tracking-wide">
                  {section.category}
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="bg-white rounded-xl p-4 border border-gray-200 flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="text-2xl mt-0.5">📄</div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 leading-tight">{item.title}</p>
                        <span className="text-xs text-[#1a3c5e] font-semibold mt-1 inline-block">
                          {item.type} · Free Download
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-8 text-center">
            * Login required to download. Create a free account or enrol in any course to access all materials.
          </p>
        </div>
      </section>
    </>
  );
}
