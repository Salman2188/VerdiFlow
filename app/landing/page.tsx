"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

const features = [
  {
    title: "Save 10+ hours every week",
    description:
      "Automate repetitive tasks, follow-ups, and scheduling so you can focus on closing.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "AI-powered lead management",
    description:
      "Prioritize hot leads, enrich contact data, and get smart next-step recommendations.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Close more deals",
    description:
      "Track every conversation, never miss a follow-up, and move deals through your pipeline faster.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

const steps = [
  {
    step: "01",
    title: "Connect your pipeline",
    description:
      "Import leads from your CRM, email, and phone in minutes. VerdiFlow syncs everything automatically.",
  },
  {
    step: "02",
    title: "Let AI do the heavy lifting",
    description:
      "Smart follow-ups, lead scoring, and task suggestions run in the background while you sell.",
  },
  {
    step: "03",
    title: "Close with confidence",
    description:
      "See every deal at a glance, act on insights instantly, and convert more leads into closings.",
  },
];

const testimonials = [
  {
    quote:
      "VerdiFlow cut my admin time in half. I finally have evenings back with my family.",
    name: "Sarah Mitchell",
    role: "Luxury Agent",
    company: "Compass",
    avatar: "from-rose-300/90 via-rose-200/50 to-amber-100/30",
    deals: "47 closings",
  },
  {
    quote:
      "The AI follow-ups feel personal and timely. My response rate jumped 40% in the first month.",
    name: "James Chen",
    role: "Team Lead",
    company: "Keller Williams",
    avatar: "from-sky-300/90 via-blue-200/50 to-indigo-100/30",
    deals: "$12M volume",
  },
  {
    quote:
      "It's like having a full-time assistant who never sleeps. Our team closed 3 extra deals last quarter.",
    name: "Maria Rodriguez",
    role: "Broker-Owner",
    company: "Rodriguez Realty",
    avatar: "from-emerald-300/90 via-teal-200/50 to-cyan-100/30",
    deals: "18-agent team",
  },
];

const navLinks = ["Features", "How it Works", "Testimonials"];
const chartHeights = [35, 55, 42, 72, 48, 88, 65, 95, 70, 82, 60, 90];
const activityFeed = [
  "AI drafted follow-up for Walsh",
  "Showing confirmed — Torres 3pm",
  "New lead from Zillow import",
  "Offer accepted — Park family",
  "Counter received — Maple Dr",
  "AI scheduled reminder — Chen",
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`will-change-[transform,opacity] transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-12 scale-[0.97] opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function TiltCard({
  children,
  className = "",
  lift = false,
}: {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    setTilt({ x, y });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className={`will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${lift && hovered ? -4 : 0}px)`,
        transition:
          tilt.x === 0 && tilt.y === 0
            ? "transform 700ms cubic-bezier(0.16,1,0.3,1)"
            : "transform 100ms ease-out",
      }}
    >
      {children}
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.32),0_2px_8px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/[0.06] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
  className = "",
  id,
  breathe = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  id?: string;
  breathe?: boolean;
}) {
  return (
    <a
      id={id}
      href={href}
      className={`group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-600 px-10 text-[15px] font-semibold tracking-[-0.015em] text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.08),0_0_0_1px_rgba(52,211,153,0.35),0_4px_16px_rgba(16,185,129,0.28),0_0_40px_rgba(16,185,129,0.1)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:from-emerald-100 hover:via-emerald-300 hover:to-emerald-500 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_0_1px_rgba(52,211,153,0.45),0_8px_32px_rgba(16,185,129,0.38),0_0_56px_rgba(16,185,129,0.16)] active:translate-y-0 active:scale-[0.98] ${breathe ? "animate-breathe" : ""} ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </a>
  );
}

