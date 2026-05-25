"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  Eye,
  FileDown,
  ArrowLeft,
  Globe,
  Inbox
} from "lucide-react";
import Link from "next/link";

export default function NationalIssuances() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockDocs = [
    { id: 1, num: "DO No. 002, s. 2024", title: "ADOPTION OF THE MATATAG CURRICULUM FOR KINDERGARTEN TO GRADE 10", date: "April 05, 2024", size: "5.2 MB" },
    { id: 2, num: "DO No. 001, s. 2024", title: "IMPLEMENTATION OF THE DEPED DIGITIZATION PROGRAM", date: "January 15, 2024", size: "3.1 MB" },
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      {/* Institutional Hero - Standardized Background */}
      <section className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus"
            fill
            className="object-cover object-center brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#032977]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full space-y-12 mt-12">
           <Link href="/issuances" className="inline-flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
              <ArrowLeft size={14} />
              <span>Back to Archive Hub</span>
           </Link>

           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30 text-blue-300 text-[10px] font-black uppercase tracking-widest">
                 <Globe size={12} />
                 <span>Central Office</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                 NATIONAL <span className="text-blue-400 underline decoration-blue-500/30 underline-offset-8">ISSUANCES</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-lg font-medium max-w-2xl">
                 Official DepEd Orders, Memoranda, and National Guidelines issued by the Central Office for nationwide implementation.
              </p>
           </div>

           <div className="relative group max-w-3xl">
              <div className="absolute inset-y-0 left-6 flex items-center text-slate-400 group-focus-within:text-blue-400 transition-colors">
                 <Search size={24} />
              </div>
              <input 
                 type="text" 
                 placeholder="Search National DepEd Orders & Issuances..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-16 pr-8 py-8 bg-white rounded-3xl text-slate-900 placeholder:text-slate-400 font-bold shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg transition-all"
              />
           </div>
        </div>
      </section>

      {/* Result Grid */}
      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-20 space-y-8">
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4 text-slate-500">
              <Filter size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Level:</span>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest">Philippines (Central Office)</div>
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Archive Active</p>
        </div>

        {/* Modern Simplified Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead className="bg-[#032977] text-white">
                    <tr>
                       <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] first:pl-10">Reference Number</th>
                       <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Year</th>
                       <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Title</th>
                       <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em]">File</th>
                       <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] last:pr-10">Date Uploaded</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {mockDocs.map((doc) => (
                      <tr key={doc.id} className="group hover:bg-blue-50/50 transition-all duration-300">
                         <td className="px-8 py-8 first:pl-10">
                            <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                               {doc.num.split(',')[0].replace('DO No. ', '')}
                            </span>
                         </td>
                         <td className="px-8 py-8 text-sm font-bold text-slate-500 uppercase italic">
                            {doc.num.split('s. ')[1]}
                         </td>
                         <td className="px-8 py-8">
                            <h3 className="text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-snug uppercase tracking-tight">
                               {doc.title}
                            </h3>
                         </td>
                         <td className="px-8 py-8">
                            <button className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 active:scale-95">
                               <FileDown size={14} />
                               <span>Download PDF</span>
                            </button>
                         </td>
                         <td className="px-8 py-8 last:pr-10">
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{doc.date}</span>
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">00:00:00</span>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="bg-slate-50/50 rounded-[3rem] p-16 border-2 border-dashed border-slate-200 text-center space-y-6">
           <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-slate-200">
              <Inbox size={40} />
           </div>
           <div className="space-y-2">
              <h4 className="text-xl font-black text-slate-900 uppercase">National Archive Portal</h4>
              <p className="text-slate-500 text-sm font-medium">Official policy documents and national department orders.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
