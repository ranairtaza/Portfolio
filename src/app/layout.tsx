import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '../context/PortfolioContext';
import UniverseBackground from '../components/background/UniverseBackground';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CommandPalette from '../components/ui/CommandPalette';
import ScrollRobotDemi from '../components/ui/ScrollRobotDemi';
import { PERSONAL_INFO } from '../data/portfolio';
import { getSiteUrl } from '../lib/siteConfig';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'Rana Irtaza Ali Khan — Full-Stack Engineer & AI Solutions Architect | RANA.OS',
  description:
    'Engineering portfolio of Rana Irtaza Ali Khan, specializing in full-stack web applications, multi-tenant SaaS architectures, biometric attendance engines, and pragmatic AI integrations.',
  keywords: [
    'Rana Irtaza Ali Khan',
    'Rana Irtaza',
    'Full-Stack Developer',
    'Software Engineer',
    'Next.js',
    'TypeScript',
    'PostgreSQL',
    'Supabase',
    'AI Integrations',
    'LeadMachine',
    'KeyAbroad',
    'Biometric Attendance',
    'SaaS Architecture',
  ],
  authors: [{ name: 'Rana Irtaza Ali Khan', url: 'https://github.com/ranairtaza' }],
  creator: 'Rana Irtaza Ali Khan',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Rana Irtaza Ali Khan — Full-Stack Engineer & AI Solutions Architect | RANA.OS',
    description:
      'Engineering portfolio of Rana Irtaza Ali Khan. Building resilient web systems, multi-tenant SaaS architectures, and automated business workflows.',
    siteName: 'RANA.OS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rana Irtaza Ali Khan — Full-Stack Engineer | RANA.OS',
    description:
      'Explore full-stack web applications, multi-tenant SaaS, and hardware attendance engines engineered by Rana Irtaza Ali Khan.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.role,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Information Technology Program',
    },
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Supabase',
      'Prisma',
      'AI Integrations',
      'Multi-Tenant SaaS',
      'Biometric Systems',
    ],
    url: siteUrl,
    sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Immediate anti-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('rana_os_theme');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300">
        <PortfolioProvider>
          {/* Persistent Interactive 3D Universe Background with WebGL detection and Canvas Fallback */}
          <UniverseBackground />

          {/* Sticky Navigation */}
          <Navbar />

          {/* Animated Demi Robot Scroll Companion */}
          <ScrollRobotDemi />

          {/* Keyboard Command Palette */}
          <CommandPalette />

          {/* Main Page Content */}
          <main className="flex-1 w-full relative z-10">
            {children}
          </main>

          {/* System Footer */}
          <Footer />
        </PortfolioProvider>
      </body>
    </html>
  );
}
