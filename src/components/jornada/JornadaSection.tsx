import { MapaJornada } from "./MapaJornada";
import { ArvoreHabilidades } from "./ArvoreHabilidades";

export function JornadaSection() {
  return (
    <section id="minha-jornada" className="bg-background text-foreground">
      <header className="px-6 sm:px-12 lg:px-20 pt-16 lg:pt-24 pb-10">
        <p className="font-pixel text-sm uppercase tracking-[0.25em] text-foreground/55">
          Sociólogo · trajetória
        </p>
        <h2 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none text-balance max-w-[20ch]">
          Onde cada lugar deixou uma marca.
        </h2>
        <p className="mt-6 text-base sm:text-lg text-foreground/70 text-pretty max-w-[52ch]">
          Da universidade ao campo, cada experiência acrescentou um ramo. Role a página e acompanhe o
          personagem viajando por cada cidade até a árvore de habilidades.
        </p>
      </header>

      <div className="relative px-4 sm:px-8 lg:px-20 py-10">
        <MapaJornada />
      </div>

      <div className="px-6 sm:px-12 lg:px-20 pb-24">
        <ArvoreHabilidades />
      </div>
    </section>
  );
}
