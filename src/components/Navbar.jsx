import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const brandRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(brandRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".nav-right", {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-center
        px-6 md:px-10 lg:px-16
        h-16 md:h-20
        transition-all duration-500 ease-out
        ${
          scrolled
            ? "bg-silk/80 backdrop-blur-xl border-b border-espresso/[0.08] shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
            : "bg-transparent border-b border-transparent"
        }
      `}
    >
      {/* Left spacer for centering */}
      <div className="flex-1" />

      {/* Center: Logo as styled text */}
      <a
        ref={brandRef}
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#hero");
        }}
        className="select-none flex flex-col items-center"
      >
        <span className="font-display text-3xl md:text-4xl italic text-espresso tracking-[0.04em] leading-none">
          bianka
        </span>
        <span className="font-body text-[7px] md:text-[8px] uppercase tracking-[0.45em] text-espresso/70 font-semibold mt-0.5">
          beauty
        </span>
      </a>

      {/* Right spacer */}
      <div className="flex-1 flex justify-end nav-right">
        <a
          href="https://www.instagram.com/biankabeautys"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-medium text-espresso/40 hover:text-espresso transition-colors"
        >
          @biankabeautys
        </a>
      </div>
    </nav>
  );
}
