import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/18298270308"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reserva por WhatsApp"
      className="
        fixed bottom-6 right-6 z-50
        group flex items-center
        bg-rose-gold text-white
        rounded-full shadow-lg
        w-14 h-14 hover:w-auto hover:px-6
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:brightness-110
        pulse-glow
      "
    >
      {/* Icon — always visible */}
      <span className="flex-shrink-0 flex items-center justify-center w-14 h-14">
        <MessageCircle size={24} strokeWidth={2} />
      </span>

      {/* Text — revealed on hover */}
      <span
        className="
          font-body font-semibold text-sm text-white whitespace-nowrap
          max-w-0 overflow-hidden opacity-0
          group-hover:max-w-[200px] group-hover:opacity-100 group-hover:mr-4
          transition-all duration-300 ease-in-out
        "
      >
        Reserva por WhatsApp
      </span>
    </a>
  );
}
