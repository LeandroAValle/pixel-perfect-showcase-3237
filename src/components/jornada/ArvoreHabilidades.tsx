import { useState } from "react";
import { competencias } from "./data";
import { useReveal } from "./useReveal";

const POSICOES = [70, 215, 360, 500, 640, 785, 930];

export function ArvoreHabilidades() {
  const [selecionada, setSelecionada] = useState(competencias[0]!.id);
  const { ref, visivel } = useReveal<HTMLDivElement>("-5% 0px -10% 0px");
  const atual = competencias.find((c) => c.id === selecionada) ?? competencias[0]!;

  return (
    <div ref={ref} className="max-w-5xl mx-auto">
      <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50">
        A linha se abre em ramos
      </p>
      <h3 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-none text-balance max-w-[20ch]">
        Árvore de habilidades
      </h3>
      <p className="mt-4 text-base text-foreground/70 text-pretty max-w-[52ch]">
        Cada ramo é uma competência construída ao longo do caminho. Selecione um ramo para ver
        onde ela foi desenvolvida.
      </p>

      {/* Desktop: a linha central se ramifica */}
      <div className="mt-8 hidden md:block">
        <svg viewBox="0 0 1000 400" className="w-full h-auto" role="presentation">
          <line
            x1="500"
            y1="0"
            x2="500"
            y2="120"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`jornada-ramo text-foreground ${visivel ? "is-in" : ""}`}
            pathLength={100}
          />
          {competencias.map((c, i) => {
            const x = POSICOES[i];
            const yFinal = i % 2 === 0 ? 250 : 300;
            const ativo = c.id === selecionada;
            return (
              <g
                key={c.id}
                role="button"
                tabIndex={0}
                aria-pressed={ativo}
                className="cursor-pointer outline-none"
                onClick={() => setSelecionada(c.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelecionada(c.id);
                  }
                }}
              >
                <path
                  d={`M 500 120 C 500 ${yFinal - 60}, ${x} ${170}, ${x} ${yFinal}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={ativo ? 2 : 1}
                  className={`jornada-ramo ${ativo ? "text-foreground" : "text-foreground/30"} ${
                    visivel ? "is-in" : ""
                  }`}
                  pathLength={100}
                  style={{ transitionDelay: `${150 + i * 110}ms` }}
                />
                <circle
                  cx={x}
                  cy={yFinal}
                  r={ativo ? 7 : 5}
                  className={`jornada-node ${visivel ? "is-in" : ""} ${
                    ativo ? "fill-amarelo" : "fill-foreground/30"
                  }`}
                  stroke="currentColor"
                  strokeWidth={ativo ? 1.5 : 0}
                  style={{ transitionDelay: `${600 + i * 110}ms` }}
                />
                <text
                  x={x}
                  y={yFinal + 28}
                  textAnchor="middle"
                  className={`jornada-node ${visivel ? "is-in" : ""} text-[15px] font-bold ${
                    ativo ? "fill-foreground" : "fill-foreground/60"
                  }`}
                  style={{ transitionDelay: `${640 + i * 110}ms` }}
                >
                  {c.nome}
                </text>
                <text
                  x={x}
                  y={yFinal + 48}
                  textAnchor="middle"
                  className={`jornada-node ${visivel ? "is-in" : ""} text-[11px] fill-foreground/45 uppercase tracking-[0.12em]`}
                  style={{ transitionDelay: `${680 + i * 110}ms` }}
                >
                  {c.origem}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile: os ramos se reorganizam verticalmente */}
      <div className="mt-8 md:hidden relative pl-6">
        <span className="absolute left-0 top-2 bottom-2 w-px bg-foreground/20" />
        <ul className="space-y-3">
          {competencias.map((c, i) => {
            const ativo = c.id === selecionada;
            return (
              <li key={c.id} className="relative">
                <span
                  className={`absolute -left-6 top-6 h-px ${i % 2 === 0 ? "w-4" : "w-6"} bg-foreground/25`}
                />
                <button
                  type="button"
                  onClick={() => setSelecionada(c.id)}
                  aria-pressed={ativo}
                  className={`w-full text-left rounded-xl p-4 ring-1 transition-colors ${
                    ativo
                      ? "bg-amarelo ring-foreground/20"
                      : "bg-card ring-foreground/5 hover:bg-card/70"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                    {c.origem}
                  </p>
                  <p className="mt-1 text-lg font-bold">{c.nome}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Explicação da competência selecionada */}
      <div className="mt-8 bg-card rounded-2xl ring-1 ring-foreground/5 p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/40">
          Onde foi desenvolvida
        </p>
        <p className="mt-3 text-2xl font-bold">{atual.nome}</p>
        <p className="mt-1 text-sm text-foreground/60">{atual.origem}</p>
        <p className="mt-4 text-base text-foreground/80 text-pretty max-w-[62ch]">
          {atual.detalhe}
        </p>
      </div>

      {/* Seleção também acessível como lista no desktop */}
      <div className="mt-6 hidden md:flex flex-wrap gap-2">
        {competencias.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelecionada(c.id)}
            aria-pressed={c.id === selecionada}
            className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors ${
              c.id === selecionada
                ? "bg-amarelo ring-foreground/20"
                : "bg-card ring-foreground/5 hover:bg-card/70"
            }`}
          >
            {c.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
