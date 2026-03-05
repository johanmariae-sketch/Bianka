import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ALL_PHOTOS = [
  { src: "/instagram/DRK277mEVoB_2.jpg", alt: "Tito El Bambino grooming" },
  { src: "/instagram/DQKajYCEYEP_1.jpg", alt: "Halloween editorial makeup" },
  { src: "/instagram/C2DvjGer15a_2.jpg", alt: "Makeup look" },
  { src: "/instagram/DOZntMwEYwa.mp4", alt: "Bianka Beauty storytime", video: true },
  { src: "/instagram/DNtCxtM4iIG_1.jpg", alt: "Makeup portfolio" },
  { src: "/instagram/C8t1ctBOCdD_2.jpg", alt: "Makeup look 2" },
];

export default function Hero({ content = null }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const taglineRef = useRef(null);
  const lineRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const slotsRef = useRef([]);
  const intervalRef = useRef(null);

  /* Which slot (0, 1, 2) to rotate next */
  const [slotToRotate, setSlotToRotate] = useState(0);
  /* Track which photo each slot shows — start with first 3 */
  const [slots, setSlots] = useState([0, 1, 2]);
  /* Next photo index to bring in */
  const nextPhotoRef = useRef(3);

  const profile = content?.profile || {};
  const followers = profile.followers
    ? `${(profile.followers / 1000).toFixed(1).replace(/\.0$/, "")}k`
    : "5.8k";
  const postsCount = profile.postsCount || 355;

  /* Every 3s, rotate one slot to the next photo */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSlots((prev) => {
        const newSlots = [...prev];
        const nextIdx = nextPhotoRef.current % ALL_PHOTOS.length;
        setSlotToRotate((s) => {
          newSlots[s] = nextIdx;
          return (s + 1) % 3;
        });
        nextPhotoRef.current = nextIdx + 1;
        return newSlots;
      });
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  /* Animate the changed slot + force-play any videos */
  useEffect(() => {
    const changedSlot = (slotToRotate + 2) % 3; // the one that just changed
    const el = slotsRef.current[changedSlot];
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, scale: 1.08 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }
    );
    /* Force-play all videos in the hero (iOS won't honor autoPlay on dynamic elements) */
    slotsRef.current.forEach((slot) => {
      const vid = slot?.querySelector("video");
      if (vid && vid.paused) vid.play().catch(() => {});
    });
  }, [slots]);

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

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-silk overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <div className="h-full flex flex-col lg:flex-row">
        {/* LEFT — Typography */}
        <div className="flex-1 lg:flex-[40] flex flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-20 pt-20 lg:pt-0">
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

        {/* RIGHT — 3 photo slots that rotate through all 6 photos */}
        <div className="flex-1 lg:flex-[60] relative min-h-[40vh] lg:min-h-0">
          <div className="absolute inset-0 flex gap-1.5 md:gap-2 p-2 lg:p-3">
            {slots.map((photoIdx, i) => {
              const photo = ALL_PHOTOS[photoIdx];
              return (
                <div
                  key={`slot-${i}`}
                  ref={(el) => (slotsRef.current[i] = el)}
                  className="flex-1 overflow-hidden rounded-xl lg:rounded-2xl"
                >
                  {photo.video ? (
                    <video
                      src={photo.src}
                      className="w-full h-full object-cover object-top"
                      autoPlay
                      loop
                      muted
                      playsInline
                      webkit-playsinline=""
                      preload="metadata"
                      onCanPlay={(e) => e.target.play().catch(() => {})}
                    />
                  ) : (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
