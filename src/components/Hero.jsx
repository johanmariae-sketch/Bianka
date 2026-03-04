import { useEffect, useRef } from "react";
import gsap from "gsap";

const PHOTOS = [
  {
    src: "/instagram/DQQfLnMkabd_1.jpg",
    alt: "Celebrity makeup look 1",
    rotate: "-2deg",
    className: "w-[70%] md:w-[65%] top-[8%] left-[5%] z-10",
    hoverX: -6,
    hoverY: -4,
  },
  {
    src: "/instagram/DQsqQakEav9_1.jpg",
    alt: "Celebrity makeup look 2",
    rotate: "3deg",
    className: "w-[50%] md:w-[48%] top-[2%] right-[0%] z-20",
    hoverX: 8,
    hoverY: -6,
  },
  {
    src: "/instagram/DR489ULEbGr_1.jpg",
    alt: "Celebrity makeup look 3",
    rotate: "-1deg",
    className: "w-[40%] md:w-[38%] bottom-[8%] left-[10%] z-30",
    hoverX: -4,
    hoverY: 8,
  },
];

export default function Hero({ content = null }) {
  const sectionRef = useRef(null);
  const textLinesRef = useRef([]);
  const photosRef = useRef([]);
  const collageRef = useRef(null);
  const metaRef = useRef(null);
  const lineRef = useRef(null);
  const ctaRef = useRef(null);
  const taglineRef = useRef(null);

  const profile = content?.profile || {};
  const followers = profile.followers
    ? `${(profile.followers / 1000).toFixed(1).replace(/\.0$/, "")}k`
    : "5.8k";
  const postsCount = profile.postsCount || 355;

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.4,
      });

      // Stagger text lines from left
      tl.from(textLinesRef.current.filter(Boolean), {
        x: -40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      });

      // Tagline
      tl.from(
        taglineRef.current,
        { opacity: 0, y: 12, duration: 0.7 },
        "-=0.5"
      );

      // Horizontal rule
      tl.from(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left", duration: 0.8 },
        "-=0.4"
      );

      // CTA link
      tl.from(
        ctaRef.current,
        { opacity: 0, x: -20, duration: 0.6 },
        "-=0.4"
      );

      // Meta text
      tl.from(
        metaRef.current,
        { opacity: 0, duration: 0.6 },
        "-=0.3"
      );

      // Photos scale in with stagger
      tl.from(
        photosRef.current.filter(Boolean),
        {
          scale: 0.9,
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

  /* ── Photo parallax on hover ── */
  useEffect(() => {
    const collage = collageRef.current;
    if (!collage) return;

    const handleMove = (e) => {
      const rect = collage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      photosRef.current.forEach((photo, i) => {
        if (!photo) return;
        const config = PHOTOS[i];
        gsap.to(photo, {
          x: x * config.hoverX * 6,
          y: y * config.hoverY * 6,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    };

    const handleLeave = () => {
      photosRef.current.forEach((photo) => {
        if (!photo) return;
        gsap.to(photo, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
      });
    };

    collage.addEventListener("mousemove", handleMove);
    collage.addEventListener("mouseleave", handleLeave);

    return () => {
      collage.removeEventListener("mousemove", handleMove);
      collage.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Text lines config ── */
  const lines = [
    { text: "Donde", italic: false, size: "text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]", weight: "font-light" },
    { text: "el arte", italic: true, size: "text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]", weight: "font-bold", accent: true },
    { text: "se vuelve", italic: false, size: "text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]", weight: "font-light" },
    { text: "belleza.", italic: true, size: "text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]", weight: "font-black", accent: true },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-silk overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <div className="h-full flex flex-col lg:flex-row">
        {/* ════════════════════════════════════════════════
            LEFT SIDE — Typography block
            ════════════════════════════════════════════════ */}
        <div className="flex-1 lg:flex-[55] flex flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-20 pt-20 lg:pt-0">
          {/* Mono tagline */}
          <p
            ref={taglineRef}
            className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-rose-gold/60 font-bold mb-6 md:mb-8"
          >
            Makeup Academy &middot; Santo Domingo
          </p>

          {/* Large stacked display text */}
          <div className="space-y-0 leading-[0.92]">
            {lines.map((line, i) => (
              <div
                key={i}
                ref={(el) => (textLinesRef.current[i] = el)}
                className={`
                  font-display ${line.size} ${line.weight || ""}
                  ${line.accent ? "text-espresso" : "text-espresso/70"}
                  ${line.italic ? "italic" : ""}
                  leading-[0.92] tracking-tight
                `}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Divider + CTA */}
          <div className="mt-8 md:mt-10">
            <div
              ref={lineRef}
              className="h-px bg-espresso/15 w-full max-w-xs mb-6"
            />
            <a
              ref={ctaRef}
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#booking");
              }}
              className="
                group inline-flex items-center gap-3
                font-body text-sm md:text-base text-rose-gold uppercase tracking-[0.2em] font-bold
                transition-colors duration-300 hover:text-rose-gold/80
              "
            >
              <span>Reservar Cita</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </a>
          </div>

          {/* Stats in mono */}
          <p
            ref={metaRef}
            className="mt-6 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-espresso/35"
          >
            {followers} seguidores &middot; +{postsCount} posts &middot; Santo
            Domingo
          </p>
        </div>

        {/* ════════════════════════════════════════════════
            RIGHT SIDE — Asymmetric photo collage
            ════════════════════════════════════════════════ */}
        <div className="flex-1 lg:flex-[45] relative min-h-[40vh] lg:min-h-0">
          <div
            ref={collageRef}
            className="relative w-full h-full"
          >
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                ref={(el) => (photosRef.current[i] = el)}
                className={`absolute ${photo.className} will-change-transform`}
                style={{ transform: `rotate(${photo.rotate})` }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="
                    w-full h-auto
                    rounded-2xl
                    object-cover
                    shadow-[0_8px_40px_rgba(26,18,21,0.12)]
                  "
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
