"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Free Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-[#1a3c5e]">Agrawal Classes</span>
            <span className="text-xs text-[#e8a020] font-semibold tracking-wide">
              by CA Nidhi Agrawal
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#1a3c5e] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/student/login"
              className="px-4 py-2 border border-[#1a3c5e] text-[#1a3c5e] text-sm font-semibold rounded-full hover:bg-[#1a3c5e] hover:text-white transition-colors"
            >
              Student Login
            </Link>
            <Link
              href="/student/register"
              className="px-5 py-2 bg-[#e8a020] text-white text-sm font-semibold rounded-full hover:bg-[#d4911a] transition-colors"
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#1a3c5e] px-2 py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/student/login"
              className="px-5 py-2 border border-[#1a3c5e] text-[#1a3c5e] text-sm font-semibold rounded-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Student Login
            </Link>
            <Link
              href="/student/register"
              className="px-5 py-2 bg-[#e8a020] text-white text-sm font-semibold rounded-full text-center hover:bg-[#d4911a]"
              onClick={() => setMenuOpen(false)}
            >
              Enroll Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
