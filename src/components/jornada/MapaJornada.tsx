import { useEffect, useMemo, useRef, useState } from "react";
import { experiencias } from "./data";
import unb from "@/assets/jornada/cidade-unb.png";
import tcu from "@/assets/jornada/cidade-tcu.png";
import fsb from "@/assets/jornada/cidade-fsb.png";
import senado from "@/assets/jornada/cidade-senado.png";
import macaubal from "@/assets/jornada/cidade-macaubal.png";
import cerrado from "@/assets/jornada/cidade-cerrado.png";
import personagem from "@/assets/jornada/personagem.png";

const imagens = [unb, tcu, fsb, senado, macaubal, cerrado];
const N = experiencias.length;

/** Pontos das cidades em % do mapa (x, y). */
function pontos(mobile: boolean) {
  return experiencias.map((_, i) => {
    const esquerda = i % 2 === 0;
    const x = mobile ? (esquerda ? 30 : 70) : esquerda ? 28 : 72;
    const y = ((i + (mobile ? 0.28 : 0.5)) / N) * 100;
    return { x, y };
  });
}

function construirCaminho(ps: { x: number; y: number }[]) {
  const inicio = { x: 50, y: 0 };
  const fim = { x: 50, y: 100 };
  const todos = [inicio, ...ps, fim];
  let d = `M ${inicio.x} ${inicio.y}`;
  for (let i = 1; i < todos.length; i++) {
    const a = todos[i - 1]!;
    const b = todos[i]!;
    const my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  return d;
}

export function MapaJornada() {
  const wrap = useRef<HTMLDivElement>(null);
  const caminho = useRef<SVGPathElement>(null);
  const [mobile, setMobile] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 0, virado: false, andando: false });

  const ps = useMemo(() => pontos(mobile), [mobile]);
  const d = useMemo(() => construirCaminho(ps), [ps]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const up = () => setMobile(mq.matches);
    up();
    mq.addEventListener("change", up);
    return () => mq.removeEventListener("change", up);
  }, []);

  useEffect(() => {
    let frame = 0;
    let parar: ReturnType<typeof setTimeout> | undefined;
    let ultimoX = 50;
    const medir = () => {
      frame = 0;
      const el = wrap.current;
      const p = caminho.current;
      if (!el || !p) return;
      const r = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      const len = p.getTotalLength();
      const pt = p.getPointAtLength(t * len);
      const virado = pt.x < ultimoX - 0.05 ? true : pt.x > ultimoX + 0.05 ? false : undefined;
      ultimoX = pt.x;
      setPos((old) => ({ x: pt.x, y: pt.y, virado: virado ?? old.virado, andando: true }));
      clearTimeout(parar);
      parar = setTimeout(() => setPos((o) => ({ ...o, andando: false })), 180);
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
      clearTimeout(parar);
    };
  }, [d]);

  const atual = ps.reduce((acc, p, i) => (pos.y + 1.5 >= p.y ? i : acc), -1);

  return (
    <div
      ref={wrap}
      className="relative mx-auto max-w-6xl overflow-visible"
      style={{ height: `${N * (mobile ? 820 : 640)}px` }}
    >
      {/* Estrada */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={d} fill="none" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="46" vectorEffect="non-scaling-stroke" strokeLinecap="square" />
        <path d={d} fill="none" stroke="var(--card)" strokeWidth="34" vectorEffect="non-scaling-stroke" strokeLinecap="square" />
        <path
          ref={caminho}
          d={d}
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity="0.35"
          strokeWidth="4"
          strokeDasharray="8 12"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Cidades */}
      {experiencias.map((exp, i) => {
        const p = ps[i]!;
        const visitada = i <= atual;
        const esquerda = i % 2 === 0;
        return (
          <div key={exp.titulo}>
            <img
              src={imagens[i]}
              alt={`Ilustração em pixel art: ${exp.titulo}`}
              loading="lazy"
              width={816}
              height={816}
              className={`cidade pixelado absolute w-[62vw] max-w-[340px] lg:w-[360px] lg:max-w-none -translate-x-1/2 -translate-y-[62%] drop-shadow-[0_18px_18px_color-mix(in_oklab,var(--foreground)_22%,transparent)] ${
                visitada ? "is-in" : ""
              } ${i === atual ? "is-aqui" : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            />
            <span
              className="absolute -translate-x-1/2 translate-y-6 font-pixel text-xs tracking-widest bg-foreground text-background px-2 py-1 rounded"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {String(i + 1).padStart(2, "0")} · {exp.periodo}
            </span>

            <article
              className={`dialogo-pixel absolute p-5 lg:p-6 transition-all duration-700 ${
                visitada ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } left-4 right-4 lg:right-auto lg:left-auto lg:w-[400px]`}
              style={
                mobile
                  ? { top: `calc(${p.y}% + 90px)` }
                  : {
                      top: `${p.y}%`,
                      transform: `translateY(-50%)`,
                      ...(esquerda ? { left: "54%" } : { right: "54%" }),
                    }
              }
            >
              <p className="font-pixel text-xs uppercase tracking-[0.2em] text-foreground/55">
                {i === N - 1 ? "Destino atual" : `Parada ${i + 1}`} · {exp.papel}
              </p>
              <h3 className="mt-2 text-2xl lg:text-3xl font-extrabold leading-tight text-balance">
                {exp.titulo}
              </h3>
              <p className="mt-3 text-[15px] text-foreground/75 text-pretty">{exp.resumo}</p>
              <p className="mt-4 border-t-2 border-dashed border-foreground/15 pt-4 text-[15px] italic text-foreground/85 text-pretty">
                “{exp.nota}”
              </p>
              {exp.antecipa ? (
                <p className="mt-4 inline-flex items-center gap-2 font-pixel text-sm bg-amarelo px-2.5 py-1 rounded">
                  + {exp.antecipa}
                </p>
              ) : null}
              <span className="seta-pisca absolute bottom-2 right-3 font-pixel text-sm">▼</span>
            </article>
          </div>
        );
      })}

      {/* Personagem */}
      <div
        className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full"
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      >
        <div className={pos.andando ? "personagem-passo" : ""}>
          <img
            src={personagem}
            alt="Jelder em pixel art"
            width={96}
            height={96}
            className="pixelado size-24 lg:size-28"
            style={{ transform: pos.virado ? "scaleX(-1)" : undefined }}
          />
        </div>
        <span className="mx-auto -mt-3 block h-2 w-10 rounded-full bg-foreground/25 blur-[2px]" />
      </div>
    </div>
  );
}
