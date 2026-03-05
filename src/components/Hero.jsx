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
  const taglineRef = useRef(null);
  const lineRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const slidesRef = useRef([]);
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

  /* Animate slide change — crossfade */
  useEffect(() => {
    slidesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === activeSlide ? 1 : 0,
        scale: i === activeSlide ? 1 : 1.05,
        duration: 0.8,
        ease: "power2.out",
      });
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
      tl.from(textRef.current, { x: -40, opacity: 0, duration: 1 }, "-=0.3");
      tl.from(lineRef.current, { scaleX: 0, transformOrigin: "left", duration: 0.8 }, "-=0.4");
      tl.from(ctaRef.current, { opacity: 0, x: -20, duration: 0.6 }, "-=0.4");
      tl.from(metaRef.current, { opacity: 0, duration: 0.6 }, "-=0.3");
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
      <div className="h-full flex flex-col lg:flex-row">
        {/* LEFT SIDE — Typography */}
        <div className="flex-1 lg:flex-[55] flex flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-20 pt-20 lg:pt-0">
          <p
            ref={taglineRef}
            className="font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-rose-gold/60 font-bold mb-4 md:mb-6"
          >
            Makeup Academy &middot; Santo Domingo
          </p>

          <div ref={textRef} className="leading-[0.90]">
            <div className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-espresso/70 tracking-tight italic leading-[0.90]">
              Donde el Arte
            </div>
            <div className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-espresso tracking-tight italic leading-[0.90]">
              se vuelve belleza.
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            <div ref={lineRef} className="h-px bg-espresso/15 w-full max-w-xs mb-6" />
            <a
              ref={ctaRef}
              href="#booking"
              onClick={(e) => { e.preventDefault(); scrollTo("#booking"); }}
              className="group inline-flex items-center gap-3 font-body text-sm md:text-base text-rose-gold uppercase tracking-[0.2em] font-bold transition-colors duration-300 hover:text-rose-gold/80"
            >
              <span>Reservar Cita</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
            </a>
          </div>

          <p
            ref={metaRef}
            className="mt-6 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-espresso/35"
          >
            {followers} seguidores &middot; +{postsCount} posts &middot; Santo Domingo
          </p>
        </div>

        {/* RIGHT SIDE — Photo slideshow */}
        <div className="flex-1 lg:flex-[45] relative min-h-[40vh] lg:min-h-0">
          <div className="relative w-full h-full overflow-hidden">
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                ref={(el) => (slidesRef.current[i] = el)}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`rounded-full transition-all duration-400 ${
                    i === activeSlide
                      ? "w-6 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
