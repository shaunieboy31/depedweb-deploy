"use client";

import React from "react";
import Image from "next/image";
import { 
  Building2, 
  Target, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  Globe,
  FileText,
  Users
} from "lucide-react";

export default function CentralOffice() {
  const initiatives = [
    { title: "K to 12 Curriculum", desc: "Developing globally competitive educational standards.", icon: Globe },
    { title: "National Assessment", desc: "Standardized evaluation of learner competence.", icon: FileText },
    { title: "Teacher Welfare", desc: "Policies for professional growth and support.", icon: Users },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="DepEd Central Office"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            National Leadership
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Central <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
              Office
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            Formulating national educational policies and standards to ensure quality basic education for every Filipino.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Mandate Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
           <div className="space-y-8">
              <div className="space-y-4">
                 <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Corporate Mandate</h2>
                 <div className="h-1.5 w-20 bg-blue-600" />
              </div>
              <p className="text-xl text-slate-600 font-medium leading-relaxed">
                 The Central Office serves as the nerve center for the Department of Education, providing the vision and policy framework that guides every classroom across the archipelago.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Policy Development", icon: ShieldCheck, color: "text-blue-600" },
                { title: "Standard Setting", icon: Target, color: "text-emerald-600" },
                { title: "Quality Assurance", icon: Zap, color: "text-amber-600" },
                { title: "Public Service", icon: Building2, color: "text-indigo-600" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                   <item.icon className={`${item.color} mb-4`} size={32} strokeWidth={1.5} />
                   <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{item.title}</h4>
                </div>
              ))}
           </div>
        </div>

        {/* Initiatives Grid */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">National Initiatives</h2>
           <div className="h-1.5 w-20 bg-blue-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {initiatives.map((init, i) => (
             <div key={i} className="group bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:border-blue-200 transition-all flex flex-col">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                   <init.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{init.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 flex-grow">{init.desc}</p>
                <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest pt-6 border-t border-slate-50">
                   <span>Policy Framework</span>
                   <ChevronRight size={12} />
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
