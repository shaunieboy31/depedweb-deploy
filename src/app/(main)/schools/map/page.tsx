"use client";

import React from "react";
import Image from "next/image";
import { 
  Map as MapIcon, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Sparkles,
  Award,
  BookOpen,
  Users,
  Navigation,
  Globe,
  Layers
} from "lucide-react";

export default function SchoolsMap() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      {/* Institutional Hero */}
      <section className="relative h-[350px] md:h-[450px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/newbuilding.webp"
            alt="Schools Map"
            fill
            className="object-cover object-center brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-[#032977]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            <MapIcon size={12} className="text-blue-400" />
            <span>Geographical Visualization</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-2xl">
             SCHOOLS <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">MAP</span>
          </h1>
          <p className="text-slate-300 font-medium italic text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
             "Locating educational landmarks across the vibrant schools division of Imus City."
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Map Placeholder/Frame (Spans 8) */}
          <div className="lg:col-span-8 space-y-6">
             <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden relative group aspect-video lg:aspect-auto lg:h-[700px]">
                <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center space-y-8 p-12 text-center">
                   <div className="relative">
                      <div className="absolute inset-0 bg-blue-600 blur-[80px] opacity-20 animate-pulse" />
                      <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl text-blue-600 group-hover:scale-110 transition-transform duration-700">
                         <MapIcon size={64} strokeWidth={1.5} />
                      </div>
                   </div>
                   <div className="space-y-4 max-w-md">
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">INTERACTIVE MAP LOADING</h3>
                      <p className="text-slate-500 font-medium leading-relaxed">
                         Our interactive GIS (Geographic Information System) for division-wide school locations is being optimized for your browser.
                      </p>
                   </div>
                   <div className="flex items-center gap-4">
                      <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">
                         Launch GIS Tools
                      </button>
                      <button className="px-8 py-4 bg-white border border-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all">
                         View Layers
                      </button>
                   </div>
                </div>

                {/* Decorative Map Grid overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
             </div>
          </div>

          {/* Quick Stats & Filters (Spans 4) */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                   <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Layers size={20} />
                   </div>
                   <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Map Layers</h4>
                </div>
                
                <div className="space-y-4">
                   {[
                     { label: "Public Schools", count: "60+", active: true },
                     { label: "Private Schools", count: "100+", active: false },
                     { label: "District Boundaries", count: "3", active: false },
                     { label: "Institutional Assets", count: "Active", active: false }
                   ].map((layer, i) => (
                      <div key={i} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                         layer.active ? 'bg-blue-50 border-blue-100' : 'bg-slate-50/50 border-slate-100 hover:border-blue-100'
                      }`}>
                         <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${layer.active ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{layer.label}</span>
                         </div>
                         <span className="text-[9px] font-black text-slate-400">{layer.count}</span>
                      </div>
                   ))}
                </div>
             </div>

             <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                   <Navigation size={120} />
                </div>
                <div className="relative z-10 space-y-6">
                   <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Globe size={24} />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tight">GPS Enabled</h3>
                      <p className="text-emerald-100 text-[10px] font-medium leading-relaxed">
                         Our directory uses precise geolocation data to help you navigate to school facilities with ease.
                      </p>
                   </div>
                   <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                      <div className="w-1.5 h-12 bg-white/20 rounded-full" />
                      <div>
                         <p className="text-[9px] font-black uppercase tracking-widest text-emerald-200">System</p>
                         <p className="text-xs font-bold">Imus GIS v2.0</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
