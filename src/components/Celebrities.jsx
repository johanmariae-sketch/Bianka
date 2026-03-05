import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const celebrities = [
  { name: "Don Miguelo", context: "Maquillaje para videoclip", image: "/instagram/DQQfLnMkabd_1.jpg" },
  { name: "Cosculluela", context: "Grooming para sesión", image: "/instagram/DQsqQakEav9_1.jpg" },
  { name: "Jhayco", context: "Estilismo audiovisual", image: "/instagram/DQ3D7dLkReK_1.jpg" },
  { name: "De La Ghetto", context: "GZ Casa Alofoke Sessions", image: "/instagram/DQ_AGMRjmA7_1.jpg" },
  { name: "Tito El Bambino", context: "Men Grooming eventos", image: "/instagram/DRK277mEVoB_1.jpg" },
];

const brands =
  "MAC Cosmetics · Dermacol · NARS · Fenty Beauty · Anastasia Beverly Hills · NYX · Make Up For Ever · Kryolan";

export default function Celebrities() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const intervalRef = useRef(null);
  const [active, setActive] = useState(0);

  /* Auto-rotate every 3.5s */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % celebrities.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  /* Animate cards on active change */
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // Calculate circular offset
      let offset = i - active;
      if (offset > celebrities.length / 2) offset -= celebrities.length;
      if (offset < -celebrities.length / 2) offset += celebrities.length;
      const absOffset = Math.abs(offset);

      if (absOffset > 2) {
        gsap.to(card, { opacity: 0, scale: 0.7, x: offset * 280, zIndex: 0, duration: 0.6, ease: "power3.out" });
        return;
      }

      gsap.to(card, {
        x: offset * 300,
        scale: i === active ? 1 : 0.82 - absOffset * 0.04,
        opacity: i === active ? 1 : 0.35,
        rotateY: offset * -8,
        zIndex: 20 - absOffset,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, [active]);

  /* Heading entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = (i) => {
    setActive(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % celebrities.length);
    }, 3500);
  };

  return (
    <section ref={sectionRef} className="relative bg-silk py-16 md:py-24 overflow-hidden">
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-16 md:mb-24 px-6">
        <span className="block font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-espresso/40 font-bold mb-5">
          Hemos trabajado con
        </span>
        <h2 className="font-display italic text-espresso text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight">
          los más <span className="text-rose-gold not-italic font-black">grandes.</span>
        </h2>
      </div>

      {/* 3D Carousel */}
      <div className="relative h-[55vh] md:h-[65vh] flex items-center justify-center" style={{ perspective: "1400px" }}>
        <div className="relative w-[280px] md:w-[360px] h-full">
          {celebrities.map((celeb, i) => (
            <div
              key={celeb.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute inset-0 cursor-pointer will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => goTo(i)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <img
                  src={celeb.image}
                  alt={celeb.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <h3 className="font-display text-3xl md:text-4xl text-white leading-tight italic tracking-tight">
                    {celeb.name}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase">
                    {celeb.context}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-3 mt-8 md:mt-12">
        {celebrities.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`
              rounded-full transition-all duration-500
              ${i === active
                ? "w-8 h-2 bg-rose-gold"
                : "w-2 h-2 bg-espresso/15 hover:bg-espresso/30"
              }
            `}
            aria-label={`Ver ${celebrities[i].name}`}
          />
        ))}
      </div>

      {/* Active name display */}
      <div className="text-center mt-6">
        <p className="font-display italic text-xl md:text-2xl text-espresso/70">{celebrities[active].name}</p>
      </div>

      {/* Brand marquee */}
      <div className="mt-10 md:mt-16 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-body text-xs md:text-sm text-espresso/15 tracking-[0.25em] mx-8 uppercase font-bold">
              {brands}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
