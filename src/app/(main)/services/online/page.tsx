"use client";

import React from "react";
import Image from "next/image";
import { 
  Monitor, 
  FileEdit, 
  FileText, 
  Clock,
  ShieldCheck,
  Zap,
  ChevronRight,
  Mail,
  Phone,
  Search,
  MessageSquare,
  ClipboardList,
  ShoppingBag,
  CheckSquare,
  Database,
  Briefcase,
  Heart,
  AlertTriangle,
  ExternalLink
} from "lucide-react";

export default function OnlineServices() {
  const services = [
    {
      name: 'Request / Submission of Documents',
      description: 'Submit educational documents and records for processing and validation.',
      Icon: FileText,
      color: 'bg-blue-50 text-blue-600',
      link: '#'
    },
    {
      name: 'Document Tracking System',
      description: 'Track the status of your submitted documents in real-time.',
      Icon: Search,
      color: 'bg-indigo-50 text-indigo-600',
      link: '#'
    },
    {
      name: 'Online Enrollment',
      description: 'Streamlined registration and enrollment process for the current school year.',
      Icon: FileEdit,
      color: 'bg-cyan-50 text-cyan-600',
      link: 'https://bes-online-portal.com/home'
    },
    {
      name: 'Online Feedback',
      description: 'Submit your thoughts and suggestions to help us improve our services.',
      Icon: MessageSquare,
      color: 'bg-emerald-50 text-emerald-600',
      link: 'https://depedimuscity.com/feedbacksystem/'
    },
    {
      name: 'Online OBE Form',
      description: 'Access the Online Oplan Balik Eskwela reporting and monitoring form.',
      Icon: ClipboardList,
      color: 'bg-amber-50 text-amber-600',
      link: '#'
    },
    {
      name: 'PHILGEPS',
      description: 'Access the Philippine Government Electronic Procurement System.',
      Icon: ShoppingBag,
      color: 'bg-orange-50 text-orange-600',
      link: 'https://www.philgeps.gov.ph/'
    },
    {
      name: 'QATAME Satisfaction Form',
      description: 'Quality Assurance, Technical Assistance, Monitoring and Evaluation feedback.',
      Icon: CheckSquare,
      color: 'bg-teal-50 text-teal-600',
      link: '#'
    },
    {
      name: 'Unified Information System',
      description: 'Centralized portal for division-wide information and data management.',
      Icon: Database,
      color: 'bg-violet-50 text-violet-600',
      link: 'https://uis.depedimuscity.com/'
    },
    {
      name: 'Vacancies',
      description: 'Explore career opportunities and job openings within the division.',
      Icon: Briefcase,
      color: 'bg-rose-50 text-rose-600',
      link: '#'
    },
    {
      name: 'Bida System',
      description: 'Integrated health monitoring and daily self-assessment platform.',
      Icon: Heart,
      color: 'bg-red-50 text-red-600',
      link: 'https://bida.depedimuscity.com/'
    },
    {
      name: 'Complaint Form',
      description: 'Formal channel for submitting grievances and reports of misconduct.',
      Icon: AlertTriangle,
      color: 'bg-slate-50 text-slate-600',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdsQbtV6YqCu0fBojOjbZtAmDYzW2_rcpHJ0CczWOz3bWEtuQ/viewform'
    },
    {
      name: 'ICT Easy Links',
      description: 'Quick access to essential ICT resources and technical documentation.',
      Icon: ExternalLink,
      color: 'bg-sky-50 text-sky-600',
      link: 'https://docs.google.com/spreadsheets/d/1SIeX2NFiIdN-VM-tLWWKuoW2gXva1kgBKHaZl38no80/'
    }
  ];

  const benefits = [
    { title: "Convenience", text: "Access services 24/7 from any device.", Icon: Clock },
    { title: "Security", text: "Protected with advanced encryption.", Icon: ShieldCheck },
    { title: "Speed", text: "Instant processing and confirmations.", Icon: Zap }
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-cyan-100 selection:text-cyan-900 pb-16">
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#083344] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-cyan-300 uppercase bg-cyan-950/40 backdrop-blur-md rounded-full border border-cyan-400/30">
            Digital Transformation
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            Online <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
              Platforms
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Empowering the Imusenyo community with accessible, secure, and efficient digital educational services.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Services Grid */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Our Digital Ecosystem</h2>
           <div className="h-1.5 w-20 bg-cyan-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <a 
              key={index}
              href={service.link}
              target={service.link.startsWith('http') ? "_blank" : undefined}
              rel={service.link.startsWith('http') ? "noopener noreferrer" : undefined}
              className="group bg-white rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-3xl ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                 <service.Icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-cyan-600 transition-colors h-14 flex items-center justify-center">{service.name}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow text-sm">{service.description}</p>
              
              <div className="flex items-center gap-2 text-cyan-600 font-black uppercase text-xs tracking-widest pt-6 border-t border-slate-50 w-full justify-center">
                 <span>Launch Portal</span>
                 <ChevronRight size={14} />
              </div>
            </a>
          ))}
        </div>

        {/* Benefits Impact Box */}
        <div className="bg-[#083344] rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl mb-16">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Monitor size={400} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/40 rounded-full border border-cyan-400/20">
                       Efficiency Optimized
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Digital Benefits</h2>
                    <div className="h-1.5 w-20 bg-cyan-400" />
                 </div>
                 <p className="text-xl text-cyan-100 font-medium leading-relaxed">
                    Our online services are engineered to provide maximum impact with minimum friction for all stakeholders.
                 </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 {benefits.map((benefit, i) => (
                   <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center gap-6 group hover:bg-white/15 transition-all">
                      <div className="w-14 h-14 bg-cyan-400/20 rounded-2xl flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400 transition-colors group-hover:text-[#083344]">
                         <benefit.Icon size={24} />
                      </div>
                      <div>
                         <h4 className="font-black uppercase tracking-widest text-xs text-white mb-1">{benefit.title}</h4>
                         <p className="text-sm text-cyan-200 font-medium">{benefit.text}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Support Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-xl overflow-hidden relative">
           <div className="absolute bottom-0 right-0 p-8 opacity-5">
              <ShieldCheck size={150} />
           </div>
           
           <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Technical Support</h2>
              <p className="text-slate-500 font-medium text-lg mb-12 max-w-2xl">
                Encountering issues with our digital platforms? Our IT Support Team is available to ensure your online experience is seamless.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                 <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center">
                    <Mail className="text-cyan-600 mb-4" size={28} />
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">Email Support</h4>
                    <p className="font-bold text-slate-800 break-all text-xs">itsupport.imus@deped.gov.ph</p>
                 </div>
                 <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center">
                    <Phone className="text-cyan-600 mb-4" size={28} />
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">Hotline</h4>
                    <p className="font-bold text-slate-800">(046) 419-8450</p>
                    <p className="text-[10px] font-bold text-cyan-600">LOCAL 205</p>
                 </div>
                 <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center">
                    <Clock className="text-cyan-600 mb-4" size={28} />
                    <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-1">Support Hours</h4>
                    <p className="font-bold text-slate-800">Mon - Fri</p>
                    <p className="text-xs font-bold text-slate-500">8:00 AM - 5:00 PM</p>
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
