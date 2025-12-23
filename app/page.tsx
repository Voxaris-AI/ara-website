"use client";

import {
  Sparkles,
  Phone,
  Calendar,
  MessageSquare,
  Clock,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Quote,
} from "lucide-react";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-24 sm:pt-20 px-4 sm:px-6 flex items-center justify-center overflow-hidden">
        {/* Background Orbs */}
        <div className="glow-orb w-[600px] h-[600px] -top-32 -left-32" />
        <div
          className="glow-orb w-[500px] h-[500px] top-1/3 -right-24"
          style={{ animationDelay: "2s" }}
        />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">
              AI-Powered Voice Agent for Healthcare
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 px-4">
            <span>
              Meet Ara, <br />
              Your 24/7 Receptionist
            </span>
          </h1>

          {/* Waveform Bars */}
          <div className="my-8 flex items-center justify-center gap-1 h-16">
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-2 1.4s ease-in-out infinite",
                animationDelay: "0.1s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-4 0.9s ease-in-out infinite",
                animationDelay: "0.3s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-1 1.6s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-5 1.1s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-3 1.3s ease-in-out infinite",
                animationDelay: "0.2s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-1 1s ease-in-out infinite",
                animationDelay: "0.4s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-4 1.5s ease-in-out infinite",
                animationDelay: "0.1s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-2 1.2s ease-in-out infinite",
                animationDelay: "0.6s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-5 0.95s ease-in-out infinite",
                animationDelay: "0.3s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-3 1.4s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-1 1.1s ease-in-out infinite",
                animationDelay: "0.45s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-4 1.3s ease-in-out infinite",
                animationDelay: "0.2s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-2 1.05s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            />
            <div
              className="w-1 bg-foreground/30 rounded-full"
              style={{
                animation: "soundwave-5 1.35s ease-in-out infinite",
                animationDelay: "0.15s",
              }}
            />
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-balance px-4">
            Ara handles patient calls, books appointments, and answers queries
            instantly - so your team can focus on care, not admin.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-12 px-4">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold h-12 sm:h-14 rounded-xl px-8 sm:px-10 text-base sm:text-lg shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              onClick={() => {
                window.open(
                  "https://calendly.com/team-voxaris/introduction-demo-with-kaushik-co-founder-ceo?month=2025-12&date=2025-12-12",
                  "_blank"
                );
              }}
            >
              <Phone className="w-5 h-5" />
              Book a Demo
            </button>
            <a href="#features" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-primary/30 bg-transparent text-foreground h-12 rounded-xl px-8 text-base hover:bg-primary/10 hover:border-primary/50 transition-all duration-200">
                Learn More
              </button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-300 px-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>HIPAA & GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Always-On</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>No Hold Times</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 px-4">
              Everything Your Front Desk Needs
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl mx-auto px-4">
              Ara handles the calls, so your staff handles the care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="group glass-card p-6 sm:p-8 hover:bg-neutral-800/90 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-700 transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                Smart Scheduling
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Ara books and reschedules appointments without human
                intervention.
              </p>
            </div>

            <div className="group glass-card p-6 sm:p-8 hover:bg-neutral-800/90 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-700 transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                Natural Conversations
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Human-like dialogue that patients trust. No robotic scripts.
              </p>
            </div>

            <div className="group glass-card p-6 sm:p-8 hover:bg-neutral-800/90 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-700 transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                24/7 Availability
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Never miss a call. Ara works nights, weekends, and holidays.
              </p>
            </div>

            <div className="group glass-card p-6 sm:p-8 hover:bg-neutral-800/90 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-700 transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                HIPAA & GDPR Compliant
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Enterprise-grade security. Your patients' data stays protected.
              </p>
            </div>

            <div className="group glass-card p-6 sm:p-8 hover:bg-neutral-800/90 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-700 transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                Instant Integration
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Connects with your favourite EHR and scheduling systems
                seamlessly.
              </p>
            </div>

            <div className="group glass-card p-6 sm:p-8 hover:bg-neutral-800/90 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-700 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3">
                Adaptive Voice Recognition
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Serve diverse patient populations with intelligent accent
                recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA SECTION */}
      <section
        id="contact"
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-8 sm:p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Ready to Transform Your
                <br />
                Patient Experience?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
                Join forward-thinking healthcare providers using Ara to reduce
                wait times and improve patient satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold h-12 sm:h-14 rounded-xl px-8 sm:px-10 text-base sm:text-lg shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                  onClick={() => {
                    window.open(
                      "https://calendly.com/team-voxaris/introduction-demo-with-kaushik-co-founder-ceo?month=2025-12&date=2025-12-12",
                      "_blank"
                    );
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Book a Demo
                </button>
                <a href="mailto:team@voxaris.ai" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-primary/30 bg-transparent text-foreground h-12 sm:h-14 rounded-xl px-8 sm:px-10 text-base sm:text-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-200">
                    Contact Us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a
              href="https://www.voxaris.ai"
              className="relative h-16 sm:h-20 hover:opacity-80 transition-opacity"
            >
              <img
                src="/assets/voxaris-logo.png"
                alt="Voxaris Logo"
                className="w-full h-full object-contain"
              />
            </a>
            <span className="text-xs sm:text-sm text-center md:text-left md:pl-4 text-neutral-400">
              © 2025 Voxaris. All rights reserved.
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#"
              className="text-sm text-neutral-300 hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-neutral-300 hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:team@voxaris.ai"
              className="text-sm text-neutral-300 hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
