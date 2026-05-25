"use client";

import React from "react";
import Image from "next/image";
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Users, 
  ChevronRight,
  ArrowRightCircle,
  FileText,
  AlertCircle
} from "lucide-react";

export default function UnitTemplate({ 
  unitName, 
  badge, 
}: { 
  unitName: string; 
  badge: string; 
}) {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900 pb-32">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt={unitName}
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#422006] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-amber-300 uppercase bg-amber-950/40 backdrop-blur-md rounded-full border border-amber-400/30">
            {badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            {unitName}
          </h1>
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold uppercase tracking-[0.2em] text-xs">
             <AlertCircle size={14} />
             <span>Content Under Development</span>
          </div>
        </div>
      </section>

      {/* Placeholder Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="bg-white rounded-[3rem] p-12 md:p-24 border border-slate-100 shadow-sm text-center space-y-8">
           <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto">
              <Building2 size={40} />
           </div>
           <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Unit Information Pending</h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
                We are currently updating the details, mandates, and services for the **{unitName}**. Please check back soon for the full directory.
              </p>
           </div>
           <div className="pt-8">
              <a 
                href="/programs/division-office/osds" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-all group"
              >
                <ArrowRightCircle className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span>Return to OSDS Hub</span>
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}
