import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsConstellation from '../components/sections/SkillsConstellation';
import TimelineSection from '../components/sections/TimelineSection';
import InterestsSection from '../components/sections/InterestsSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 01. Hero & Professional Positioning */}
      <HeroSection />

      {/* 02. About & System Inspector */}
      <AboutSection />

      {/* 03. Featured Projects (LeadMachine, KeyAbroad 2.0, Biometric Attendance) */}
      <ProjectsSection />

      {/* 04. Skills Constellation & Dynamic Project Links */}
      <SkillsConstellation />

      {/* 05. Experience & Education Timeline */}
      <TimelineSection />

      {/* 06. Interests, Ongoing Learning & Tech Radar */}
      <InterestsSection />

      {/* 07. Contact Gateway & Interactive Terminal */}
      <ContactSection />
    </div>
  );
}
