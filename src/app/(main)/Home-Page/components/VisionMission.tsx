import React from "react";
import { Eye, Target, History } from "lucide-react";

export function VisionMission() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Vision */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-[#191970]">
            <Eye size={32} />
            <h3 className="text-2xl font-black uppercase tracking-tight">Vision</h3>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
            <p>
              We dream of Filipinos who passionately love their country and whose values and 
              competencies enable them to realize their full potential and contribute meaningfully 
              to building the nation.
            </p>
            <p>
              As a learner-centered public institution, the Department of Education continuously 
              improves itself to better serve its stakeholders.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-[#191970]">
            <Target size={32} />
            <h3 className="text-2xl font-black uppercase tracking-tight">Mission</h3>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
            <p>To promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:</p>
            <ul className="space-y-3 list-disc pl-5 text-sm">
              <li>Students learn in a child-friendly, gender-sensitive, safe, and motivating environment</li>
              <li>Teachers facilitate learning and constantly nurture every learner</li>
              <li>Administrators and staff ensure an enabling and supportive environment for effective learning to happen</li>
              <li>Family, community, and other stakeholders are actively engaged and share responsibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mandate */}
      <div className="space-y-6 bg-slate-50 p-10 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-4 text-[#191970]">
          <History size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tight">Mandate</h3>
        </div>
        <p className="text-slate-600 leading-relaxed font-medium text-sm">
          The Department of Education was established through the Education Decree of 1863 as the 
          Superior Commission of Primary Instruction under a Chairman. The agency underwent 
          reorganization efforts in order to better define its purpose vis-a-vis the changing 
          administrations. The present day Department of Education was eventually mandated 
          through Republic Act 9155.
        </p>
      </div>
    </div>
  );
}
