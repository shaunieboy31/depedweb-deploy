import React from "react";
import { Users, Target, ShieldCheck, Star } from "lucide-react";

export function LeadershipPhilosophy() {
  const pillars = [
    { title: "Student-Centered", icon: <Users size={18} />, desc: "Focus on holistic learner development" },
    { title: "Equitable Access", icon: <Target size={18} />, desc: "Quality education for every citizen" },
    { title: "Shared Governance", icon: <ShieldCheck size={18} />, desc: "Collaborative and transparent leadership" },
    { title: "Innovation", icon: <Star size={18} />, desc: "Continuous improvement and creativity" },
  ];

  return (
    <section className="relative rounded-[4rem] overflow-hidden bg-[#032977] text-white p-12 md:p-24 shadow-2xl transition-all duration-700 hover:shadow-blue-200">
      <div className="absolute top-0 right-0 p-12 opacity-10">
         <Target size={300} strokeWidth={0.5} />
      </div>
      <div className="relative z-10 max-w-4xl space-y-12">
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            Governance & Vision
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
            Our Leadership <br />
            <span className="text-blue-300">Philosophy</span>
          </h2>
          <div className="h-2 w-24 bg-blue-400" />
        </div>
        
        <p className="text-xl md:text-2xl text-blue-100/80 font-medium leading-relaxed max-w-2xl">
          Our learning leaders embody the vision of the Department of Education through their commitment to the <span className="italic font-black text-white">BIDAng</span> Imusenyo standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {pillars.map((item, idx) => (
            <div key={idx} className="flex items-start gap-5 p-8 bg-blue-800/40 backdrop-blur-md rounded-[2rem] border border-blue-400/20 hover:bg-white/10 hover:border-blue-400/40 transition-all duration-500 group">
              <div className="p-4 bg-blue-500/30 rounded-2xl text-blue-300 group-hover:bg-blue-400 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-white text-xl tracking-tight uppercase">{item.title}</h4>
                <p className="text-blue-200/60 text-sm font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
