"use client";

import React from "react";
import { AboutOverview } from "./components/AboutOverview";
import { VisionMission } from "./components/VisionMission";
import { QualityPolicy } from "./components/QualityPolicy";
import { InstitutionalMedia } from "./components/InstitutionalMedia";

export function AboutSection() {
  return (
    <div className="pt-4 pb-8 space-y-12">
      <AboutOverview />
      <VisionMission />
      <QualityPolicy />
      <InstitutionalMedia />
    </div>
  );
}
