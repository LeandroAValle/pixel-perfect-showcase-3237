import { experiencias } from "./data";
import { useReveal, useScrollProgress } from "./useReveal";
import { ArvoreHabilidades } from "./ArvoreHabilidades";

function CardExperiencia({
  exp,
  indice,
}: {
  exp: (typeof experiencias)[number];
  indice: number;
}) {
  const { ref, visivel } = useReveal<HTMLDivElement>();
  const esquerda = indice % 2 === 0;

  return (
    <div
      ref={ref}
      className={`jornada-reveal ${visivel ? "is-in" : ""} relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-20 last:mb-8`}
    >
      <div
        className={`${esquerda ? "lg:order-1 lg:pr-12 lg:text-right" : "lg:order-2 lg:pl-12"}`}
      >
        <p className="text-sm font-semibold tracking-[0.15em] text-foreground/50">{exp.periodo}</p>
        <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-balance">{exp.titulo}</h3>
        <p className="mt-1 text-sm text-foreground/60">{exp.papel}</p>
        <p className="mt-4 text-base text-foreground/75 text-pretty">{exp.resumo}</p>
        {exp.antecipa ? (
          <p
            className={`mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/45 ${
              esquerda ? "lg:justify-end" : ""
            }`}
          >
            <span className="h-px w-8 bg-foreground/25" />
            ramo: {exp.antecipa}
          </p>
        ) : null}
      </div>

      <div className={`${esquerda ? "lg:order-2" : "lg:order-1 lg:pr-12"}`}>
        <div className="bg-card rounded-xl ring-1 ring-foreground/5 p-6">
          <p
            className={`text-[11px] uppercase tracking-[0.2em] text-foreground/40 ${
              esquerda ? "" : "lg:text-right"
            }`}
          >
            Nota de campo
          </p>
          <p
            className={`mt-3 text-base text-foreground/80 text-pretty ${
              esquerda ? "" : "lg:text-right"
            }`}
          >
            {exp.nota}
          </p>
        </div>
      </div>

      <span
        className={`hidden lg:block absolute left-1/2 top-6 -translate-x-1/2 size-3 rounded-full ring-4 ring-background ${
          indice === experiencias.length - 1 ? "bg-amarelo" : "bg-foreground"
        }`}
      />
    </div>
  );
}

export function JornadaSection() {
  const { ref, progresso } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="minha-jornada" className="bg-background text-foreground">
      <header className="px-6 sm:px-12 lg:px-20 pt-16 lg:pt-24 pb-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50">
          Sociólogo · trajetória
        </p>
        <h2 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none text-balance max-w-[20ch]">
          Onde cada lugar deixou uma marca.
        </h2>
        <p className="mt-6 text-base sm:text-lg text-foreground/70 text-pretty max-w-[52ch]">
          Da universidade ao campo, cada experiência acrescentou um ramo. Role para acompanhar a
          linha se desenhando até a árvore de habilidades.
        </p>
      </header>

      <div ref={ref} className="relative px-6 sm:px-12 lg:px-20 py-16">
        {/* Linha da jornada, desenhada conforme o scroll */}
        <div className="pointer-events-none absolute inset-y-16 left-6 lg:left-1/2 lg:-translate-x-1/2 w-px">
          <span className="absolute inset-0 bg-foreground/15" />
          <span
            className="absolute left-0 top-0 w-px bg-foreground origin-top"
            style={{ height: `${progresso * 100}%` }}
          />
          <span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-amarelo ring-4 ring-background"
            style={{ top: `${progresso * 100}%` }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto pl-8 lg:pl-0">
          {experiencias.map((exp, i) => (
            <CardExperiencia key={exp.titulo} exp={exp} indice={i} />
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-12 lg:px-20 pb-24">
        <ArvoreHabilidades />
      </div>
    </section>
  );
}
