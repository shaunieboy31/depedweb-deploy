"use client";

import React from "react";
import Image from "next/image";
import { 
  Activity, 
  Users, 
  DollarSign, 
  Laptop, 
  Package, 
  ChevronRight,
  ShieldCheck,
  Building2,
  Users2
} from "lucide-react";

export default function OSDS() {
  const units = [
    { 
      title: "Office of the Schools Division Superintendent", 
      icon: Building2, 
      href: "/programs/division-office/osds/office-superintendent" 
    },
    { 
      title: "Office of the Assistant Schools Division Superintendent", 
      icon: Users2, 
      href: "/programs/division-office/osds/assistant-superintendent" 
    },
    { 
      title: "Administrative Services Unit", 
      icon: Activity, 
      href: "/programs/division-office/osds/administrative-services" 
    },
    { 
      title: "Human Resource Unit", 
      icon: Users, 
      href: "/programs/division-office/osds/human-resource" 
    },
    { 
      title: "Finance Unit", 
      icon: DollarSign, 
      href: "/programs/division-office/osds/finance" 
    },
    { 
      title: "Information and Communications Technology Unit", 
      icon: Laptop, 
      href: "/programs/division-office/osds/ict" 
    },
    { 
      title: "Supply and Properties", 
      icon: Package, 
      href: "/programs/division-office/osds/supply-properties" 
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900 pb-32">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="OSDS Imus"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#713f12] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-amber-300 uppercase bg-amber-950/40 backdrop-blur-md rounded-full border border-amber-400/30">
            Administrative Leadership
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl text-wrap">
            OSDS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              Units
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            Providing the administrative backbone and strategic executive support for the entire Schools Division Office.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        
        {/* Link List Section */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Functional Divisions</h2>
           <div className="h-1.5 w-20 bg-amber-500 mx-auto" />
        </div>

        <div className="space-y-4 mb-32">
           {units.map((u, i) => (
             <a 
               key={i} 
               href={u.href}
               className="group flex items-center justify-between bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-500"
             >
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                      <u.icon size={24} strokeWidth={1.5} />
                   </div>
                   <h3 className="text-sm md:text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors uppercase tracking-tight">
                     {u.title}
                   </h3>
                </div>
                <div className="w-10 h-10 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                   <ChevronRight size={20} />
                </div>
             </a>
           ))}
        </div>

        {/* Governance Impact Box */}
        <div className="bg-[#422006] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <ShieldCheck size={400} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-950/40 rounded-full border border-amber-400/20">
                       Executive Support
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-wrap">Administrative Excellence</h2>
                    <div className="h-1.5 w-20 bg-amber-400" />
                 </div>
                 <p className="text-xl text-amber-100 font-medium leading-relaxed">
                    OSDS ensures that all administrative operations are optimized for efficiency, transparency, and public service accountability.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { label: "Efficiency", val: "High", icon: Activity },
                   { label: "Service", icon: Users, val: "Ready" }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex flex-col items-center">
                      <div className="text-amber-400 mb-3"><stat.icon size={28} /></div>
                      <span className="block font-black text-white uppercase tracking-widest text-[10px] mb-1">{stat.label}</span>
                      <span className="block font-bold text-amber-400 text-lg uppercase tracking-tight">{stat.val}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