function OutlineButton({
  href,
  children,
  className = "",
  id,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <a
      id={id}
      href={href}
      className={`group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] px-10 text-[15px] font-semibold tracking-[-0.015em] text-white/85 shadow-[0_2px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.09)] active:translate-y-0 active:scale-[0.98] ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative">{children}</span>
    </a>
  );
}

function TypingIndicator() {
  return (
    <span className="inline-flex items-center gap-[3px] pl-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-[3px] w-[3px] rounded-full bg-emerald-400/70 animate-typing-dot"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </span>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  active,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  active: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [dashboardActive, setDashboardActive] = useState(false);
  const [feedIndex, setFeedIndex] = useState(0);
  const [notifVisible, setNotifVisible] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const t1 = requestAnimationFrame(() => setNavReady(true));
    const t2 = setTimeout(() => setHeroReady(true), 80);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setMouse(mouseRef.current);
          rafRef.current = null;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = dashboardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDashboardActive(true);
          setTimeout(() => setNotifVisible(true), 800);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dashboardActive) return;
    const interval = setInterval(() => {
      setFeedIndex((i) => (i + 1) % activityFeed.length);
    }, 4800);
    return () => clearInterval(interval);
  }, [dashboardActive]);

  const px = (n: number) => mouse.x * n;
  const py = (n: number) => mouse.y * n;

  return (
    <div className="relative min-h-full flex-1 overflow-x-hidden bg-[#070b0a] font-sans text-zinc-50">
      <style>{`
        @keyframes heroGlow {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.65; transform: translate(-50%, -50%) scale(1.04); }
        }
        @keyframes float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -8px, 0); }
        }
        @keyframes drift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          33% { transform: translate3d(10px, -8px, 0); }
          66% { transform: translate3d(-8px, 6px, 0); }
        }
        @keyframes meshShift {
          0%, 100% { opacity: 0.5; transform: translate(0, 0) scale(1); }
          50% { opacity: 0.7; transform: translate(2%, -1%) scale(1.02); }
        }
        @keyframes breathe {
          0%, 100% { box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(52,211,153,0.35), 0 4px 16px rgba(16,185,129,0.28), 0 0 40px rgba(16,185,129,0.1); }
          50% { box-shadow: inset 0 1px 0 rgba(255,255,255,0.45), 0 0 0 1px rgba(52,211,153,0.42), 0 6px 24px rgba(16,185,129,0.34), 0 0 48px rgba(16,185,129,0.14); }
        }
        @keyframes growBar {
          from { transform: scaleY(0); opacity: 0.4; }
          to { transform: scaleY(1); opacity: 1; }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30% { opacity: 0.9; transform: translateY(-1px); }
        }
        @keyframes feedSlide {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes notifSlide {
          from { opacity: 0; transform: translateX(8px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes pulseSoft {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes beamDrift {
          0%, 100% { opacity: 0.03; transform: rotate(-12deg) translateX(-4%); }
          50% { opacity: 0.06; transform: rotate(-12deg) translateX(4%); }
        }
        .hero-glow { animation: heroGlow 10s ease-in-out infinite; }
        .float-dashboard { animation: float 11s ease-in-out infinite; will-change: transform; }
        .drift-light { animation: drift 22s ease-in-out infinite; will-change: transform; }
        .animate-mesh { animation: meshShift 16s ease-in-out infinite; }
        .animate-breathe { animation: breathe 5s ease-in-out infinite; }
        .animate-typing-dot { animation: typingDot 1.8s ease-in-out infinite; }
        .animate-feed-item { animation: feedSlide 800ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-grow-bar { animation: growBar 1.6s cubic-bezier(0.16,1,0.3,1) forwards; transform-origin: bottom; }
        .animate-beam { animation: beamDrift 16s ease-in-out infinite; }
        .animate-notif { animation: notifSlide 900ms cubic-bezier(0.16,1,0.3,1) forwards; }
        .animate-pulse-soft { animation: pulseSoft 3s ease-in-out infinite; }
      `}</style>

      {/* Cinematic background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(${px(8)}px, ${py(6)}px, 0)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1512] via-[#080d0b] to-[#060908]" />
          <div className="animate-mesh absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-25%,rgba(16,185,129,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_15%,rgba(20,184,166,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_8%_55%,rgba(16,185,129,0.06),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(6,78,59,0.12),transparent_60%)]" />
        </div>

        <div
          className="drift-light absolute top-[18%] left-[12%] h-72 w-72 rounded-full bg-emerald-500/[0.12] blur-[110px] will-change-transform"
          style={{ transform: `translate3d(${px(20)}px, ${py(15)}px, 0)` }}
        />
        <div
          className="drift-light absolute top-[42%] right-[8%] h-96 w-96 rounded-full bg-teal-400/[0.07] blur-[130px] will-change-transform"
          style={{ transform: `translate3d(${px(-16)}px, ${py(12)}px, 0)`, animationDelay: "-6s" }}
        />
        <div
          className="absolute -top-48 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.1] blur-[150px] will-change-transform"
          style={{ transform: `translate3d(calc(-50% + ${px(12)}px), ${py(8)}px, 0)` }}
        />

        <div className="animate-beam absolute top-0 left-[20%] h-[140%] w-[1px] bg-gradient-to-b from-emerald-400/20 via-emerald-400/5 to-transparent" />
        <div className="animate-beam absolute top-0 right-[30%] h-[120%] w-[1px] bg-gradient-to-b from-teal-300/15 via-transparent to-transparent" style={{ animationDelay: "-4s" }} />

        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 10%, black 20%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      {/* Sticky Nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          navReady ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        } ${
          scrolled
            ? "border-b border-white/[0.05] bg-[#070b0a]/75 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-[24px] backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">
            Verdi<span className="text-emerald-400">Flow</span>
          </span>
          <div className="hidden items-center gap-12 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="relative text-[13px] font-medium tracking-[-0.01em] text-zinc-500 transition-colors duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-zinc-200 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-emerald-400/70 after:to-emerald-400/0 after:transition-all after:duration-[500ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:w-full"
              >
                {link}
              </a>
            ))}
          </div>
          <a
            href="#cta"
            className="rounded-[0.75rem] bg-gradient-to-b from-emerald-300 to-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_20px_rgba(16,185,129,0.3)] transition-all duration-[400ms] hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(16,185,129,0.4)]"
          >
            Start Free
          </a>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pt-40 pb-32 sm:px-10 sm:pt-48 sm:pb-40 lg:px-16 lg:pt-56 lg:pb-48">
          <div
            className={`mx-auto max-w-5xl text-center transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heroReady ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="hero-glow pointer-events-none absolute top-1/2 left-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.18] blur-[90px] sm:h-96 sm:w-[44rem]"
              />
              <div className="relative">
                <div className="mb-12 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-5 py-2.5 text-[13px] font-medium tracking-[0.02em] text-emerald-300/80 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                  </span>
                  Now in early access
                </div>

                <h1 className="text-[2.875rem] font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] xl:text-[5.5rem]">
                  The AI Operating System for{" "}
                  <span className="bg-gradient-to-r from-emerald-50 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                    Real Estate Agents
                  </span>
                </h1>
              </div>
            </div>

            <p className="mx-auto mt-12 max-w-2xl text-lg leading-[1.75] tracking-[-0.015em] text-zinc-400 sm:text-xl sm:leading-[1.8]">
              Automate follow-ups, organize every lead, and close more deals with AI.
            </p>

            <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <PrimaryButton href="#cta" breathe className="w-full sm:w-auto">
                Start Free
              </PrimaryButton>
              <OutlineButton href="#book-demo" className="w-full sm:w-auto">
                Book Demo
              </OutlineButton>
            </div>
          </div>

          {/* Feature cards */}
          <div
            id="features"
            className="mx-auto mt-40 grid max-w-6xl gap-8 sm:grid-cols-2 lg:mt-48 lg:grid-cols-3"
          >
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 120}>
                <TiltCard lift>
                  <GlassCard className="group h-full transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.09] hover:bg-white/[0.04] hover:shadow-[0_16px_48px_rgba(16,185,129,0.05),0_8px_24px_rgba(0,0,0,0.32)]">
                    <div className="mb-6 inline-flex rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-4 text-emerald-400/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[2deg] group-hover:scale-105 group-hover:border-emerald-500/20 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.1)]">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold tracking-[-0.025em] text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.75] tracking-[-0.01em] text-zinc-500">
                      {feature.description}
                    </p>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Dashboard mockup — centerpiece */}
        <section className="mx-auto max-w-[90rem] px-6 pb-40 sm:px-10 lg:px-16 lg:pb-56">
          <Reveal>
            <div className="mb-24 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-400/60">
                Platform Preview
              </p>
              <h2 className="mt-6 text-[2rem] font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Your command center for every deal
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-[1.75] tracking-[-0.01em] text-zinc-500">
                A unified workspace built for high-performing agents and teams.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div ref={dashboardRef} className="relative mx-auto max-w-6xl">
              <div
                aria-hidden="true"
                className="hero-glow absolute -inset-8 rounded-[2.5rem] bg-gradient-to-b from-emerald-500/30 via-emerald-500/8 to-transparent blur-[60px] sm:-inset-12"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-emerald-500/10 blur-3xl sm:-inset-8"
              />
              <div className="float-dashboard relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b100e]/94 shadow-[0_32px_80px_rgba(0,0,0,0.55),0_8px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.03)_inset,inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl lg:rounded-3xl">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />

                {/* Window chrome */}
                <div className="flex items-center gap-3 border-b border-white/[0.05] bg-white/[0.025] px-5 py-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-zinc-700/70" />
                    <div className="h-3 w-3 rounded-full bg-zinc-700/70" />
                    <div className="h-3 w-3 rounded-full bg-zinc-700/70" />
                  </div>
                  <div className="mx-auto hidden flex-1 max-w-sm items-center justify-center gap-2 rounded-lg border border-white/[0.05] bg-black/25 px-4 py-1.5 sm:flex">
                    <svg className="h-3 w-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-[11px] tracking-wide text-zinc-500">app.verdiflow.ai/dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] transition-colors duration-300 hover:bg-white/[0.06]">
                      <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                      </svg>
                      <span className={`absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-zinc-950 shadow-[0_0_8px_rgba(16,185,129,0.5)] ${notifVisible ? "animate-notif" : "opacity-0"}`}>3</span>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[540px] flex-col lg:flex-row">
                  {/* Sidebar */}
                  <div className="hidden w-56 shrink-0 flex-col border-r border-white/[0.05] bg-black/25 p-5 lg:flex">
                    <div className="mb-10 px-2 text-sm font-semibold tracking-[-0.01em] text-white">
                      Verdi<span className="text-emerald-400">Flow</span>
                    </div>
                    <div className="space-y-0.5">
                      {[
                        { label: "Dashboard", active: true },
                        { label: "Leads", active: false },
                        { label: "Pipeline", active: false },
                        { label: "Calendar", active: false },
                        { label: "Analytics", active: false },
                        { label: "AI Assistant", active: false },
                        { label: "Settings", active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-colors duration-300 ${
                            item.active
                              ? "bg-emerald-500/10 font-medium text-emerald-300/90"
                              : "text-zinc-500 hover:text-zinc-400"
                          }`}
                        >
                          <div className={`h-1.5 w-1.5 rounded-full ${item.active ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-zinc-700"}`} />
                          {item.label}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto rounded-xl border border-white/[0.05] bg-white/[0.025] p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400/50 to-teal-600/40 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
                          <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b100e] bg-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white">Alex Rivera</p>
                          <p className="text-[10px] text-zinc-500">Pro Plan · Online</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-5 sm:px-7">
                      <div>
                        <h3 className="text-base font-semibold tracking-[-0.01em] text-white">Good morning, Alex</h3>
                        <p className="mt-0.5 text-[12px] text-zinc-500">12 leads need follow-up · 4 showings today</p>
                      </div>
                      <div className="hidden items-center gap-2.5 sm:flex">
                        <div className="rounded-lg border border-white/[0.05] bg-white/[0.025] px-3.5 py-2 text-[11px] text-zinc-500">
                          Search leads...
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.08] px-3.5 py-2 text-[11px] font-medium text-emerald-300/90">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                          AI Ready
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6 lg:flex-row">
                      <div className="flex flex-1 flex-col gap-5">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                          {[
                            { label: "Active Leads", target: 148, suffix: "", delta: "+12%" },
                            { label: "Pipeline Value", target: 2, prefix: "$", suffix: ".4M", delta: "+24%" },
                            { label: "Close Rate", target: 31, suffix: "%", delta: "+5%" },
                            { label: "Hours Saved", target: 14, suffix: "h", delta: "this week" },
                          ].map((s) => (
                            <div key={s.label} className="group/stat rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.07] hover:bg-white/[0.03]">
                              <p className="text-[10px] font-medium tracking-[0.02em] text-zinc-500">{s.label}</p>
                              <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-white">
                                {s.label === "Pipeline Value" ? (
                                  <>$2.4M</>
                                ) : (
                                  <AnimatedCounter
                                    target={s.target}
                                    suffix={s.suffix}
                                    prefix={s.prefix ?? ""}
                                    active={dashboardActive}
                                  />
                                )}
                              </p>
                              <p className="mt-0.5 text-[10px] font-medium text-emerald-400/90">{s.delta}</p>
                            </div>
                          ))}
                        </div>

                        {/* Pipeline + Chart row */}
                        <div className="grid gap-5 lg:grid-cols-2">
                          <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
                            <div className="mb-4 flex items-center justify-between">
                              <p className="text-[12px] font-medium text-white">Deal Pipeline</p>
                              <span className="text-[10px] text-zinc-500">$2.4M total</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2.5">
                              {[
                                { stage: "New", count: 24, color: "bg-zinc-600/35" },
                                { stage: "Showing", count: 18, color: "bg-amber-500/25" },
                                { stage: "Offer", count: 9, color: "bg-emerald-500/25" },
                                { stage: "Closed", count: 6, color: "bg-emerald-400/40" },
                              ].map((col) => (
                                <div key={col.stage} className="space-y-2">
                                  <p className="text-[9px] font-medium tracking-wide text-zinc-500">{col.stage}</p>
                                  <div className={`rounded-lg ${col.color} p-2`}>
                                    <div className="mb-1.5 h-8 rounded border border-white/[0.03] bg-white/[0.03]" />
                                    <div className="h-6 rounded border border-white/[0.03] bg-white/[0.03]" />
                                  </div>
                                  <p className="text-[9px] text-zinc-600">{col.count} deals</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
                            <p className="mb-4 text-[12px] font-medium text-white">Revenue Analytics</p>
                            <div className="flex h-32 items-end justify-between gap-1.5">
                              {chartHeights.map((h, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 rounded-sm bg-gradient-to-t from-emerald-700/25 to-emerald-400/65 ${dashboardActive ? "animate-grow-bar" : "scale-y-0"}`}
                                  style={{
                                    height: `${h}%`,
                                    animationDelay: dashboardActive ? `${i * 60}ms` : "0ms",
                                  }}
                                />
                              ))}
                            </div>
                            <div className="mt-3 flex justify-between text-[9px] text-zinc-600">
                              <span>Jan</span><span>Jun</span><span>Dec</span>
                            </div>
                          </div>
                        </div>

                        {/* Leads + Activity */}
                        <div className="grid gap-5 lg:grid-cols-5">
                          <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-5 lg:col-span-3 backdrop-blur-sm">
                            <p className="mb-4 text-[12px] font-medium text-white">Priority Leads</p>
                            <div className="space-y-2.5">
                              {[
                                { name: "Jennifer Walsh", action: "Send offer draft", hot: true, time: "2m ago", online: true },
                                { name: "Michael Torres", action: "Schedule showing", hot: false, time: "18m ago", online: false },
                                { name: "Lisa & David Park", action: "Follow up on counter", hot: true, time: "1h ago", online: true },
                              ].map((lead) => (
                                <div key={lead.name} className="flex items-center justify-between rounded-lg border border-white/[0.03] bg-black/20 px-3.5 py-2.5 transition-colors duration-300 hover:bg-black/30">
                                  <div className="flex items-center gap-3">
                                    <div className="relative">
                                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-500/60 to-zinc-800/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
                                      {lead.online && (
                                        <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border border-[#0b100e] bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-[12px] font-medium text-white">{lead.name}</p>
                                      <p className="text-[10px] text-zinc-500">{lead.action}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] text-zinc-600">{lead.time}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${lead.hot ? "bg-emerald-500/15 text-emerald-300/90" : "bg-amber-500/12 text-amber-300/80"}`}>
                                      {lead.hot ? "Hot" : "Warm"}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-5 lg:col-span-2 backdrop-blur-sm">
                            <div className="mb-4 flex items-center justify-between">
                              <p className="text-[12px] font-medium text-white">Activity Feed</p>
                              <span className="flex items-center gap-1.5 text-[9px] text-emerald-400/60">
                                <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse-soft" />
                                Live
                              </span>
                            </div>
                            <div className="space-y-2.5">
                              {activityFeed.slice(feedIndex, feedIndex + 4).concat(
                                feedIndex + 4 > activityFeed.length
                                  ? activityFeed.slice(0, (feedIndex + 4) % activityFeed.length)
                                  : []
                              ).slice(0, 4).map((item, i) => (
                                <div key={`${item}-${i}`} className="animate-feed-item flex items-start gap-2.5">
                                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
                                  <p className="text-[10px] leading-relaxed text-zinc-400/90">{item}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right panel — AI + Calendar + Conversations */}
                      <div className="flex w-full flex-col gap-5 lg:w-64">
                          <div className="rounded-xl border border-emerald-500/10 bg-gradient-to-b from-emerald-500/[0.06] to-transparent p-4 shadow-[0_0_32px_rgba(16,185,129,0.04),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/14">
                          <div className="mb-4 flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 shadow-[0_0_12px_rgba(16,185,129,0.1)]">
                              <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                              </svg>
                            </div>
                            <p className="text-[12px] font-medium text-white">AI Assistant</p>
                            <span className="ml-auto text-[9px] text-emerald-400/60">Composing</span>
                          </div>
                          <div className="space-y-2.5">
                            <div className="rounded-lg border border-white/[0.03] bg-black/20 px-3 py-2.5 text-[10px] leading-relaxed text-zinc-400/90">
                              Draft a personalized follow-up for Jennifer Walsh about the Oak Street listing.
                            </div>
                            <div className="rounded-lg border border-emerald-500/8 bg-emerald-500/[0.05] px-3 py-2.5 text-[10px] leading-relaxed text-emerald-200/70">
                              Hi Jennifer — I wanted to follow up on the offer we discussed
                              <TypingIndicator />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-5 backdrop-blur-sm">
                          <p className="mb-4 text-[12px] font-medium text-white">Today&apos;s Calendar</p>
                          <div className="space-y-2.5">
                            {[
                              { time: "10:00", event: "Showing — 42 Maple Dr", active: true },
                              { time: "14:30", event: "Client call — Torres", active: false },
                              { time: "16:00", event: "Offer review — Park", active: false },
                            ].map((c) => (
                              <div key={c.time} className={`flex gap-2.5 rounded-lg px-2 py-1.5 text-[10px] ${c.active ? "bg-emerald-500/[0.06] border border-emerald-500/10" : ""}`}>
                                <span className={`w-10 shrink-0 font-medium ${c.active ? "text-emerald-400" : "text-emerald-400/60"}`}>{c.time}</span>
                                <span className="text-zinc-400/90">{c.event}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-5 backdrop-blur-sm">
                          <p className="mb-4 text-[12px] font-medium text-white">Recent Conversations</p>
                          <div className="space-y-3">
                            {[
                              { name: "JW", msg: "Can we tour Saturday?", unread: true, online: true },
                              { name: "MT", msg: "Thanks for the info!", unread: false, online: false },
                              { name: "LP", msg: "Counter offer sent", unread: true, online: true },
                            ].map((c) => (
                              <div key={c.name} className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80">
                                <div className="relative">
                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700/80 text-[9px] font-medium text-zinc-300">{c.name}</div>
                                  {c.online && <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border border-[#0b100e] bg-emerald-400" />}
                                </div>
                                <p className="flex-1 truncate text-[10px] text-zinc-400/90">{c.msg}</p>
                                {c.unread && <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* How it Works */}
        <section
          id="how-it-works"
          className="border-y border-white/[0.03] bg-white/[0.01] py-40 sm:py-48"
        >
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400/70">
                  How it Works
                </p>
                <h2 className="mt-6 text-[2rem] font-bold tracking-[-0.035em] text-white sm:text-4xl">
                  From chaos to closed in three steps
                </h2>
              </div>
            </Reveal>

            <div className="mx-auto mt-24 grid max-w-5xl gap-14 md:grid-cols-3 md:gap-10 lg:mt-32">
              {steps.map((item, index) => (
                <Reveal key={item.step} delay={index * 160}>
                  <div className="relative text-center md:text-left">
                    {index < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute top-10 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-emerald-500/25 to-transparent md:block"
                      />
                    )}
                    <div className="mx-auto mb-7 flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[1.125rem] border border-emerald-500/12 bg-gradient-to-br from-emerald-500/10 to-transparent text-xl font-bold text-emerald-400/90 shadow-[0_8px_32px_rgba(16,185,129,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] md:mx-0">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">{item.title}</h3>
                    <p className="mt-4 text-[15px] leading-[1.75] tracking-[-0.01em] text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-40 sm:py-48">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400/70">
                  Testimonials
                </p>
                <h2 className="mt-6 text-[2rem] font-bold tracking-[-0.035em] text-white sm:text-4xl">
                  Trusted by top-performing agents
                </h2>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                    2,400+ agents
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                    4.9/5 average rating
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                    SOC 2 compliant
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="mx-auto mt-24 grid max-w-6xl gap-8 md:grid-cols-3 lg:mt-32">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 140}>
                  <TiltCard lift>
                    <GlassCard className="flex h-full flex-col transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.08] hover:bg-white/[0.035] hover:shadow-[0_16px_48px_rgba(0,0,0,0.28)]">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex gap-0.5 text-emerald-400/80">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <svg key={j} className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 rounded-full border border-emerald-500/12 bg-emerald-500/[0.05] px-2.5 py-1 text-[10px] font-medium text-emerald-400/80">
                          <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 4.522 4.522 0 00-1.11-2.227 4.522 4.522 0 00-2.227-1.11 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 00-1.745.723 4.522 4.522 0 00-2.227 1.11 4.522 4.522 0 00-1.11 2.227 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 00.723 1.745 4.522 4.522 0 001.11 2.227 4.522 4.522 0 002.227 1.11 3.066 3.066 0 001.745.723 3.066 3.066 0 001.745-.723 4.522 4.522 0 002.227-1.11 4.522 4.522 0 001.11-2.227 3.066 3.066 0 00.723-1.745z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      </div>
                      <blockquote className="flex-1 text-[15px] leading-[1.8] tracking-[-0.01em] text-zinc-300">
                        <span className="text-emerald-400/30">&ldquo;</span>
                        {t.quote}
                        <span className="text-emerald-400/30">&rdquo;</span>
                      </blockquote>
                      <div className="mt-10 flex items-center gap-4 border-t border-white/[0.04] pt-8">
                        <div className={`relative h-14 w-14 shrink-0 rounded-full bg-gradient-to-br ${t.avatar} shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14),0_4px_16px_rgba(0,0,0,0.24)]`}>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.12] to-transparent" />
                          <div className="absolute inset-x-2 top-2 h-4 rounded-full bg-white/[0.08] blur-sm" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold tracking-[-0.01em] text-white">{t.name}</p>
                          <p className="text-xs text-zinc-500">{t.role}</p>
                          <div className="mt-2.5 flex items-center gap-2.5">
                            <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold tracking-[0.04em] text-zinc-400 uppercase">
                              {t.company}
                            </span>
                            <span className="text-[10px] text-zinc-600">{t.deals}</span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="cta" className="pb-40 sm:pb-56">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.025] to-transparent px-8 py-32 text-center shadow-[0_0_160px_rgba(16,185,129,0.1),0_32px_64px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:px-16 sm:py-40 lg:px-24 lg:py-48">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14),transparent_55%)]"
                />
                <div
                  aria-hidden="true"
                  className="hero-glow pointer-events-none absolute top-1/2 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[128px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />
                <div className="relative">
                  <h2 className="text-[2.25rem] font-bold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.5rem]">
                    Ready to transform your real estate business?
                  </h2>
                  <p className="mx-auto mt-8 max-w-2xl text-lg leading-[1.75] tracking-[-0.015em] text-zinc-400 sm:mt-10 sm:text-xl">
                    Join thousands of agents using VerdiFlow to automate their workflow and close
                    more deals. Start free — no credit card required.
                  </p>
                  <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                    <PrimaryButton href="#" breathe className="h-[3.75rem] w-full px-14 text-lg sm:w-auto">
                      Start Free
                    </PrimaryButton>
                    <OutlineButton href="#" id="book-demo" className="h-[3.75rem] w-full px-14 text-lg sm:w-auto">
                      Book Demo
                    </OutlineButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.03] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:px-10 lg:px-16">
          <span className="text-[13px] text-zinc-500">
            &copy; {new Date().getFullYear()} VerdiFlow. All rights reserved.
          </span>
          <div className="flex gap-10 text-[13px] text-zinc-500">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="transition-colors duration-[400ms] hover:text-white/90">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
