"use client";

import React from "react";
import Image from "next/image";
import { 
  Lightbulb, 
  QrCode, 
  ExternalLink, 
  Sparkles, 
  Rocket, 
  Zap,
  Target
} from "lucide-react";

export default function Innovation() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900 pb-32">
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#451a03] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-amber-300 uppercase bg-amber-950/40 backdrop-blur-md rounded-full border border-amber-400/30">
            Future Ready
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Ideas & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
              Innovation
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Empowering creative minds to reshape the landscape of education in Imus City through groundbreaking ideas.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-slate-100 relative overflow-hidden text-center">
           {/* Decorative elements */}
           <div className="absolute -top-12 -right-12 text-amber-50 opacity-20">
              <Sparkles size={200} />
           </div>
           
           <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner">
                 <Lightbulb size={48} strokeWidth={1.5} className="animate-pulse" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Do you have a <span className="text-amber-600 underline decoration-amber-200 decoration-4 underline-offset-8">Vision for Change</span>?
              </h2>
              
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12 max-w-xl">
                We believe that the best solutions come from our community. Share your innovative programs, workflow improvements, or educational initiatives.
              </p>

              {/* QR Code Section */}
              <div className="w-full max-w-sm bg-gradient-to-br from-slate-50 to-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-12 group hover:shadow-md transition-shadow">
                 <div className="relative w-48 h-48 mx-auto mb-6 bg-white p-4 rounded-3xl shadow-inner border border-slate-100 flex items-center justify-center">
                    <QrCode size={120} strokeWidth={1} className="text-slate-800" />
                    <div className="absolute inset-0 bg-amber-100/10 rounded-3xl group-hover:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
                       <Zap size={40} className="text-amber-500 fill-current" />
                    </div>
                 </div>
                 <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Scan to Submit</p>
                 <p className="text-sm font-bold text-amber-600">bit.ly/sdoicinnovations</p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-lg justify-center">
                <a
                  href="https://bit.ly/sdoicinnovations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto bg-[#032977] hover:bg-blue-800 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-lg hover:shadow-blue-200/50 flex items-center justify-center gap-3 group uppercase tracking-widest text-sm"
                >
                  <Rocket size={18} className="group-hover:-translate-y-1 transition-transform" />
                  <span>Submit Innovation</span>
                  <ExternalLink size={16} />
                </a>
              </div>
           </div>
        </div>

        {/* Impact Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
           {[
             { title: "Targeted", icon: Target, text: "Solutions for specific community needs." },
             { title: "Scalable", icon: Zap, text: "Ideas that can grow across the division." },
             { title: "Impactful", icon: Sparkles, text: "Meaningful change for every learner." }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center p-6 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-white/40">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                   <item.icon size={20} />
                </div>
                <h4 className="font-black uppercase tracking-widest text-xs text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.text}</p>
             </div>
           ))}
        </div>

      </div>

      {/* Footer Decoration */}
      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent" />
    </div>
  );
}
