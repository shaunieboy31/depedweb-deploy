"use client";

import React from "react";
import Image from "next/image";
import { 
  Link as LinkIcon, 
  ExternalLink, 
  Building2, 
  Users2, 
  BookOpenCheck,
  Zap,
  MousePointer2,
  ChevronRight
} from "lucide-react";

export default function EasyLinks() {
  const departments = [
    {
      name: 'OSDS',
      title: 'Office of the Schools Division Superintendent',
      units: [
        'Admin Proper', 'Cash', 'HR Personnel', 'Records', 
        'Supply', 'Finance Unit', 'Legal Unit', 'ICT Unit'
      ],
      links: [
        { name: '0365 Account Management', url: 'https://depedph-my.sharepoint.com/:x:/g/personal/icts_sdd_deped_gov_ph/ETVeWrhuPl9BltZfYZiHABgBWczpVb13IWSUqsZWryXjzQ' },
        { name: 'Teacher Password Reset', url: 'https://mystaff.microsoft.com/' },
        { name: 'DepEd Email Creation', url: 'http://admin.google.com/' },
      ],
      color: 'border-blue-500'
    },
    {
      name: 'SGOD',
      title: 'School Governance & Operations Division',
      units: [
        'Planning', 'HRMS', 'SMME', 'SocMob', 
        'Physical Facilities', 'Medical & Dental'
      ],
      links: [],
      color: 'border-indigo-500'
    },
    {
      name: 'CID',
      title: 'Curriculum Implementation Division',
      units: [
        'ALS (Alternative Learning)', 'LRMS (Learning Resources)', 
        'I LeaRN Portal'
      ],
      links: [
        { name: 'I LeaRN Portal', url: 'https://bit.ly/SDOIC-LR-Portal-ILeaRN' },
      ],
      color: 'border-violet-500'
    }
  ];

  const quickLinks = [
    { name: "Online Enrollment", sub: "BES Portal", url: "https://bes-online-portal.com/home" },
    { name: "Unified Info System", sub: "UIS Portal", url: "https://uis.depedimuscity.com/" },
    { name: "Health Check", sub: "BIDA System", url: "https://bida.depedimuscity.com/" },
    { name: "Online Feedback", sub: "Feedback Portal", url: "https://depedimuscity.com/feedbacksystem/" },
    { name: "Complaint Form", sub: "Report Issues", url: "https://docs.google.com/forms/d/e/1FAIpQLSdsQbtV6YqCu0fBojOjbZtAmDYzW2_rcpHJ0CczWOz3bWEtuQ/viewform" },
    { name: "ICT Easy Links", sub: "Tech Resources", url: "https://docs.google.com/spreadsheets/d/1SIeX2NFiIdN-VM-tLWWKuoW2gXva1kgBKHaZl38no80/" }
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-32">
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#312e81] via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-300 uppercase bg-indigo-950/40 backdrop-blur-md rounded-full border border-indigo-400/30">
            Digital Gateway
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            SDOIC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300">
              Easy Links
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
            Streamlined access to internal systems, departmental resources, and essential portals for the SDO Imus community.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Departmental Sections */}
        <div className="text-center mb-16 px-4">
           <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Divisional Resources</h2>
           <div className="h-1.5 w-20 bg-indigo-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {departments.map((dept, index) => (
            <div key={index} className={`bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border-t-8 ${dept.color} overflow-hidden group`}>
               <div className="p-10 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{dept.name}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                      {dept.title}
                    </p>
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-xs font-black uppercase text-indigo-600 tracking-widest flex items-center gap-2">
                        <Users2 size={14} />
                        <span>Units & Services</span>
                     </h4>
                     <div className="flex flex-wrap gap-2">
                        {dept.units.map((unit, ui) => (
                          <span key={ui} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-colors uppercase tracking-tight">
                            {unit}
                          </span>
                        ))}
                     </div>
                  </div>

                  {dept.links.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-slate-50">
                       <h4 className="text-xs font-black uppercase text-indigo-600 tracking-widest flex items-center gap-2">
                          <LinkIcon size={14} />
                          <span>Direct Links</span>
                       </h4>
                       <div className="space-y-3">
                          {dept.links.map((link, li) => (
                            <a 
                              key={li} 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-between group/link p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors"
                            >
                               <span className="text-xs font-bold text-slate-700 group-hover/link:text-indigo-600">{link.name}</span>
                               <ExternalLink size={14} className="text-slate-300 group-hover/link:text-indigo-400" />
                            </a>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>
          ))}
        </div>

        {/* Quick Access Grid */}
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-slate-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Zap size={300} />
           </div>
           
           <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                 <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
                       Speed & Convenience
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Quick Portals</h2>
                 </div>
                 <p className="text-slate-500 font-medium max-w-sm">
                    Direct entry points for students, parents, and personnel to the most active systems in our division.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {quickLinks.map((link, i) => (
                   <a 
                     key={i} 
                     href={link.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="bg-slate-50 hover:bg-indigo-600 p-8 rounded-3xl transition-all group flex flex-col items-start shadow-sm hover:shadow-indigo-200/50"
                   >
                     <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                        <MousePointer2 size={20} />
                     </div>
                     <h4 className="font-black text-slate-900 group-hover:text-white transition-colors mb-1">{link.name}</h4>
                     <p className="text-xs font-bold text-slate-400 group-hover:text-indigo-100 uppercase tracking-widest">{link.sub}</p>
                   </a>
                 ))}
              </div>
           </div>
        </div>

      </div>

      {/* Impact Support Box */}
      <section className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-[#312e81] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl text-center">
          <div className="absolute top-0 left-0 p-12 opacity-10">
             <BookOpenCheck size={300} strokeWidth={0.5} />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Need Assistance?</h2>
            <p className="text-xl text-indigo-100 font-medium leading-relaxed">
              Contact the ICT Unit or visit our main office for technical support and portal access inquiries.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-indigo-300">
                     <Building2 size={20} />
                  </div>
                  <span className="font-bold">(046) 419-8450</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-indigo-300">
                     <LinkIcon size={20} />
                  </div>
                  <span className="font-bold">sgod.imus@deped.gov.ph</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="w-full h-24 bg-gradient-to-t from-slate-200/50 to-transparent pt-32" />
    </div>
  );
}
