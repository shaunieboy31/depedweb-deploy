"use client";

import React from "react";
import Image from "next/image";
import { 
  BookOpen, 
  Smile, 
  Lightbulb, 
  Link as LinkIcon, 
  Monitor, 
  ShieldCheck, 
  Zap, 
  Award,
  Users
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Frontline Services',
      description: 'Quality educational services delivered directly to students, teachers, and school communities.',
      Icon: BookOpen,
      link: '/services/frontline',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 2,
      title: 'Satisfaction',
      description: 'Client satisfaction survey and feedback mechanisms to ensure continuous service improvement.',
      Icon: Smile,
      link: '/services/satisfaction',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 3,
      title: 'Innovation',
      description: 'Innovative programs and initiatives to enhance educational quality and student outcomes.',
      Icon: Lightbulb,
      link: '/services/innovation',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      id: 4,
      title: 'SDOIC Easy Links',
      description: 'Quick access to frequently needed services and information from the Schools Division Office.',
      Icon: LinkIcon,
      link: '/services/easy-links',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 5,
      title: 'Online Services',
      description: 'Digital services and online platforms for student enrollment, records, and inquiries.',
      Icon: Monitor,
      link: '/services/online',
      color: 'bg-cyan-50 text-cyan-600'
    },
  ];

  const standards = [
    {
      title: "Accessibility",
      description: "All services are designed to be accessible to students, parents, teachers, and community members during office hours.",
      Icon: Users
    },
    {
      title: "Quality",
      description: "We maintain high standards of service quality in all our operations and interactions with stakeholders.",
      Icon: Award
    },
    {
      title: "Responsiveness",
      description: "Our team is committed to promptly addressing inquiries and concerns from all stakeholders.",
      Icon: Zap
    },
    {
      title: "Accountability",
      description: "We maintain transparent and ethical governance in all service delivery processes.",
      Icon: ShieldCheck
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#032977] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            Our Commitment
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Responsive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Services
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Delivering quality educational support and administrative excellence to the Schools Division Office of Imus City.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col items-center text-center mb-20 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Public Service Pillars</h2>
           <div className="h-1.5 w-20 bg-[#4279D2] mx-auto mb-6" />
           <p className="text-slate-500 max-w-2xl font-medium text-lg">
             Explore our core service categories designed to empower learners, support educators, and engage the community.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col items-center text-center"
            >
              <div className={`p-6 rounded-[2rem] ${service.color} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                 <service.Icon size={40} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-[#4279D2] transition-colors">{service.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">{service.description}</p>
              
              <div className="flex items-center gap-2 text-[#4279D2] font-black uppercase text-xs tracking-widest pt-4 border-t border-slate-50 w-full justify-center">
                 <span>View Details</span>
                 <Zap size={14} className="fill-current" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Service Standards Impact Box */}
      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-[#032977] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10">
             <ShieldCheck size={300} strokeWidth={0.5} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 rounded-full border border-emerald-400/20">
                  Citizen's Charter
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Service Standards</h2>
                <div className="h-1.5 w-20 bg-emerald-400" />
              </div>
              
              <p className="text-xl text-blue-100 font-medium leading-relaxed italic">
                "We hold ourselves to the highest benchmarks of public service, ensuring every interaction is meaningful, timely, and impactful."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {standards.map((s, i) => (
                 <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/15 transition-all">
                    <div className="w-10 h-10 bg-blue-400/20 rounded-xl flex items-center justify-center text-blue-300 mb-4">
                       <s.Icon size={20} />
                    </div>
                    <h3 className="font-black uppercase tracking-widest text-xs mb-2 text-white">{s.title}</h3>
                    <p className="text-xs text-blue-200 font-medium leading-relaxed">{s.description}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent pt-32" />
    </div>
  );
}
