"use client";

import React from "react";
import Image from "next/image";
import { 
  UserCog, 
  Library, 
  BarChart, 
  ChevronRight,
  Briefcase,
  BookOpen,
  Settings
} from "lucide-react";

export default function DivisionOffice() {
  const units = [
    { 
      label: "OSDS", 
      name: "Office of the Schools Division Superintendent",
      desc: "Providing overall leadership, strategic direction, and administrative support for the division.",
      href: "/programs/division-office/osds",
      icon: UserCog,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      label: "CID", 
      name: "Curriculum Implementation Division",
      desc: "Ensuring the effective delivery of the K to 12 curriculum and instructional supervision.",
      href: "/programs/division-office/cid",
      icon: Library,
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      label: "SGOD", 
      name: "School Governance and Operations Division",
      desc: "Formulating and implementing policies for school governance and operational excellence.",
      href: "/programs/division-office/sgod",
      icon: BarChart,
      color: "bg-indigo-50 text-indigo-600"
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus Division Office"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            Local Operations
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Division <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Office
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            The heart of educational governance in Imus City, managing resources and curriculum implementation for our schools.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Units Grid */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Functional Divisions</h2>
           <div className="h-1.5 w-20 bg-blue-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {units.map((u, i) => (
             <div key={i} className="group bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className={`w-20 h-20 rounded-3xl ${u.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                   <u.icon size={36} strokeWidth={1.5} />
                </div>
                <div className="mb-8 flex-grow">
                   <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black tracking-widest uppercase rounded-full mb-3">{u.label}</span>
                   <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">{u.name}</h3>
                   <p className="text-slate-500 font-medium text-sm leading-relaxed">{u.desc}</p>
                </div>
                
                <a 
                  href={u.href}
                  className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs tracking-widest pt-6 border-t border-slate-50 w-full justify-start group/btn"
                >
                   <span>View Unit Details</span>
                   <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
             </div>
           ))}
        </div>

        {/* Division Impact Section */}
        <div className="bg-white rounded-[3rem] p-12 md:p-16 border border-slate-100 shadow-xl overflow-hidden relative">
           <div className="absolute bottom-0 right-0 p-8 opacity-5">
              <Settings size={200} />
           </div>
           
           <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
              <div className="lg:w-1/2 space-y-6">
                 <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Strategic Excellence</h2>
                 <p className="text-slate-500 font-medium text-lg leading-relaxed">
                   Our division office is committed to providing the highest standards of technical assistance and administrative support to all schools in the City of Imus.
                 </p>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                 {[
                   { label: "Instruction", val: "Aligned", icon: BookOpen },
                   { label: "Governance", val: "Strategic", icon: Briefcase }
                 ].map((stat, i) => (
                   <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center">
                      <div className="text-blue-600 mb-3"><stat.icon size={28} /></div>
                      <span className="block font-black text-slate-900 uppercase tracking-widest text-[10px]">{stat.label}</span>
                      <span className="block font-bold text-blue-600 text-lg uppercase tracking-tight">{stat.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
