import { useEffect, useRef, useState } from "react";

/** Adiciona a classe de revelação quando o elemento entra na viewport. */
export function useReveal<T extends Element>(rootMargin = "-12% 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisivel(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, visivel };
}

/** Progresso (0–1) do scroll dentro de um elemento, medido pelo centro da viewport. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const medir = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const centro = window.innerHeight * 0.55;
      const bruto = (centro - rect.top) / Math.max(rect.height, 1);
      setProgresso(Math.min(1, Math.max(0, bruto)));
    };

    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progresso };
}
