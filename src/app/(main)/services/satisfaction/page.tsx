"use client";

import React from "react";
import Image from "next/image";
import { 
  Smile, 
  MessageSquare, 
  Users, 
  Heart, 
  Phone, 
  Mail, 
  Globe, 
  Building2,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function Satisfaction() {
  const targetGroups = [
    { name: "Students & Learners", Icon: Users },
    { name: "Parents & Guardians", Icon: Heart },
    { name: "Teachers & Administrators", Icon: Building2 },
    { name: "Community Stakeholders", Icon: Globe }
  ];

  const feedbackMethods = [
    {
      title: "Online Feedback",
      description: "Submit your thoughts directly through our integrated web portal.",
      Icon: MessageSquare,
      link: "https://depedimuscity.com/feedbacksystem/"
    },
    {
      title: "Email Outreach",
      description: "Send detailed recommendations to our official monitoring team.",
      Icon: Mail,
      link: "mailto:sgod.imus@deped.gov.ph"
    },
    {
      title: "Direct Phone",
      description: "Speak with our representatives for immediate assistance.",
      Icon: Phone,
      link: "tel:0464198450"
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-32">
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-emerald-300 uppercase bg-emerald-950/40 backdrop-blur-md rounded-full border border-emerald-400/30">
            Voice of the People
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Client <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Satisfaction
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Valuing your feedback to continuously enhance our service delivery and educational impact in Imus City.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Stakeholder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 leading-tight">Continuous <br /><span className="text-emerald-600">Improvement</span></h2>
              <div className="h-1.5 w-20 bg-emerald-500" />
            </div>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              We conduct regular satisfaction surveys to gather meaningful insights from across our diverse educational community. Every response influences our operational standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {targetGroups.map((group, i) => (
                 <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group hover:border-emerald-200 transition-colors">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                       <group.Icon size={18} />
                    </div>
                    <span className="font-bold text-slate-700 text-sm">{group.name}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-[3rem] blur-2xl opacity-30 animate-pulse" />
            <div className="relative bg-white rounded-[2.5rem] p-12 shadow-xl border border-slate-100">
               <Smile size={64} className="text-emerald-500 mb-8" />
               <h3 className="text-2xl font-black text-slate-900 mb-6">Our Commitment</h3>
               <div className="space-y-4">
                  {[
                    "Responsive service standards",
                    "Transparent feedback processing",
                    "Data-driven operational updates",
                    "Stakeholder-centric governance"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                       <CheckCircle2 size={20} className="text-emerald-500 mt-1 flex-shrink-0" />
                       <p className="text-slate-600 font-medium">{text}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Feedback Methods Section */}
        <div className="text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">How to reach us</h2>
           <div className="h-1.5 w-20 bg-emerald-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbackMethods.map((method, index) => (
            <a 
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? "_blank" : undefined}
              rel={method.link.startsWith('http') ? "noopener noreferrer" : undefined}
              className="group bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="flex-shrink-0 w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 mb-8">
                 <method.Icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {method.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                {method.description}
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-black uppercase text-xs tracking-widest pt-6 border-t border-slate-50 w-full justify-center">
                 <span>Reach out</span>
                 <ChevronRight size={14} />
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* Impact Policy Section */}
      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-[#064e3b] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl text-center">
          <div className="absolute top-0 left-0 p-12 opacity-10">
             <Smile size={300} strokeWidth={0.5} />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 rounded-full border border-emerald-400/20">
                Ethical Standard
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Your Voice Matters</h2>
              <div className="h-1.5 w-20 bg-emerald-400 mx-auto" />
            </div>
            
            <p className="text-xl text-emerald-100 font-medium leading-relaxed">
              We are committed to delivering responsive, high-quality services that meet the needs and expectations of all our stakeholders. Your feedback helps us continuously improve our operations and services.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent pt-32" />
    </div>
  );
}
