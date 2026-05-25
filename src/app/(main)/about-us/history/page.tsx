"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  History as HistoryIcon, 
  Target, 
  Eye, 
  ShieldCheck, 
  Heart, 
  Search, 
  Award,
  ChevronRight,
  BookOpen,
  Users
} from "lucide-react";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview", icon: <HistoryIcon size={16} /> },
    { id: "vision-mission", label: "Vision & Mission", icon: <Eye size={16} /> },
    { id: "mandate", label: "Mandate", icon: <BookOpen size={16} /> },
    { id: "core-values", label: "Core Values", icon: <Heart size={16} /> },
    { id: "quality-policy", label: "Quality Policy", icon: <ShieldCheck size={16} /> },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus Building"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032977] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            About Us
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Our Legacy of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Excellence & Service
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Tracing the roots and guiding principles of the Schools Division Office of Imus City.
          </p>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors hover:text-[#4279D2] ${
                activeTab === item.id ? "text-[#4279D2]" : "text-slate-500"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-40">
        
        {/* I. Overview Section */}
        <section id="overview" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#4279D2] uppercase tracking-tight">Introduction & History</h2>
                <div className="h-1.5 w-20 bg-[#4279D2]" />
              </div>
              <div className="space-y-6 text-slate-600 leading-relaxed font-medium text-lg">
                <p>
                  The City Schools Division of Imus was established pursuant to <span className="text-[#032977] font-bold">Deped Order No. 50 s. 2002</span>, 
                  when the City Government of Imus was created with the promulgation of RA 10161.
                </p>
                <p>
                  A memorandum of Agreement (MOA) was signed by the Secretary of the Department of Education, 
                  Bro. Armin A. Luistro FSC and the City Mayor of Imus, Hon. Emmanuel L. Maliksi, who then worked 
                  collaboratively for the realization of this goal.
                </p>
                <p>
                  On <span className="text-[#4279D2] font-bold italic underline decoration-blue-200 underline-offset-4">January 12, 2013</span>, 
                  Dr. Lualhati O. Cadavedo was appointed as its first OIC Division Superintendent, marking the official 
                  commencement of operations.
                </p>
                <div className="flex items-center gap-4 pt-4">
                   <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                      <Users size={32} />
                   </div>
                   <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">
                      Supporting three districts focused on delivering <br /> high-quality education to all Imusenyo learners.
                   </p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white">
                <Image 
                  src="/images/newbuilding.webp" 
                  alt="Division Office Building" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition duration-700" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* II. Vision & Mission Section */}
        <section id="vision-mission" className="scroll-mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-10 group-hover:opacity-40 transition duration-500" />
              <div className="relative h-full p-10 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start space-y-6 hover:shadow-xl transition-all">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition duration-500">
                  <Eye size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Our Vision</h3>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
                    "We dream of Filipinos who passionately love their country and whose values and competencies 
                    enable them to realize their full potential and contribute meaningfully to building the nation."
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-10 group-hover:opacity-40 transition duration-500" />
              <div className="relative h-full p-10 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start space-y-6 hover:shadow-xl transition-all">
                <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition duration-500">
                  <Target size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed font-medium mb-6">
                    To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Students learn in a child-friendly, gender-sensitive environment",
                      "Teachers facilitate learning and nurturing",
                      "Administrators ensure an enabling environment",
                      "Stakeholders share responsibility for learners"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#4279D2]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* III. Mandate Section */}
        <section id="mandate" className="scroll-mt-32 bg-[#032977] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-10">
              <HistoryIcon size={300} strokeWidth={0.5} />
           </div>
           <div className="relative z-10 max-w-4xl space-y-8">
              <div className="space-y-2">
                 <h2 className="text-3xl font-black uppercase tracking-tight text-blue-300">Our Mandate</h2>
                 <div className="h-1.5 w-20 bg-blue-400" />
              </div>
              <div className="space-y-6 text-xl text-blue-50 font-medium leading-relaxed">
                <p>
                  Established through the <span className="text-white font-black underline decoration-blue-400 underline-offset-8">Education Decree of 1863</span>, 
                  the Department of Education serves as the primary government agency for basic education.
                </p>
                <p>
                  Our present mandate is defined by <span className="text-white font-black py-1 px-3 bg-blue-800 rounded-lg">Republic Act 9155</span> (Governance of Basic Education Act of 2001), 
                  empowering us to formulate, implement, and coordinate policies for formal and non-formal basic education.
                </p>
              </div>
           </div>
        </section>

        {/* IV. Core Values Section */}
        <section id="core-values" className="scroll-mt-32">
          <div className="flex flex-col items-center text-center mb-16 px-4">
             <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">Core Values</h2>
             <div className="h-1.5 w-20 bg-[#4279D2] mx-auto mb-6" />
             <p className="text-slate-500 max-w-2xl font-medium">The four pillars that guide every educator and learner within our division.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Maka-Diyos", color: "from-blue-500 to-indigo-600", desc: "God-fearing" },
              { label: "Maka-tao", color: "from-rose-500 to-pink-600", desc: "Humane" },
              { label: "Makalikasan", color: "from-emerald-500 to-teal-600", desc: "Nature-loving" },
              { label: "Makabansa", color: "from-amber-500 to-orange-600", desc: "Patriotic" },
            ].map((value, idx) => (
              <div key={idx} className="group relative pt-6 hover:-translate-y-2 transition-transform duration-500">
                <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${value.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`} />
                <div className="relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-black/10`}>
                    {value.label[0]}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-800 tracking-tight">{value.label}</h4>
                    <p className="text-xs font-bold text-[#4279D2] uppercase tracking-widest mt-1 opacity-60">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* V. Quality Policy Section */}
        <section id="quality-policy" className="scroll-mt-32">
          <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="flex items-center gap-4 text-[#4279D2]">
                <ShieldCheck size={48} />
                <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">DepEd Quality Policy Statement</h2>
              </div>
              <p className="text-2xl text-slate-700 font-bold italic leading-relaxed">
                "The Department of Education is committed to provide learners with quality basic education 
                that is accessible, inclusive, and liberating through:"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Proactive Leadership",
                  "Shared Governance",
                  "Evidence-Based Policies",
                  "Responsive Curricula",
                  "Committed Personnel",
                  "Enabling Environment"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-[#4279D2]/10 flex items-center justify-center text-[#4279D2]">
                       <Award size={12} />
                    </div>
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100">
               <p className="text-slate-600 leading-relaxed font-medium">
                  The Department upholds the highest standards of conduct and performance to fulfill 
                  stakeholders' needs and expectations by adhering to constitutional mandates, statutory, 
                  and regulatory requirements, and sustains client satisfaction through continuous 
                  improvement of the <span className="text-[#032977] font-black underline decoration-[#4279D2] underline-offset-4">Quality Management System</span>.
               </p>
               <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ISO 9001:2015 Certified</p>
                  <div className="h-8 w-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                     <ShieldCheck size={20} />
                  </div>
               </div>
            </div>
          </div>
        </section>

      </div>
      
      {/* Footer Decoration */}
      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent" />
    </div>
  );
}
