import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsConstellation from '../components/sections/SkillsConstellation';
import CertificationsSection from '../components/sections/CertificationsSection';
import TimelineSection from '../components/sections/TimelineSection';
import InterestsSection from '../components/sections/InterestsSection';
import ServicesSection from '../components/sections/ServicesSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 00. Hero & Professional Positioning */}
      <HeroSection />

      {/* 01. About & System Inspector */}
      <AboutSection />

      {/* 02. Featured Projects (LeadMachine, KeyAbroad 2.0, Biometric Attendance) */}
      <ProjectsSection />

      {/* 03. Skills Constellation & Dynamic Project Links */}
      <SkillsConstellation />

      {/* 04. Certifications & Technical Proof (Google, Cisco, Outskill, Talkpool) */}
      <CertificationsSection />

      {/* 05. Experience & Education Timeline */}
      <TimelineSection />

      {/* 06. Interests, Ongoing Learning & Tech Radar */}
      <InterestsSection />

      {/* 06. Engineering Services & Client Conversion */}
      <ServicesSection />

      {/* 07. Contact Gateway & Communication Routing */}
      <ContactSection />
    </div>
  );
}
