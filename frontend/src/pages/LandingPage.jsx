import React, { useState, useEffect, useRef } from 'react';

import { GridScan } from './GridScan';
import FuzzyText from "./FuzzyText";
import PillNav from './PillNav';
import { gsap } from 'gsap';
import ThreeFlipSection from './ThreeFlipSection'; // Sesuaikan path
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Logo SVG sebagai data URL
const logoDataURL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEuOCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPjxlbGxpcHNlIGN4PSIxMiIgY3k9IjEyIiByeD0iMTAiIHJ5PSI0LjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDEyIDEyKSIvPjxlbGxpcHNlIGN4PSIxIiBjeT0iMTIiIHJ4PSIxMCIgcnk9IjQuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDEyIDEyKSIvPjxlbGxpcHNlIGN4PSIxMiIgY3k9IjEyIiByeD0iMTAiIHJ5PSI0LjUiLz48L3N2Zz4=";

const LandingPage = () => {
  const [hoverIntensity] = useState(0.5);
  const [enableHover] = useState(true);
  const [activeTech, setActiveTech] = useState(0);
  
  // Refs untuk animasi GSAP
  const section1Ref = useRef(null);
  const techContainerRef = useRef(null);
  const techPanelsRef = useRef([]);
  const techLogosRef = useRef([]);
  const techContentRef = useRef([]);
  const progressBarRef = useRef(null);
  
// Ringkasan fitur utama NF Student HUB (berdasarkan PDF)
const techStack = [
  {
    id: 1,
    name: 'Sistem Akademik Terintegrasi',
    description:
      'NF Student HUB adalah aplikasi akademik berbasis web dengan konsep sosial media. Seluruh pengguna wajib login dan diarahkan ke dashboard sesuai perannya.',
    logo: '🎓',
    color: 'from-cyan-500 to-blue-600',
    features: [
      'Login Terpusat',
      'Dashboard Berdasarkan Role',
      'Feed Informasi Kampus'
    ],
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)'
  },
  {
    id: 2,
    name: 'Multi Role & Hak Akses',
    description:
      'Sistem mendukung berbagai role seperti Mahasiswa, Dosen, Admin/BAK, Orang Tua, dan UKM/Ormawa dengan hak akses yang dikontrol penuh oleh backend.',
    logo: '🧠',
    color: 'from-emerald-500 to-teal-600',
    features: [
      'Mahasiswa & Dosen',
      'Admin / BAK',
      'Orang Tua & UKM'
    ],
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)'
  },
  {
    id: 3,
    name: 'Fitur Akademik Lengkap',
    description:
      'Mahasiswa dapat mengakses mata kuliah, tugas, absensi QR, pembayaran UKT, transkrip nilai, serta fitur chat antar pengguna.',
    logo: '📚',
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Absensi QR Code',
      'Pembayaran UKT',
      'Tugas & Nilai'
    ],
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
  },
  {
    id: 4,
    name: 'Backend & Keamanan Sistem',
    description:
      'Backend Golang menggunakan JWT dan role-based middleware untuk memastikan setiap endpoint hanya dapat diakses oleh role yang berwenang.',
    logo: '🔐',
    color: 'from-purple-500 to-fuchsia-600',
    features: [
      'JWT Authentication',
      'Role Validation',
      'RESTful API'
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)'
  },
  {
    id: 5,
    name: 'Konsep Sosial Media Kampus',
    description:
      'Feed kampus memungkinkan posting dari BAK dan UKM/Ormawa yang bisa di-like, dikomentari, dan difilter seperti Instagram.',
    logo: '📣',
    color: 'from-pink-500 to-rose-600',
    features: [
      'Posting & Feed',
      'Like & Komentar',
      'Filter UKM'
    ],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
  }
];

  // Setup GSAP Scroll-driven Animations
  useEffect(() => {
    // Cleanup previous triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    if (!section1Ref.current || !techContainerRef.current) return;

    const panels = techPanelsRef.current.filter(Boolean);
    const logos = techLogosRef.current.filter(Boolean);
    const contents = techContentRef.current.filter(Boolean);
    
    // Reset semua panel, logo, dan konten: sembunyikan semua kecuali yang pertama
    // sensible initial values
    gsap.set(panels, {
      opacity: 10,
      scale: 0.95,
      y: 50,
      visibility: 'hidden'
    });
    gsap.set(logos, {
      opacity: 0,
      x: 30,
      rotation: 20,
      scale: 0.8,
      visibility: 'hidden'
    });
    gsap.set(contents, {
      opacity: 0,
      x: 100,
      y: 30,
      visibility: 'hidden'
    });

    // Hanya aktifkan panel pertama
    if (panels[0]) {
      gsap.set(panels[0], {
        opacity: 1,
        scale: 1,
        y: 0,
        visibility: 'visible',
        zIndex: 50
      });
    }
    if (logos[0]) gsap.set(logos[0], { opacity: 1, x: 0, rotation: 0, scale: 1, visibility: 'visible', zIndex: 60 });
    if (contents[0]) gsap.set(contents[0], { opacity: 1, x: 0, y: 0, visibility: 'visible', zIndex: 60 });

    // Buat ScrollTrigger untuk pin container
    // Build a timeline where each panel occupies exactly 1 unit of timeline time
    // total timeline duration will be techStack.length (1 per panel)
    const scrollTween = gsap.timeline({
      scrollTrigger: {
        trigger: section1Ref.current,
        start: "top top",
        end: `+=${techStack.length * 100}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: 1 / techStack.length,
          duration: { min: 0.2, max: 0.6 },
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.floor(progress * techStack.length);
          setActiveTech(Math.min(index, techStack.length - 1));

          // Update progress bar
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
              duration: 0.1,
              ease: "none"
            });
          }
        }
      }
    });

    scrollTween.to({}, { duration: techStack.length, ease: 'none' });

    // Animasi untuk setiap panel
    techStack.forEach((tech, index) => {
      const panel = panels[index];
      const logo = logos[index];
      const content = contents[index];

      if (!panel) return;

      const startTime = index; // integer start
      const endTime = index + 1; // integer end

      const beforeBuffer = 0.08;
      const afterBuffer = 0.08;

      // Ensure panel hidden by default, then become visible at startTime + beforeBuffer
      scrollTween.set(panel, { visibility: 'hidden', zIndex: 50 - index }, 0);
      scrollTween.set(panel, { visibility: 'visible', zIndex: 200 - index }, Math.max(0, startTime + beforeBuffer));

      // Entry animation (placed early in its 1-unit slot)
      scrollTween.to(panel, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out"
      }, startTime + beforeBuffer);

      if (index < techStack.length - 1) {
        scrollTween.to(panel, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          duration: 0.45,
          ease: "power2.in"
        }, endTime - beforeBuffer);
        scrollTween.set(panel, { visibility: 'hidden' }, endTime + afterBuffer);
      }

      // Animasi untuk logo (kiri)
      if (logo) {
        // Logo appears early in the panel slot and exits near slot end
        scrollTween.set(logo, { visibility: 'hidden', zIndex: 220 - index }, 0);
        scrollTween.set(logo, { visibility: 'visible' }, Math.max(0, startTime + beforeBuffer - 0.02));
        scrollTween.fromTo(logo,
          {
            opacity: 2,
            x: -100,
            rotation: -30,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.7)"
          },
          startTime + beforeBuffer + 0.02
        );

        // Exit logo near end of slot
        if (index < techStack.length - 1) {
          scrollTween.to(logo, {
            opacity: 0,
            x: -100,
            rotation: -15,
            scale: 0.8,
            duration: 0.45,
            ease: "power2.in"
          }, endTime - beforeBuffer + 0.02);
          scrollTween.set(logo, { visibility: 'hidden' }, endTime + afterBuffer);
        }
      }

      // Animasi untuk konten (kanan)
      if (content) {
        // Content appears after logo, and exits before slot end
        scrollTween.set(content, { visibility: 'hidden', zIndex: 210 - index }, 0);
        scrollTween.set(content, { visibility: 'visible' }, Math.max(0, startTime + beforeBuffer + 0.02));
        scrollTween.fromTo(content,
          {
            opacity: 0,
            x: 100,
            y: 30
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.55,
            ease: "power2.out"
          },
          startTime + beforeBuffer + 0.04
        );

        // Stagger animation untuk child elements dalam konten
        const title = content.querySelector('.tech-title');
        const description = content.querySelector('.tech-description');
        const features = content.querySelectorAll('.tech-feature');

        if (title) {
          scrollTween.fromTo(title,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45 },
            startTime + 0.25
          );
        }

        if (description) {
          scrollTween.fromTo(description,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45 },
            startTime + 0.35
          );
        }

        if (features.length > 0) {
          features.forEach((feature, featureIndex) => {
            scrollTween.fromTo(feature,
              { x: -20, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.28 },
              startTime + 0.45 + (featureIndex * 0.08)
            );
          });
        }

        // Animasi keluar konten
        if (index < techStack.length - 1) {
          scrollTween.to(content, {
            opacity: 0,
            x: 100,
            y: -30,
            duration: 0.45,
            ease: "power2.in"
          }, endTime - beforeBuffer + 0.02);
          // hide after slot
          scrollTween.set(content, { visibility: 'hidden' }, endTime + afterBuffer);
        }
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Navigasi manual ke teknologi tertentu
  const scrollToTech = (index) => {
    const panel = techPanelsRef.current[index];
    if (panel && section1Ref.current) {
      const scrollHeight = window.innerHeight;
      const scrollAmount = index * scrollHeight;
      
      window.scrollTo({
        top: section1Ref.current.offsetTop + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col items-center space-y-4">
          {techStack.map((tech, index) => (
            <button
              key={tech.id}
              onClick={() => scrollToTech(index)}
              className="relative group"
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTech === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`} />
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs text-white/70 whitespace-nowrap">{tech.name.split(' ')[0]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <header className="relative flex items-center justify-center h-screen overflow-hidden">
        {/* ================= PILL NAV BAR ================= */}
        <PillNav
          logo={logoDataURL}
          logoAlt="NF StudentHub Logo"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Visi Misi', href: '/visi-misi' },
            { label: 'Kurikulum', href: '/kurikulum' },
            { label: 'Login', href: '/login' }
          ]}
          activeHref="/kalender-akademik"
          className="custom-nav"
          ease="power6.easeOut"
          baseColor="#fff"
          pillColor="#060010"
          hoveredPillTextColor="#060010"
          pillTextColor="#ffffff"
        />

       {/* ================= GRIDSCAN BACKGROUND (FULL BLACK) ================= */}
          <div className="absolute inset-0 z-0 bg-black">
            <GridScan
              sensitivity={0.45}
              lineThickness={1}
              linesColor="#050505"     
              gridScale={0.12}
              scanColor="#ffff"      
              scanOpacity={0.25}
              enablePost
              bloomIntensity={0.25}      
              chromaticAberration={0.0005}
              noiseIntensity={0.015}
              scanGlow={0.2}            
              scanSoftness={3}
              scanPhaseTaper={0.95}
              scanDuration={2.8}
              scanDelay={2.5}
              className="w-full h-full"
            />
          </div>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative z-10 text-center w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <div className="rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-none mt-16 md:mt-24">
            <div className="mb-6 md:mb-8 flex justify-center px-2">
              <FuzzyText 
                baseIntensity={0.5} 
                hoverIntensity={hoverIntensity} 
                enableHover={enableHover}
                fontSize="clamp(2.5rem, 8vw, 5rem)"
                fontWeight={900}
                fontFamily="Poppins, sans-serif"
                color="#ffffff"
                className="break-words leading-tight"
              >
                NF StudentHub
              </FuzzyText>
            </div>

            <div className="mb-8 md:mb-12 px-2">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-100 font-light leading-relaxed">
            Comes with a modern look (By Candalena)
              </p>
            </div>

            {/* Animated scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-scroll" />
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* ================= SECTION 1: TECH STACK SHOWCASE ================= */}
      <section 
        ref={section1Ref}
        className="relative min-h-screen overflow-hidden bg-black"
      >
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800/50">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 w-0"
          />
        </div>

        {/* Tech Counter */}
        <div className="fixed top-8 left-8 z-50 hidden md:block">
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-400">Technology</div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">{activeTech + 1}</span>
              <span className="text-gray-400">/</span>
              <span className="text-lg text-gray-400">{techStack.length}</span>
            </div>
          </div>
        </div>

        {/* Tech Navigation Dots */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
          {techStack.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToTech(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeTech === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Tech Stack Container - Pinned by GSAP */}
        <div 
          ref={techContainerRef}
          className="relative w-full min-h-screen"
        >
          {/* Tech Panels */}
          {techStack.map((tech, index) => (
            <div
              key={tech.id}
              ref={el => techPanelsRef.current[index] = el}
              className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-16"
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Left Side: Logo */}
                  <div className="flex justify-center lg:justify-end">
                    <div 
                      ref={el => techLogosRef.current[index] = el}
                      className="relative group"
                    >
                      <div 
                        className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden transform transition-all duration-700"
                        style={{ background: tech.gradient }}
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Logo */}
                        <div className="relative z-10 text-7xl md:text-8xl lg:text-9xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                          {tech.logo}
                        </div>
                        
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500" />
                      </div>
                      
                      {/* Floating badge */}
                      <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-gray-700">
                        <span className="text-sm font-bold text-gray-300">#{tech.id}</span>
                      </div>
                      
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Right Side: Content */}
                  <div 
                    ref={el => techContentRef.current[index] = el}
                    className="lg:pl-8"
                  >
                    {/* Tech badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/80 to-transparent border border-gray-800 mb-6">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                      <span className="text-sm text-gray-300 tracking-wider uppercase">TECH STACK {tech.id}</span>
                    </div>
                    
                    {/* Tech Title */}
                    <h2 className="tech-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                        {tech.name}
                      </span>
                    </h2>
                    
                    {/* Tech Description */}
                    <p className="tech-description text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                      {tech.description}
                    </p>
                    
                    {/* Tech Features */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-400 mb-4">Key Features</h3>
                      <div className="space-y-3">
                        {tech.features.map((feature, idx) => (
                          <div key={idx} className="tech-feature flex items-center text-gray-300 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-lg">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tech Status */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/80 to-transparent border border-gray-800">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                        <span className="text-sm text-gray-300">Production Ready</span>
                      </div>
                      <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/80 to-transparent border border-gray-800">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                        <span className="text-sm text-gray-300">Enterprise Grade</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </section>
      {/* ================= SECTION 3: THREE.JS FLIP ANIMATION ================= */}
<ThreeFlipSection />


    

      {/* Global Styles untuk Animasi */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(8px);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-scroll {
          animation: scroll 1.5s infinite ease-in-out;
        }

        .animate-float {
          animation: float 20s infinite ease-in-out;
        }

        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Performance optimizations */
        .transform {
          will-change: transform, opacity;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #111;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        /* GSAP ScrollTrigger Animations */
        .tech-panel {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        /* Loading animation */
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;