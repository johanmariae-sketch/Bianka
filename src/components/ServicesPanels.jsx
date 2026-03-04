import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    name: "Maquillaje Profesional",
    price: "desde $80",
    description:
      "Looks personalizados para cada ocasión. Social, editorial, men grooming — cada rostro es un lienzo único.",
    image: "/instagram/DQVANzAkQ1b_1.jpg",
  },
  {
    number: "02",
    name: "Beauty Academy",
    price: "desde $200",
    description:
      "Formamos artistas con excelencia. Cursos presenciales y digitales, desde básico hasta masterclass avanzada.",
    image: "/instagram/DQ3D7dLkReK_1.jpg",
  },
  {
    number: "03",
    name: "Eventos & Novias",
    price: "desde $250",
    description:
      "Tu día especial merece perfección. Maquillaje nupcial, quinceañeras, eventos corporativos.",
    image: "/instagram/DQQfLnMkabd_1.jpg",
  },
];

export default function ServicesPanels() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sp-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32"
      style={{ backgroundColor: "#1A1215" }}
      aria-label="Servicios de Bianka Beauty"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {services.map((service) => (
          <div
            key={service.number}
            className="sp-card border-b border-white/10 py-10 md:py-14"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              {/* Image */}
              <div className="flex-shrink-0 w-full md:w-[280px] lg:w-[320px] overflow-hidden rounded-xl">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text content */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Number + Name row */}
                <div className="flex items-baseline gap-4 md:gap-6 mb-3">
                  <span className="font-mono text-rose-gold/50 text-sm tracking-widest">
                    {service.number}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white tracking-tight leading-none italic font-bold">
                    {service.name}
                  </h3>
                </div>

                {/* Price */}
                <span className="font-mono text-lg md:text-xl text-white font-bold tracking-wide mb-4">
                  {service.price}
                </span>

                {/* Description */}
                <p className="font-body text-white/50 text-sm md:text-base leading-relaxed mb-5 max-w-lg">
                  {service.description}
                </p>

                {/* CTA */}
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#booking");
                  }}
                  className="font-body font-semibold text-rose-gold text-sm tracking-wide hover:tracking-widest transition-all duration-300 w-fit"
                >
                  Reservar &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
