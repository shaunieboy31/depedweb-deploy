"use client";

import React from "react";
import Image from "next/image";
import { 
  MapPin, 
  Clock, 
  Building2, 
  Target, 
  Eye, 
  ShieldCheck, 
  ChevronRight,
  HardHat,
  Ruler,
  Calendar,
  Layers,
  Phone,
  Mail
} from "lucide-react";

export default function DivisionProfile() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[750px] w-full">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/newbuilding.webp"
            alt="Schools Division Office building"
            fill
            className="object-cover object-center scale-105 transition-transform duration-10000 ease-out hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/80" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center sm:hidden px-6">
           {/* Mobile Title */}
           <div className="text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight drop-shadow-lg">
                Division Profile
              </h1>
              <p className="mt-4 text-lg opacity-90 drop-shadow-md">
                Excellence in Education, Service with Integrity
              </p>
           </div>
        </div>

        <div className="absolute inset-0 hidden sm:flex items-end pb-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
                Schools Division Office of Imus City
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
                A Beacon of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Academic Excellence
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl drop-shadow-lg">
                Committed to providing quality, equitable, and culture-based basic education 
                for every learner in the vibrant City of Imus.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Quick Info Bar - Desktop Only */}
        <div className="absolute bottom-0 left-0 right-0 hidden lg:block translate-y-1/2 px-12 z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-1 p-1 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden">
            <div className="flex items-center gap-4 px-8 py-10 hover:bg-white/50 transition-colors cursor-default border-r border-white/50">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</p>
                <p className="font-semibold text-slate-900">Imus City, Cavite</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-8 py-10 hover:bg-white/50 transition-colors cursor-default border-r border-white/50">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office Hours</p>
                <p className="font-semibold text-slate-900">8:00 AM - 5:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4 px-8 py-10 hover:bg-white/50 transition-colors cursor-default border-r border-white/50">
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Establishment</p>
                <p className="font-semibold text-slate-900">Primary SDO Hub</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 px-8 py-10 hover:bg-blue-600 group transition-all duration-300 cursor-pointer text-blue-600">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-2xl text-white group-hover:bg-white group-hover:text-blue-600 transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-blue-100">Get in Touch</p>
                  <p className="font-semibold text-slate-900 group-hover:text-white">Contact Us</p>
                </div>
              </div>
              <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 lg:pt-48 pb-32">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
              <Image 
                src="/images/deped-division-office-imus.webp"
                alt="Division Office Interior"
                width={800}
                height={600}
                className="w-full object-cover aspect-[4/3] scale-100 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg">
                <h4 className="font-bold text-slate-900 mb-1 leading-tight">SDO Imus City Building</h4>
                <p className="text-sm text-slate-600">The central administrative hub for excellence in education.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium text-xs uppercase tracking-widest">
              <Layers size={14} />
              <span>Core Identity</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Empowering Every <br />
              <span className="text-blue-600 italic">BIDAng</span> Imusenyo
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                The Schools Division Office of Imus City stands as a testament to the city's dedication to its youth. 
                Operating under the Department of Education, we are tasked with implementing national education policies 
                tailored to the unique needs of our community.
              </p>
              <p>
                Our commitment goes beyond administrative duties; we strive to foster an environment where 
                quality, equitable, and culture-based education flourish for all learners.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-blue-600 mb-1 leading-tight">35+</p>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-tight">Public Schools Managed</p>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-3xl font-black text-emerald-600 mb-1 leading-tight">ISO</p>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-tight">Certified Quality Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {/* Mission */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-500" />
            <div className="relative h-full p-10 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start space-y-6">
              <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition duration-500">
                <Target size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed font-medium mb-6">
                  To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:
                </p>
                <ul className="space-y-4">
                  {[
                    "Students learn in a child-friendly, safe environment",
                    "Teachers facilitate learning and nurture learners",
                    "Administrators ensure an enabling environment",
                    "Stakeholders are actively engaged in development"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <div className="mt-1.5 min-w-[6px] h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <span className="text-sm font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-500" />
            <div className="relative h-full p-10 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start space-y-6">
              <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition duration-500">
                <Eye size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Our Vision</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  We dream of Filipinos who passionately love their country and whose values and competencies 
                  enable them to realize their full potential and contribute meaningfully to building the nation.
                </p>
                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4 text-emerald-700">
                  <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-sm font-bold tracking-tight uppercase">Nation-Building Committed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Policy - Large Impact Box */}
        <div id="policy" className="relative mb-32 rounded-[2.5rem] overflow-hidden bg-slate-900 text-white p-12 md:p-20 shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10">
             <ShieldCheck size={300} strokeWidth={0.5} />
          </div>
          <div className="relative z-10 max-w-4xl">
            <span className="inline-block px-4 py-1 mb-8 text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/40 rounded-full border border-emerald-400/20">
              Quality Assurance
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Quality Policy</h2>
            <div className="space-y-8">
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-300">
                "Schools Division Office of Imus City commits to delivering quality services 
                responsive to the needs of its clientele in accordance with mandated standards, 
                principles of transparent, ethical and accountable governance, and continuous 
                improvement processes towards the holistic development of <span className="text-white font-black italic">BIDAng</span> Imusenyo."
              </p>
              <div className="flex flex-wrap gap-8 pt-4">
                 <div className="flex items-center gap-3">
                   <div className="h-2 w-2 rounded-full bg-emerald-400" />
                   <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">Transparent</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="h-2 w-2 rounded-full bg-emerald-400" />
                   <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">Ethical</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="h-2 w-2 rounded-full bg-emerald-400" />
                   <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">Accountable</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Building Specifications Grid */}
        <div id="specs" className="mb-32">
          <div className="flex flex-col items-center text-center mb-16 px-4">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Building Specifications</h2>
             <p className="text-slate-500 max-w-2xl font-medium">Technical details and institutional capacity of our central office building.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Calendar size={24} />, label: "Completion Year", value: "2018" },
              { icon: <Layers size={24} />, label: "Total Floors", value: "3 Levels" },
              { icon: <Ruler size={24} />, label: "Plot Area", value: "2,400 m²" },
              { icon: <HardHat size={24} />, label: "Structure Type", value: "Reinforced Concrete" },
            ].map((spec, idx) => (
              <div key={idx} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
                <div className="p-4 bg-slate-50 text-slate-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {spec.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                  <p className="text-xl font-black text-slate-900">{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Contact Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Visit our Division Office</h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
              We are open Monday to Friday to serve our stakeholders with professionalism and heart.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:imus.city@deped.gov.ph"
                className="flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-50 transition-colors w-full sm:w-auto"
              >
                <Mail size={20} />
                <span>info@depedimus.ph</span>
              </a>
              <a 
                href="#visit"
                className="flex items-center gap-3 bg-blue-500/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                <MapPin size={20} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
