import { createFileRoute } from "@tanstack/react-router";
import { JornadaSection } from "@/components/jornada/JornadaSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Minha Jornada · Jelder Eric" },
      {
        name: "description",
        content:
          "A trajetória de Jelder Eric, sociólogo: da pesquisa na UnB à conservação no Cerrado, em uma jornada interativa por suas experiências.",
      },
      { property: "og:title", content: "Minha Jornada · Jelder Eric" },
      {
        property: "og:description",
        content:
          "Uma jornada interativa pela carreira e pelas experiências de Jelder Eric.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Sidebar preta fixa (desktop) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col justify-between bg-sidebar text-sidebar-foreground px-8 py-10 z-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-sidebar-foreground/50">
            Portfólio
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-none text-balance">
            Minha
            <br />
            Jornada
          </h1>
          <p className="mt-4 text-sm text-sidebar-foreground/60 text-pretty">
            Uma jornada por experiências que conectam pesquisa, gestão pública e conservação.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-amarelo shrink-0" />
          <p className="text-[11px] uppercase tracking-[0.2em] text-sidebar-foreground/50">
            2011 — 2026
          </p>
        </div>
      </aside>

      <main className="lg:pl-64">
        <JornadaSection />
      </main>
    </div>
  );
}
