"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  School,
  ChevronRight,
  Sparkles,
  Search,
  BookOpen,
  Users,
  Award,
  ListOrdered,
  Map,
  ShieldCheck,
  Building
} from "lucide-react";

export default function SchoolsPage() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      {/* Immersive Institutional Hero */}
      <section className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus Schools"
            fill
            className="object-cover object-center brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#032977]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.3em] text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            <GraduationCap size={14} className="text-blue-400" />
            <span>Educational Network</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl uppercase">
            Directory of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Schools
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium italic">
             "Navigating the diverse educational landscape of Imus City, from foundational primary centers to specialized secondary institutions."
          </p>
        </div>
      </section>

      {/* Main Navigation Hub */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-20 relative z-20 space-y-24">
        
        {/* SECTION: PUBLIC SCHOOLS */}
        <section className="space-y-12">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 text-white">
                 <ShieldCheck size={24} />
              </div>
              <div className="space-y-1">
                 <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">PUBLIC</h2>
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Government Funded Institutions</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "ELEMENTARY", href: "/schools/elementary", icon: BookOpen, desc: "Foundational Primary Education", count: "35K+" },
                { title: "JUNIOR HIGH SCHOOL", href: "/schools/junior-high", icon: School, desc: "Grades 7 to 10 Programs", count: "15K+" },
                { title: "SENIOR HIGH SCHOOL", href: "/schools/senior-high", icon: GraduationCap, desc: "Specialized Grades 11-12", count: "8K+" },
                { title: "INTEGRATED SCHOOL", href: "/schools/integrated-school", icon: Building2, desc: "K-12 Unified Learning Centres", count: "New" },
              ].map((item, i) => (
                 <Link key={i} href={item.href} className="group">
                    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 h-full border border-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between ring-1 ring-black/5">
                       <div className="space-y-6">
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                             <item.icon size={24} />
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h4>
                             <p className="text-slate-400 text-[10px] font-medium leading-relaxed">{item.desc}</p>
                          </div>
                       </div>
                       <div className="mt-8 flex items-center justify-between">
                          <span className="text-[10px] font-black text-blue-600/50 uppercase tracking-widest">{item.count}</span>
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                       </div>
                    </div>
                 </Link>
              ))}
           </div>
        </section>

        {/* SECTION: PRIVATE SCHOOLS & INTERACTIVE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* PRIVATE SCHOOLS */}
           <div className="lg:col-span-4 space-y-12">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-amber-500 rounded-2xl shadow-xl shadow-amber-500/20 text-white">
                    <Building size={24} />
                 </div>
                 <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">PRIVATE</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Non-Government Institutions</p>
                 </div>
              </div>

              <Link href="/schools/private" className="group block h-full max-h-[250px]">
                 <div className="bg-slate-900 rounded-[3rem] p-10 h-full border border-slate-800 shadow-2xl hover:shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                       <Sparkles size={150} className="text-amber-500" />
                    </div>
                    <div className="space-y-4 relative z-10">
                       <h4 className="text-2xl font-black text-white uppercase tracking-tighter">ALL LEVELS</h4>
                       <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-[200px]">
                          Complete directory of private educational institutions across all grade levels.
                       </p>
                    </div>
                    <div className="relative z-10 flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mt-8">
                       <span>Explore Private</span>
                       <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                 </div>
              </Link>
           </div>

           {/* INTERACTIVE TOOLS */}
           <div className="lg:col-span-8 space-y-12">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-emerald-600 rounded-2xl shadow-xl shadow-emerald-500/20 text-white">
                    <Map size={24} />
                 </div>
                 <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">SCHOOLS MAP</h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Geographical & Data Access</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[250px]">
                 {/* Schools Map */}
                 <Link href="/schools/map" className="group">
                    <div className="bg-white rounded-[3rem] p-10 h-full border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between group-hover:border-emerald-100">
                       <div className="absolute -right-10 -bottom-10 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                          <Map size={250} />
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Schools Map</h4>
                          <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-xs">
                             Interactive geographical visualization of all school locations throughout Imus City.
                          </p>
                       </div>
                       <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em]">
                          <span>Launch Map</span>
                          <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                       </div>
                    </div>
                 </Link>

                 {/* School Directory */}
                 <Link href="/schools/directory" className="group">
                    <div className="bg-blue-600 rounded-[3rem] p-10 h-full shadow-xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
                       <div className="absolute -right-10 -bottom-10 p-10 opacity-[0.1] group-hover:opacity-[0.2] transition-opacity text-white">
                          <ListOrdered size={250} />
                       </div>
                       <div className="space-y-4 text-white">
                          <h4 className="text-2xl font-black uppercase tracking-tighter">School Directory</h4>
                          <p className="text-blue-100 text-xs font-medium leading-relaxed max-w-xs">
                             Searchable registry of complete schools data, contact info, and principal records.
                          </p>
                       </div>
                       <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.3em]">
                          <span>View Records</span>
                          <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                       </div>
                    </div>
                 </Link>
              </div>
           </div>

        </div>

      </div>

      {/* Footer Decoration */}
      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent pt-32" />
    </div>
  );
}
