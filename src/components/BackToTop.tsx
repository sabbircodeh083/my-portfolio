"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-1 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FaArrowUp aria-hidden className="h-4 w-4" />
    </button>
  );
}
