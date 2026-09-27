import { Arrow, Button, Label } from "@/components/ui";
import { projects } from "@/lib/content";

/* siteassist.com "Industries" grid: centred label, heading and copy, then square photo cards (8px radius) with the
   title laid over the top-left. The three featured projects are the live homepage's; the index strip below lists
   every project from the live Projects menu. */
export default function Projects() {
  return (
    <section className="projects wrap" id="projects" aria-labelledby="projects-title">
      <div className="projects__head">
        <Label>Featured work</Label>
        <h2 id="projects-title" className="display" data-reveal="label">{projects.title}</h2>
        <p className="body projects__body" data-reveal="card">{projects.body}</p>
      </div>

      <ul className="projects__grid">
        {projects.items.map((p) => (
          <li key={p.href} data-reveal="card">
            <a className="project" href={p.href}>
              <img src={p.image} alt="" loading="lazy" />
              <span className="project__shade" aria-hidden="true" />
              <span className="project__place">{p.place}</span>
              <span className="project__title">{p.title}</span>
              <span className="project__more">Find out more <Arrow /></span>
            </a>
          </li>
        ))}
      </ul>

      <div className="projects__index" data-reveal="card">
        <p className="label">All projects</p>
        <ul>
          {projects.all.map((p) => <li key={p.href}><a href={p.href}>{p.label}</a></li>)}
        </ul>
        <Button href={projects.cta.href}>{projects.cta.label}</Button>
      </div>
    </section>
  );
}
