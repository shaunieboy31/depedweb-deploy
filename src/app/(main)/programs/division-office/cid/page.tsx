"use client";

import React from "react";
import Image from "next/image";
import { 
  Book, 
  Brain, 
  Sparkles, 
  Languages, 
  Binary,
  ChevronRight,
  GraduationCap,
  Lightbulb
} from "lucide-react";

export default function CID() {
  const pillars = [
    { title: "K-12 Curriculum", icon: Book, desc: "Standardized implementation of the national basic education framework." },
    { title: "Instructional Mgmt", icon: Brain, desc: "Providing pedagogical leadership and teacher support systems." },
    { title: "Learning Resources", icon: Sparkles, desc: "Development and distribution of quality-assured teaching materials." },
    { title: "Special Programs", icon: Languages, desc: "Tailored educational initiatives for diverse learner groups." },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-32">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="CID Imus"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-emerald-300 uppercase bg-emerald-950/40 backdrop-blur-md rounded-full border border-emerald-400/30">
            Instructional Leadership
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            CID <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Programs
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            Championing curriculum excellence and instructional innovation to empower the learners of Imus City.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Core Pillars Grid */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Curriculum Pillars</h2>
           <div className="h-1.5 w-20 bg-emerald-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
           {pillars.map((p, i) => (
             <div key={i} className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <p.icon size={28} />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm mb-3">{p.title}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{p.desc}</p>
             </div>
           ))}
        </div>

        {/* Learning Impact Box */}
        <div className="bg-[#022c22] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <GraduationCap size={400} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 rounded-full border border-emerald-400/20">
                       Success Driven
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Learning Outcomes</h2>
                    <div className="h-1.5 w-20 bg-emerald-400" />
                 </div>
                 <p className="text-xl text-emerald-100 font-medium leading-relaxed">
                    We focus on delivering educational experiences that translate directly into measurable learner success and critical thinking skills.
                 </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 {[
                   { title: "Holistic Mastery", icon: Brain, text: "Integrating academic and soft-skill development." },
                   { title: "Teacher Capacity", icon: Lightbulb, text: "Continuing professional growth for our educators." },
                   { title: "Digital Literacy", icon: Binary, text: "Preparing students for a technology-driven future." }
                 ].map((pill, i) => (
                   <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center gap-6 group hover:bg-white/15 transition-all">
                      <div className="w-14 h-14 bg-emerald-400/20 rounded-2xl flex items-center justify-center text-emerald-300 group-hover:bg-emerald-400 transition-colors group-hover:text-white">
                         <pill.icon size={24} />
                      </div>
                      <div>
                         <h4 className="font-black uppercase tracking-widest text-xs text-white mb-1">{pill.title}</h4>
                         <p className="text-sm text-emerald-200 font-medium">{pill.text}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
