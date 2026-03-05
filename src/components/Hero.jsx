import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SLIDES = [
  { src: "/instagram/DRK277mEVoB_2.jpg", alt: "Tito El Bambino grooming" },
  { src: "/instagram/DQKajYCEYEP_1.jpg", alt: "Halloween editorial makeup" },
  { src: "/instagram/C2DvjGer15a_2.jpg", alt: "Makeup look" },
  { src: "/instagram/DOZntMwEYwa.jpg", alt: "Bianka Beauty storytime" },
  { src: "/instagram/DNtCxtM4iIG_1.jpg", alt: "Makeup portfolio" },
  { src: "/instagram/C8t1ctBOCdD_2.jpg", alt: "Makeup look" },
];

export default function Hero({ content = null }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const slideTrackRef = useRef(null);
  const taglineRef = useRef(null);
  const lineRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const intervalRef = useRef(null);

  const profile = content?.profile || {};
  const followers = profile.followers
    ? `${(profile.followers / 1000).toFixed(1).replace(/\.0$/, "")}k`
    : "5.8k";
  const postsCount = profile.postsCount || 355;

  /* Auto-rotate slides */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  /* Animate slide change */
  useEffect(() => {
    if (!slideTrackRef.current) return;
    gsap.to(slideTrackRef.current, {
      x: `-${activeSlide * (100 / SLIDES.length)}%`,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [activeSlide]);

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.4,
      });

      tl.from(taglineRef.current, { opacity: 0, y: 12, duration: 0.7 });

      tl.from(
        textRef.current,
        { x: -40, opacity: 0, duration: 1 },
        "-=0.3"
      );

      tl.from(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left", duration: 0.8 },
        "-=0.4"
      );

      tl.from(
        ctaRef.current,
        { opacity: 0, x: -20, duration: 0.6 },
        "-=0.4"
      );

      tl.from(
        metaRef.current,
        { opacity: 0, duration: 0.6 },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToSlide = (i) => {
    setActiveSlide(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-silk overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <div className="h-full flex flex-col">
        {/* TOP — Typography block */}
        <div className="flex-shrink-0 px-6 md:px-10 lg:px-16 xl:px-20 pt-24 md:pt-28 lg:pt-32">
          {/* Mono tagline */}
          <p
            ref={taglineRef}
            className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-rose-gold/60 font-bold mb-4 md:mb-6"
          >
            Makeup Academy &middot; Santo Domingo
          </p>

          {/* 2-line display text */}
          <div ref={textRef} className="leading-[0.90]">
            <div className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-light text-espresso/70 tracking-tight italic leading-[0.90]">
              Donde el Arte
            </div>
            <div className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-black text-espresso tracking-tight italic leading-[0.90]">
              se vuelve belleza.
            </div>
          </div>

          {/* Divider + CTA */}
          <div className="mt-6 md:mt-8">
            <div
              ref={lineRef}
              className="h-px bg-espresso/15 w-full max-w-xs mb-4"
            />
            <div className="flex items-center gap-8">
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
              <p
                ref={metaRef}
                className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-espresso/35"
              >
                {followers} seguidores &middot; +{postsCount} posts
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM — Photo slide carousel */}
        <div className="flex-1 relative mt-6 md:mt-10 overflow-hidden">
          {/* Slide track */}
          <div
            ref={slideTrackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${SLIDES.length * 100}%` }}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className="h-full flex-shrink-0 px-1 md:px-2"
                style={{ width: `${100 / SLIDES.length}%` }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover rounded-t-2xl md:rounded-t-3xl"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`
                  rounded-full transition-all duration-400
                  ${i === activeSlide
                    ? "w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                  }
                `}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
