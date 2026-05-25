"use client";

import React from "react";
import Image from "next/image";
import { 
  BookOpen, 
  Star, 
  UserPlus, 
  ChevronRight, 
  Trophy, 
  Target, 
  ArrowRightCircle,
  Lightbulb
} from "lucide-react";

export default function ProgramsPage() {
  const programs = [
    {
      id: 1,
      title: 'Learning Programs',
      description: 'Core educational programs designed to meet DepEd standards and learner needs, fostering academic excellence.',
      link: '/programs/learning',
      Icon: BookOpen,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 2,
      title: 'Special Programs',
      description: 'Specialized programs for students with unique learning needs and talents, ensuring inclusive growth.',
      link: '/programs/special',
      Icon: Star,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 3,
      title: 'Development Programs',
      description: 'Professional development and capacity building programs for educators and division staff.',
      link: '/programs/development',
      Icon: UserPlus,
      color: 'bg-indigo-50 text-indigo-600'
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus Building"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0ea5e9]/20 via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            Educational Excellence
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Programs
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Comprehensive initiatives designed to support quality education and holistic student development in Imus City.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Program Categories Grid */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Core Initiatives</h2>
           <div className="h-1.5 w-20 bg-blue-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program) => (
            <div 
              key={program.id}
              className="group bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-3xl ${program.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                 <program.Icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{program.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">{program.description}</p>
              
              <a 
                href={program.link}
                className="flex items-center gap-2 text-blue-600 font-black uppercase text-xs tracking-widest pt-6 border-t border-slate-50 w-full justify-center group/btn"
              >
                 <span>Explore Now</span>
                 <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* Philosophy Impact Box */}
        <div className="bg-[#0f172a] rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Lightbulb size={400} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-950/40 rounded-full border border-blue-400/20">
                       Our Core Vision
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Program Philosophy</h2>
                    <div className="h-1.5 w-20 bg-blue-400" />
                 </div>
                 <p className="text-xl text-slate-300 font-medium leading-relaxed">
                    Designed with a learner-centered approach, our programs integrate innovation, inclusivity, and holistic growth to meet global standards.
                 </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 {[
                   { text: "Quality and relevance of educational content", Icon: Target },
                   { text: "Equity and inclusivity for all learners", Icon: Trophy },
                   { text: "Integration of technology and innovation", Icon: ArrowRightCircle },
                   { text: "Holistic development of students", Icon: Star }
                 ].map((pill, i) => (
                   <div key={i} className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center gap-4 transition-all hover:bg-white/10 hover:translate-x-2">
                      <div className="w-10 h-10 bg-blue-400/20 rounded-xl flex items-center justify-center text-blue-300">
                         <pill.Icon size={18} />
                      </div>
                      <span className="font-bold text-slate-100 text-sm">{pill.text}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
