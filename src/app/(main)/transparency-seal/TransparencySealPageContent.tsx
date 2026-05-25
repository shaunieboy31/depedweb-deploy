"use client";

import React from "react";
import Image from "next/image";
import { 
  FileText, 
  LayoutGrid, 
  CheckCircle2, 
  Building2, 
  Coins, 
  BarChart3, 
  ShoppingBag, 
  Award, 
  ShieldCheck, 
  Scale, 
  BookOpen, 
  Info, 
  Lock,
  Download,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TransparencyItem {
  id: number;
  category: string;
  title: string;
  url: string;
  isExternal: boolean;
  year: string | null;
  order: number;
}

interface TransparencySealPageContentProps {
  items: TransparencyItem[];
}

export default function TransparencySealPageContent({ items }: TransparencySealPageContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query) ||
      (item.year && item.year.includes(query))
    );
  }, [items, searchQuery]);

  const getItemsByCategory = (category: string) => {
    return filteredItems
      .filter(item => item.category === category)
      .sort((a, b) => {
        // 1. Sort by Year Descending
        if (a.year && b.year) {
          const yearA = parseInt(a.year);
          const yearB = parseInt(b.year);
          if (!isNaN(yearA) && !isNaN(yearB)) {
             return yearB - yearA;
          }
          return b.year.localeCompare(a.year);
        }
        if (a.year && !b.year) return -1;
        if (!a.year && b.year) return 1;

        // 2. Sort by manual Order
        if (a.order !== b.order) {
          return a.order - b.order;
        }

        // 3. Fallback to Title
        return a.title.localeCompare(b.title);
      });
  };

  const getExtraCategories = (prefix: string, excluded: string[]) => {
    const cats = Array.from(new Set(filteredItems.map(i => i.category)))
      .filter(c => (c === prefix || c.startsWith(prefix + '.')) && !excluded.includes(c))
      .sort();
    return cats;
  };

  const renderDynamicSubSections = (prefix: string, excluded: string[]) => {
    const extras = getExtraCategories(prefix, excluded);
    return extras.map(cat => {
      const parts = cat.split('.');
      const letter = parts[parts.length - 1];
      return (
        <SubSection key={cat} title={`${letter}. Additional Compliance Documents`}>
          <DocumentList>
            {getItemsByCategory(cat).map(item => (
              <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
            ))}
          </DocumentList>
        </SubSection>
      );
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      
      {/* Header / Hero Section */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16 mb-8">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ShieldCheck size={14} />
            <span>Official Government Compliance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Transparency <span className="text-blue-600">Seal</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Compliance with Section 93 (Transparency Seal) of the General Appropriations Act of FY 2012
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto pt-6 group">
             <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <LayoutGrid size={20} />
             </div>
             <input 
                type="text"
                placeholder="Search compliance documents, years, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-slate-900 shadow-sm"
             />
             {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                   <span className="text-[10px] font-black uppercase tracking-widest bg-slate-200 px-2 py-0.5 rounded-lg">Clear</span>
                </button>
             )}
          </div>
          {/* Section Quick Navigation */}
          <div className="sticky top-4 z-40 bg-white/80 backdrop-blur-xl border border-slate-200 p-2 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-wrap justify-center gap-1 sm:gap-2 animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
            {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'].map((num, idx) => (
              <button 
                key={num}
                onClick={() => {
                   const el = document.getElementById(`section-${idx + 1}`);
                   if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl text-[10px] sm:text-xs font-black text-slate-400 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 space-y-8">
        
        {searchQuery && (
           <div className="flex items-center justify-between bg-blue-50/50 border border-blue-100 p-6 rounded-[2rem] animate-in zoom-in duration-500">
              <div className="flex items-center gap-4 text-blue-700">
                 <div className="p-2 bg-blue-100 rounded-xl">
                    <LayoutGrid size={20} />
                 </div>
                 <div>
                    <p className="text-xs font-black uppercase tracking-widest">Search Results</p>
                    <p className="text-sm font-bold">Found {filteredItems.length} documents matching "{searchQuery}"</p>
                 </div>
              </div>
              <button 
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Reset
              </button>
           </div>
        )}

        {filteredItems.length === 0 && searchQuery && (
           <div className="text-center py-20 space-y-6 bg-white border border-dashed border-slate-200 rounded-[3rem]">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100">
                 <ShieldCheck size={40} className="text-slate-200" />
              </div>
              <div className="space-y-2">
                 <p className="text-lg font-black text-slate-900 uppercase italic">No Matches Found</p>
                 <p className="text-sm text-slate-400 font-medium">Try searching for a different keyword, year, or section.</p>
              </div>
           </div>
        )}
        
        {/* Legal Basis Card */}
        <Card className="border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="flex-shrink-0 mx-auto md:mx-0 p-4 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                <Image
                  src="/images/logo/transparency-seal-160x160.png"
                  alt="Transparency Seal Logo"
                  width={140}
                  height={140}
                  className="opacity-90 hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3 text-blue-600">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Legal Basis</h2>
                </div>

                <div className="text-slate-600 leading-relaxed font-medium text-sm md:text-base space-y-4">
                  <p>
                    National Budget Circular 542, issued by the Department of Budget and Management (DBM) on August 29, 2012,
                    reiterates compliance with Section 93 of the General Appropriations Act of FY 2012. 
                  </p>
                  
                  <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-blue-600 italic">
                    <p className="font-bold text-slate-800 mb-2">Sec. 93. Transparency Seal.</p>
                    <p className="text-sm">
                      "To enhance transparency and enforce accountability, all national government agencies shall maintain a transparency seal on their official websites..."
                    </p>
                    <a 
                      href="https://www.officialgazette.gov.ph/2011/05/13/executive-order-no-43-s-2011/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 mt-4 text-blue-600 underline font-bold text-xs"
                    >
                      View Full E.O. No. 43, s. 2011 <ExternalLink size={12} />
                    </a>
                  </div>

                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider pt-4 border-t border-slate-100">
                    Compliance with Sec. 91 | R.A. No. 10633 (GAA FY 2014)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Index Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-900 text-white rounded-xl">
                <LayoutGrid size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Compliance Index</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Document Registry</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 px-4 py-1 gap-1.5 font-black uppercase text-[9px] tracking-widest hidden sm:flex">
              <CheckCircle2 size={12} />
              Verified SY 2026
            </Badge>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            
            {/* I. Mandates and Officials */}
            <ComplianceItem 
              value="section-1"
              icon={<Building2 className="text-blue-600" size={20} />}
              title="I. Agency Mandates, Vision, Mission, and List of Officials"
            >
              <div className="space-y-6 pt-2">
                <SubSection title="A. Agency Mandate, Vision, Mission">
                  <DocumentList>
                    {getItemsByCategory('1.A').map(item => (
                      <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                    ))}
                  </DocumentList>
                </SubSection>
                <SubSection title="B. Organizational Structure & List of Officials">
                  <DocumentList>
                    {getItemsByCategory('1.B').map(item => (
                      <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                    ))}
                  </DocumentList>
                </SubSection>
                {renderDynamicSubSections('1', ['1.A', '1.B'])}
              </div>
            </ComplianceItem>

            {/* II. Annual Financial Reports */}
            <ComplianceItem 
              value="section-2"
              icon={<Coins className="text-amber-600" size={20} />}
              title="II. Annual Financial Reports"
              description="Last three (3) fiscal years as per NBC Nos. 507 and 507-A"
            >
              <div className="space-y-8 pt-2">
                <SubSection title="A. Financial Accountability Reports (FAR)">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReportCategory title="FAR No. 1: SAAOBDB">
                      {getItemsByCategory('2.A.1').map(item => (
                        <YearLink key={item.id} year={parseInt(item.year || "0")} href={item.url} />
                      ))}
                    </ReportCategory>
                    <ReportCategory title="FAR No. 1A: Summary SAAOBDB">
                      {getItemsByCategory('2.A.1A').map(item => (
                        <YearLink key={item.id} year={parseInt(item.year || "0")} href={item.url} />
                      ))}
                    </ReportCategory>
                  </div>
                </SubSection>

                <Separator className="opacity-50" />

                <SubSection title="B. Annual Physical Report of Operations (BAR)">
                  <DocumentList>
                    {getItemsByCategory('2.B').map(item => (
                      <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                    ))}
                  </DocumentList>
                </SubSection>
                {renderDynamicSubSections('2', ['2.A.1', '2.A.1A', '2.B'])}
              </div>
            </ComplianceItem>

            {/* III. Approved Budgets */}
            <ComplianceItem 
              value="section-3"
              icon={<BarChart3 className="text-emerald-600" size={20} />}
              title="III. DBM Approved Budgets and Corresponding Targets"
            >
              <div className="space-y-6 pt-2">
                <SubSection title="A. DBM Approved Budget (GAA)">
                  <DocumentList>
                    {getItemsByCategory('3.A').map(item => (
                      <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                    ))}
                  </DocumentList>
                </SubSection>
                {renderDynamicSubSections('3', ['3.A'])}
              </div>
            </ComplianceItem>

            {/* IV. Major Projects */}
            <ComplianceItem 
              value="section-4"
              icon={<Award className="text-indigo-600" size={20} />}
              title="IV. Major Projects, Programs and Activities (PPAs)"
            >
              <div className="space-y-6 pt-2">
                <SubSection title="A. Annual Implementation Plan (AIP)">
                  <DocumentList>
                    {getItemsByCategory('4.A').map(item => (
                      <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                    ))}
                  </DocumentList>
                </SubSection>
                {renderDynamicSubSections('4', ['4.A'])}
              </div>
            </ComplianceItem>

            {/* V. Procurement */}
            <ComplianceItem 
              value="section-5"
              icon={<ShoppingBag className="text-rose-600" size={20} />}
              title="V. Annual Procurement Plan and Contracts Awarded"
            >
              <div className="space-y-6 pt-2">
                <SubSection title="A. Annual Procurement Plan (APP)">
                  <div className="flex flex-wrap gap-2">
                    {getItemsByCategory('5.A').map((item) => (
                      <Badge key={item.id} variant="secondary" className="hover:bg-slate-100 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight">
                         <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                           {item.title} <Download size={10} />
                         </a>
                      </Badge>
                    ))}
                  </div>
                </SubSection>
                <SubSection title="B. Awarded Contracts">
                  <DocumentList>
                    {getItemsByCategory('5.B').map(item => (
                      <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                    ))}
                  </DocumentList>
                </SubSection>
                {renderDynamicSubSections('5', ['5.A', '5.B'])}
              </div>
            </ComplianceItem>

            {/* VI. QMS */}
            <ComplianceItem 
              value="section-6"
              icon={<BookOpen className="text-sky-600" size={20} />}
              title="VI. Quality Management System (QMS) & Operations Manual"
            >
              <div className="space-y-4 pt-2">
                <DocumentList>
                  {getItemsByCategory('6').map(item => (
                    <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                  ))}
                </DocumentList>
                {renderDynamicSubSections('6', ['6'])}
              </div>
            </ComplianceItem>

            {/* VII. System of Ranking */}
            <ComplianceItem 
              value="section-7"
              icon={<Scale className="text-purple-600" size={20} />}
              title="VII. System of Ranking Delivery Units and Individuals"
            >
              <div className="space-y-4 pt-2">
                <DocumentList>
                  {getItemsByCategory('7').map(item => (
                    <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                  ))}
                </DocumentList>
                {renderDynamicSubSections('7', ['7'])}
              </div>
            </ComplianceItem>

            {/* VIII. SALN */}
            <ComplianceItem 
              value="section-8"
              icon={<Lock className="text-slate-600" size={20} />}
              title="VIII. Agency Review and Compliance of SALN Disclosure"
            >
              <div className="space-y-4 pt-2">
                <DocumentList>
                  {getItemsByCategory('8').map(item => (
                    <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                  ))}
                </DocumentList>
                {renderDynamicSubSections('8', ['8'])}
              </div>
            </ComplianceItem>

            {/* IX. FOI */}
            <ComplianceItem 
              value="section-9"
              icon={<Info className="text-red-600" size={20} />}
              title="IX. Freedom of Information (FOI) Program Compliance"
            >
              <div className="space-y-4 pt-2">
                <DocumentList>
                  {getItemsByCategory('9').map(item => (
                    <DocumentItem key={item.id} title={item.title} href={item.url} isExternal={item.isExternal} />
                  ))}
                </DocumentList>
                {renderDynamicSubSections('9', ['9'])}
              </div>
            </ComplianceItem>

          </Accordion>
        </div>

        {/* Footer / Copyright */}
        <Separator className="mt-12 bg-slate-200" />
        <footer className="py-12 text-center space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Schools Division Office of Imus City</p>
          <p className="text-slate-500 text-xs font-bold leading-relaxed">
            Integrity ● Excellence ● Service
          </p>
          <p className="text-[9px] text-slate-300 font-medium">
            © {new Date().getFullYear()} SDO Imus City Official Website. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

function ComplianceItem({ 
  value, 
  icon, 
  title, 
  description, 
  children 
}: { 
  value: string; 
  icon: React.ReactNode; 
  title: string; 
  description?: string;
  children: React.ReactNode;
}) {
  // Extract number for ID (e.g., section-1)
  const id = value; 
  
  return (
    <AccordionItem id={id} value={value} className="bg-white border border-slate-200 rounded-[2rem] px-8 shadow-sm hover:shadow-md transition-shadow scroll-mt-24">
      <AccordionTrigger className="hover:no-underline py-8">
        <div className="flex items-start gap-6 text-left">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
            {icon}
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 leading-tight uppercase tracking-tight">{title}</h3>
            {description && <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{description}</p>}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-10">
        <div className="pl-1 space-y-4">
          {children}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
        <ChevronRight size={14} className="text-slate-300" />
        {title}
      </h4>
      <div className="pl-6">
        {children}
      </div>
    </div>
  );
}

function DocumentList({ children }: { children: React.ReactNode }) {
  return <ul className="grid grid-cols-1 gap-3">{children}</ul>;
}

function DocumentItem({ title, href, isExternal = false }: { title: string; href: string; isExternal?: boolean }) {
  return (
    <li>
      <a 
        href={href} 
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
        className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
      >
        <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
          <FileText size={16} />
        </div>
        <span className="text-sm font-bold text-slate-700 group-hover:text-white transition-colors">{title}</span>
        {isExternal && <ExternalLink size={12} className="ml-auto text-slate-300 group-hover:text-blue-200" />}
      </a>
    </li>
  );
}

function ReportCategory({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function YearLink({ year, href }: { year: number; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm flex items-center gap-2"
    >
      {year} <Download size={12} className="opacity-50" />
    </a>
  );
}
