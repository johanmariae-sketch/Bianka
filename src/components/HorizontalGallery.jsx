import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { Heart } from "lucide-react";

/* ── Continuous horizontal carousel — auto-scrolling photo strip ── */
export default function HorizontalGallery({ posts = [] }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const speedTimeoutRef = useRef(null);

  /* Celebrity post IDs — shown in the Celebrities section, not here */
  const CELEBRITY_IDS = new Set([
    "DQQfLnMkabd", "DQsqQakEav9", "DR489ULEbGr",
    "DQ3D7dLkReK", "DQ_AGMRjmA7", "DRK277mEVoB", "DQVANzAkQ1b",
  ]);

  /* Also exclude posts that are clearly not face/makeup photos */
  const EXCLUDE_CATEGORIES = new Set(["courses"]);

  /* Filter to makeup portfolio photos only, take top 12 */
  const topPosts = useMemo(() => {
    return [...posts]
      .filter(
        (p) =>
          p.images &&
          p.images.length > 0 &&
          !CELEBRITY_IDS.has(p.id) &&
          !EXCLUDE_CATEGORIES.has(p.category) &&
          (p.likes || 0) > 0
      )
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 12);
  }, [posts]);

  const total = topPosts.length;

  /* Duplicate items for seamless loop */
  const loopItems = useMemo(() => [...topPosts, ...topPosts], [topPosts]);

  /* ── GSAP infinite horizontal scroll ── */
  useEffect(() => {
    if (total === 0) return;
    const track = trackRef.current;
    if (!track) return;

    const rafId = requestAnimationFrame(() => {
      /* Half the track width = one full set of images */
      const halfWidth = track.scrollWidth / 2;

      tweenRef.current = gsap.to(track, {
        x: -halfWidth,
        duration: total * 4, /* ~4s per image */
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % halfWidth),
        },
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      tweenRef.current?.kill();
    };
  }, [topPosts, total]);

  /* Slow on hover */
  const handleEnter = () => tweenRef.current?.timeScale(0.3);
  const handleLeave = () => tweenRef.current?.timeScale(1);

  /* Click to speed up briefly */
  const handleClick = () => {
    if (!tweenRef.current) return;
    clearTimeout(speedTimeoutRef.current);
    tweenRef.current.timeScale(3);
    speedTimeoutRef.current = setTimeout(() => {
      tweenRef.current?.timeScale(1);
    }, 1500);
  };

  if (total === 0) {
    return (
      <section className="bg-silk px-4 py-16 text-center">
        <p className="font-mono text-sm text-espresso/40">
          Cargando portafolio...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-silk py-14 md:py-20 overflow-hidden">
      {/* Heading — smaller typography */}
      <div className="px-6 md:px-10 lg:px-16 mb-8 md:mb-12">
        <span className="block font-body text-[10px] md:text-xs uppercase tracking-[0.35em] text-espresso/40 font-bold mb-3">
          Portafolio
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold italic leading-[0.95] tracking-tight text-espresso">
          Nuestro trabajo.
        </h2>
      </div>

      {/* Auto-scrolling photo strip */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
      >
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 will-change-transform"
          style={{ width: "max-content" }}
        >
          {loopItems.map((post, i) => (
            <PhotoCard key={`${post.id}-${i}`} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Photo/Video card ── */
function PhotoCard({ post }) {
  const src = Array.isArray(post.images) ? post.images[0] : post.images;
  const likes = post.likes || 0;
  const isVideo = post.type === "reel" || (post.video && !post.images?.length);

  return (
    <div className="group relative flex-shrink-0 w-[220px] md:w-[280px] overflow-hidden rounded-2xl select-none">
      {isVideo && post.video ? (
        <video
          src={post.video}
          className="w-full aspect-[3/4] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          autoPlay
          loop
          muted
          playsInline
          draggable={false}
        />
      ) : (
        <img
          src={src}
          alt={post.caption || "Bianka Beauty portfolio"}
          loading="lazy"
          className="w-full aspect-[3/4] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          draggable={false}
        />
      )}

      {/* Likes pill — appears on hover */}
      {likes > 0 && (
        <div
          className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full
                     bg-espresso/70 px-2.5 py-1 opacity-0 backdrop-blur-sm
                     transition-opacity duration-300 group-hover:opacity-100"
        >
          <Heart className="h-3 w-3 fill-rose-gold text-rose-gold" />
          <span className="font-mono text-[10px] text-silk">
            {likes.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
