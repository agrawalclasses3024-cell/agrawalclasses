import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a3c5e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold">Agrawal Classes</p>
            <p className="text-[#e8a020] text-sm font-semibold mb-3">by CA Nidhi Agrawal</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Expert Commerce coaching for Class 11, 12 & B.Com students. Empowering students
              across India with quality education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[#e8a020] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                { label: "About CA Nidhi Agrawal", href: "/about" },
                { label: "Our Courses", href: "/courses" },
                { label: "Free Resources", href: "/resources" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[#e8a020] mb-4">Connect With Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📍 Main Road, Gopalganj, Bihar — 841428</li>
              <li>
                <a
                  href="https://wa.me/917250185258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  💬 WhatsApp: +91 72501 85258
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@canidhiagrawal3024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  ▶ YouTube — @canidhiagrawal3024
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/agrawalcanidhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  📸 Instagram — @agrawalcanidhi
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1KFrvdfXhh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  👍 Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Agrawal Classes by CA Nidhi Agrawal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
