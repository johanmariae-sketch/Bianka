export default function ContactFooter() {
  const contactItems = [
    {
      label: "Santo Domingo, RD",
      href: null,
    },
    {
      label: "829-827-0308",
      href: "tel:+18298270308",
    },
    {
      label: "@biankabeautys",
      href: "https://www.instagram.com/biankabeautys",
    },
    {
      label: "Lun\u2013S\u00e1b: 9am\u20138pm",
      href: null,
    },
  ];

  return (
    <footer className="bg-silk w-full">
      {/* ── Part 1: Contact strip ── */}
      <div className="px-6 md:px-12 lg:px-16 xl:px-24 pt-20 pb-12">
        {/* Desktop: single horizontal line with dividers */}
        <div className="hidden md:flex items-center justify-center">
          {contactItems.map((item, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && (
                <div
                  className="h-4 w-px mx-8 lg:mx-12"
                  style={{ backgroundColor: "rgba(26, 18, 21, 0.1)" }}
                />
              )}
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-sm transition-colors duration-300 hover:text-espresso"
                  style={{ color: "rgba(26, 18, 21, 0.5)" }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className="font-mono text-sm"
                  style={{ color: "rgba(26, 18, 21, 0.5)" }}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 gap-6 md:hidden">
          {contactItems.map((item, i) => (
            <div key={i} className="text-center">
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-sm transition-colors duration-300 hover:text-espresso"
                  style={{ color: "rgba(26, 18, 21, 0.5)" }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className="font-mono text-sm"
                  style={{ color: "rgba(26, 18, 21, 0.5)" }}
                >
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Part 2: Bottom bar ── */}
      <div className="px-6 md:px-12 lg:px-16 xl:px-24 pb-8">
        {/* Full-width thin line */}
        <div
          className="h-px w-full mb-6"
          style={{ backgroundColor: "rgba(26, 18, 21, 0.1)" }}
        />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(26, 18, 21, 0.3)" }}
          >
            &copy; 2024 Bianka Beauty
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(26, 18, 21, 0.3)" }}
          >
            Maquillaje Profesional &amp; Beauty Academy
          </span>
        </div>
      </div>
    </footer>
  );
}
