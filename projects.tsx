import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Achievements — Sen. Kawu Sumaila OFR" },
      { name: "description", content: "Legislative achievements, sponsored motions and committee leadership of Senator Kawu Sumaila across the House of Representatives and the 10th Senate." },
      { property: "og:title", content: "Achievements — Sen. Kawu Sumaila OFR" },
      { property: "og:description", content: "Legislative work and committee leadership from the office of Sen. Kawu Sumaila." },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            The Record
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-tight md:text-6xl">
            Achievements & legislative work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-secondary-foreground/80">
            From the 6th House of Representatives to the 10th Senate — bills
            sponsored, motions moved, and committees led on behalf of the
            people of Kano South.
          </p>
        </div>
        <div className="flag-stripe" />
      </section>

      <section className="container-page py-20">
        <div className="flex flex-col gap-20">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {p.category}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                  {p.title}
                </h2>
                <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {p.period}
                </p>
                <p className="mt-5 text-lg leading-relaxed text-foreground/85">
                  {p.summary}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {p.impact.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-20 max-w-3xl text-xs text-muted-foreground">
          Biographical and legislative details summarised from public records,
          including the Senator's Wikipedia entry. For an official record of
          bills and motions, please contact the office.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
