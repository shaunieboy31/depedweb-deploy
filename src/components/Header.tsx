"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ContactData } from "@/services/contact.service";

export default function Header({ contactInfo }: { contactInfo: ContactData }) {
  const [currentTime, setCurrentTime] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const format = () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    // initialize after mount to avoid SSR/client mismatch
    setCurrentTime(format());

    const interval = setInterval(() => {
      setCurrentTime(format());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white font-sans">
      {/* Top Utility Bar */}
      <div className="w-full bg-[#032977] border-b border-white/5 py-1.5 px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-[0.1em] text-white">
          <div className="opacity-90 italic">
            "Sa IMUS, Angat ka!"
          </div>
          <div className="flex items-center gap-6">
            <Link href="/prime-hrm" className="hover:text-blue-200 transition-colors">PRIME-HRM</Link>
            <div className="h-3 w-[1px] bg-white/20" />
            <Link href="/newsletter" className="hover:text-blue-200 transition-colors">Newsletter</Link>
            <div className="h-3 w-[1px] bg-white/20" />
            <Link href="/careers" className="hover:text-blue-200 transition-colors">Careers</Link>
            <div className="h-3 w-[1px] bg-white/20" />
            <Link href="/login" className="font-black text-blue-100 hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-md">Login</Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#191970]">
        <div className="max-w-7xl mx-auto px-10 py-5">
          <div className="flex justify-between items-center">
            {/* Logo and Department Info */}
            <Link
              href="/"
              className="flex gap-4 items-center flex-1 hover:opacity-90 transition-opacity"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/logo/deped_logo.png"
                    alt="SDO Imus Logo"
                    width={110}
                    height={110}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex-1 text-white" style={{ fontFamily: "serif" }}>
                <p className="text-base leading-tight">
                  Department of Education
                </p>
                <p className="text-base leading-tight">
                  Region IV-A, CALABARZON
                </p>
                <h1 className="font-bold text-lg mt-0.5 underline decoration-1 tracking-tight">
                  SCHOOLS DIVISION OFFICE OF IMUS CITY
                </h1>
                <p className="text-xs mt-1 leading-tight opacity-90">
                  {contactInfo.location}
                </p>
              </div>
            </Link>

            {/* Right Side - Date/Time & Admin Access */}
            <div className="flex items-center gap-6">
              <div
                className="text-right text-sm font-medium"
                style={{ fontFamily: "serif" }}
              >
                <p className="text-gray-100 opacity-90 text-[10px] uppercase tracking-widest">Philippine Standard Time:</p>
                <p
                  className="text-gray-100 font-bold"
                  suppressHydrationWarning
                >
                  {mounted ? currentTime : null}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>


  );
}
