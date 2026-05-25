import React from "react";
import Image from "next/image";
import { FileText } from "lucide-react";

export function IssuanceHero() {
  return (
    <section className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/newbuilding.webp"
          alt="SDO Imus Issuances"
          fill
          className="object-cover object-center brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#032977]/90 to-transparent" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
          <FileText size={14} className="text-blue-400" />
          <span>Digital Archive Portal</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-2xl">
          Official <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Issuances
          </span>
        </h1>
        <p className="text-slate-300 font-medium italic text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
           "Access, view, and download the latest division memoranda, advisories, and official communications."
        </p>
      </div>
    </section>
  );
}
