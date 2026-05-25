"use client";

import React from "react";
import Image from "next/image";
import { 
  BookOpen, 
  GraduationCap, 
  HeartHandshake, 
  LineChart, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight
} from "lucide-react";

export default function FrontlineServices() {
  const coreServices = [
    {
      title: "Curriculum Implementation",
      description: "Comprehensive support and guidance for curriculum delivery across all grade levels in the division.",
      Icon: BookOpen,
    },
    {
      title: "Teacher Development",
      description: "Advanced professional development programs and intensive training to enhance instructional excellence.",
      Icon: GraduationCap,
    },
    {
      title: "Student Support",
      description: "Holistic academic counseling, specialized education services, and comprehensive student welfare programs.",
      Icon: HeartHandshake,
    },
    {
      title: "Assessment & Monitoring",
      description: "Rigorous assessment and continuous monitoring of student outcomes and institutional performance.",
      Icon: LineChart,
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
            Education Legacy
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Frontline <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Services
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Direct educational support delivering quality basic education and fostering academic excellence for every Imusenyo.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Core Services Section */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Core Educational Pillars</h2>
           <div className="h-1.5 w-20 bg-[#4279D2] mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {coreServices.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex gap-8 items-start"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-blue-50 text-[#4279D2] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <service.Icon size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#4279D2] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-1 text-[#4279D2] text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   <span>Details</span>
                   <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Hours Impact Box */}
        <div className="bg-[#032977] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10">
             <Phone size={300} strokeWidth={0.5} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-[#4279D2] uppercase bg-white rounded-full border border-white/20">
                  Contact Hub
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Service Desk</h2>
                <div className="h-1.5 w-20 bg-blue-400" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                   <div className="w-10 h-10 bg-blue-400/20 rounded-xl flex items-center justify-center text-blue-300">
                      <Clock size={20} />
                   </div>
                   <div>
                      <p className="text-xs font-black uppercase text-blue-300">Operation Hours</p>
                      <p className="text-sm font-bold text-white">Mon - Fri: 8:00 AM - 5:00 PM</p>
                   </div>
                </div>

                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 bg-blue-400/20 rounded-xl flex items-center justify-center text-blue-300 mt-1">
                      <MapPin size={20} />
                   </div>
                   <div>
                      <p className="text-xs font-black uppercase text-blue-300">Location</p>
                      <p className="text-sm font-bold text-white leading-relaxed">
                        Satorre St. Toclong I.C, Imus,<br />City Cavite, 4103 Philippines
                      </p>
                   </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/15 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                       <Phone size={24} className="text-white" />
                    </div>
                    <div>
                       <h4 className="font-black uppercase tracking-widest text-xs text-blue-200">Phone Support</h4>
                       <p className="text-xl font-bold">(046) 419-8450</p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-200/70">Local lines: 204, 227 for SGOD inquiries</p>
               </div>

               <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/15 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                       <Mail size={24} className="text-white" />
                    </div>
                    <div>
                       <h4 className="font-black uppercase tracking-widest text-xs text-blue-200">Official Email</h4>
                       <p className="text-xl font-bold">sgod.imus@deped.gov.ph</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Decoration */}
      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent" />
    </div>
  );
}
