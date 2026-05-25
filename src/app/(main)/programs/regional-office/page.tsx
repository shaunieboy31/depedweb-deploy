"use client";

import React from "react";
import Image from "next/image";
import { 
  Map, 
  Settings, 
  BarChart3, 
  Shield, 
  ChevronRight,
  Handshake,
  FileCheck,
  Zap
} from "lucide-react";

export default function RegionalOffice() {
  const functions = [
    { title: "Standard Setting", icon: Settings, desc: "Adapting national policies to regional contexts." },
    { title: "Monitoring", icon: BarChart3, desc: "Tracking performance across division offices." },
    { title: "Quality Assurance", icon: Shield, desc: "Ensuring compliance with educational standards." },
    { title: "Resource Mgmt", icon: Map, desc: "Strategic allocation of regional resources." },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-32">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="DepEd Regional Office"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#312e81] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-300 uppercase bg-indigo-950/40 backdrop-blur-md rounded-full border border-indigo-400/30">
            Regional Governance
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Regional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
              Office
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            Bridging national policies with local implementation to ensure seamless educational service delivery across the region.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Functions Grid */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Core Regional Functions</h2>
           <div className="h-1.5 w-20 bg-indigo-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
           {functions.map((func, i) => (
             <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <func.icon size={28} />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm mb-3">{func.title}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{func.desc}</p>
             </div>
           ))}
        </div>

        {/* Technical Assistance Impact Box */}
        <div className="bg-[#1e1b4b] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Handshake size={400} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/40 rounded-full border border-indigo-400/20">
                       Support & Monitoring
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Technical Assistance</h2>
                    <div className="h-1.5 w-20 bg-indigo-400" />
                 </div>
                 <p className="text-xl text-indigo-100 font-medium leading-relaxed">
                    We provide specialized support to division offices through monitoring, evaluation, and adaptive technical assistance programs.
                 </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 {[
                   { title: "Planning & Research", icon: FileCheck, text: "Data-driven policy localized for the region." },
                   { title: "Human Resource Dev", icon: Handshake, text: "Capacity building for regional and division personnel." },
                   { title: "Field Technical Assistance", icon: Zap, text: "Direct support for division-level implementation." }
                 ].map((pill, i) => (
                   <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center gap-6 group hover:bg-white/15 transition-all">
                      <div className="w-14 h-14 bg-indigo-400/20 rounded-2xl flex items-center justify-center text-indigo-300 group-hover:bg-indigo-400 transition-colors group-hover:text-white">
                         <pill.icon size={24} />
                      </div>
                      <div>
                         <h4 className="font-black uppercase tracking-widest text-xs text-white mb-1">{pill.title}</h4>
                         <p className="text-sm text-indigo-200 font-medium">{pill.text}</p>
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
