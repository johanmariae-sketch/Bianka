import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BookingSection() {
  const sectionRef = useRef(null);
  const textLinesRef = useRef([]);
  const monoRef = useRef(null);
  const ctaRef = useRef(null);
  const subCtaRef = useRef(null);
  const photosRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.from(monoRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.6,
      });

      tl.from(
        textLinesRef.current.filter(Boolean),
        {
          x: -60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
        },
        "-=0.3"
      );

      tl.from(
        ctaRef.current,
        { opacity: 0, x: -20, duration: 0.7 },
        "-=0.4"
      );

      tl.from(
        subCtaRef.current,
        { opacity: 0, duration: 0.5 },
        "-=0.3"
      );

      tl.from(
        photosRef.current.filter(Boolean),
        {
          scale: 0.92,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=1.0"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lines = [
    { text: "Tu pr\u00f3xima", italic: true, weight: "font-light" },
    { text: "transformaci\u00f3n", italic: false, weight: "font-black" },
    { text: "empieza aqu\u00ed.", italic: true, weight: "font-light" },
  ];

  const photos = [
    { src: "/instagram/DQQfLnMkabd_1.jpg", rotate: "-1.5deg" },
    { src: "/instagram/DQsqQakEav9_1.jpg", rotate: "1deg" },
    { src: "/instagram/DRK277mEVoB_1.jpg", rotate: "-0.5deg" },
  ];

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#1A1215" }}
    >
      <div className="flex flex-col-reverse lg:flex-row min-h-[80vh]">
        {/* LEFT SIDE — Typography & CTA */}
        <div className="flex-1 lg:flex-[55] flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-24 py-14 lg:py-16">
          <p
            ref={monoRef}
            className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold mb-6 md:mb-8"
            style={{ color: "rgba(196, 30, 58, 0.6)" }}
          >
            Reserva tu cita
          </p>

          {/* Smaller display text */}
          <div className="space-y-1 leading-[0.95]">
            {lines.map((line, i) => (
              <div
                key={i}
                ref={(el) => (textLinesRef.current[i] = el)}
                className={`
                  font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                  tracking-tight leading-[0.95]
                  ${line.italic ? "italic" : ""} ${line.weight || ""}
                `}
                style={{ color: "#FBF8F3" }}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div ref={ctaRef} className="mt-8 md:mt-10">
            <a
              href="https://wa.me/18298270308"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <span
                className="font-body text-base md:text-lg tracking-wide"
                style={{ color: "#C41E3A" }}
              >
                Reservar por WhatsApp{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  &rarr;
                </span>
              </span>
              <span
                className="block h-[1px] mt-1.5 transition-all duration-500 ease-out origin-left scale-x-[0.3] group-hover:scale-x-100"
                style={{ backgroundColor: "#C41E3A" }}
              />
            </a>
          </div>

          <p
            ref={subCtaRef}
            className="mt-4 font-mono text-sm"
            style={{ color: "rgba(251, 248, 243, 0.4)" }}
          >
            O llama al{" "}
            <a
              href="tel:+18298270308"
              className="hover:underline"
              style={{ color: "rgba(251, 248, 243, 0.4)" }}
            >
              829-827-0308
            </a>
          </p>
        </div>

        {/* RIGHT SIDE — 3 photos side by side + IG button */}
        <div className="flex-1 lg:flex-[45] flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 gap-6">
          <div className="flex gap-3 md:gap-4 w-full max-w-lg">
            {photos.map((photo, i) => (
              <div
                key={i}
                ref={(el) => (photosRef.current[i] = el)}
                className="flex-1 will-change-transform overflow-hidden rounded-2xl"
                style={{ transform: `rotate(${photo.rotate})` }}
              >
                <img
                  src={photo.src}
                  alt="Bianka Beauty"
                  className="w-full aspect-[3/4] object-cover shadow-[0_12px_50px_rgba(0,0,0,0.35)]"
                  style={{ border: "1px solid rgba(196, 30, 58, 0.2)" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Instagram button */}
          <a
            href="https://www.instagram.com/biankabeautys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20
                       font-body text-xs uppercase tracking-[0.2em] text-white/60
                       hover:text-white hover:border-white/40 transition-colors duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @biankabeautys
          </a>
        </div>
      </div>
    </section>
  );
}
