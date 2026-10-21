import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowRight, LuArrowUpRight, LuPlay } from "react-icons/lu";
import research from "../../src/data/research.json";
import resources from "../../src/data/resources.json";
import ResearchHighlights from "../components/ResearchHighlights";
import { publicationById } from "../../src/lib/publications";

export const metadata: Metadata = {
  title: "Research",
  description: "Research on AI and organizations, human–AI interaction, and learning and evaluation in complex systems.",
  alternates: { canonical: "/research/" },
};

export default function Research() {
  return <div className="academic">
    <header className="page-intro">
      <p className="eyebrow">Questions, methods, and systems</p>
      <h1>Research</h1>
      <p className="lead">{research.intro}</p>
      <nav className="link-row" aria-label="Research themes">
        {research.themes.map((theme, i) => <a className="text-link" href={`#${theme.id}`} key={theme.id}>{i + 1}. {theme.shortTitle}</a>)}
      </nav>
    </header>
    <section className="news-list" aria-label="Recent research news">
      {research.news.map(item => <div className="news-item" key={item.title}><time dateTime={item.date}>{item.date}</time><div><Link href={item.href}><strong>{item.title}</strong></Link><span> · {item.description}</span></div></div>)}
    </section>
    <ResearchHighlights />
    {research.themes.map(theme => <section id={theme.id} className="theme-section" key={theme.id} aria-labelledby={`${theme.id}-heading`}>
      <p className="eyebrow">{theme.question}</p>
      <h2 id={`${theme.id}-heading`}>{theme.title}</h2>
      <p className="lead">{theme.description}</p>
      <ul className="research-list">
        {research.works.filter(work => work.theme === theme.id).map(work => {
          const paper = publicationById(work.publicationId);
          return <li key={work.id} id={work.id}>
            <div className="meta">{paper.venue}{paper.venue.includes(paper.year) ? "" : ` · ${paper.year}`}{paper.status ? ` · ${paper.status}` : ""}</div>
            <h3>{work.title}</h3>
            <p>{work.summary}</p>
            <p>{paper.authors}</p>
            <div className="link-row">
              <Link className="text-link" href={`/publications/#${paper.id}`}>Publication <LuArrowRight aria-hidden="true" /></Link>
              {work.video && <a className="text-link" href={work.video} target="_blank" rel="noreferrer"><LuPlay aria-hidden="true" /> Watch demo</a>}
            </div>
          </li>;
        })}
      </ul>
      <h3 style={{ marginTop: "var(--space-2xl)" }}>Research in progress</h3>
      <ul className="research-list">
        {research.ongoing.filter(item => item.theme === theme.id).map(item => <li key={item.title}>
          <div className="meta">{item.status}</div><h3>{item.title}</h3><p>{item.description}</p>
        </li>)}
      </ul>
    </section>)}
    <section className="section" aria-labelledby="collaborations">
      <div className="section-heading"><h2 id="collaborations">Research collaborations</h2></div>
      <ul className="research-list">
        {research.projects.map(project => <li key={project.title}><div className="meta">{project.partner} · {project.status}</div><h3>{project.title}</h3><p>{project.description}</p></li>)}
      </ul>
    </section>
    <section className="section" aria-labelledby="research-resources">
      <div className="section-heading"><h2 id="research-resources">Systems and resources</h2></div>
      <ul className="resource-list">
        {resources.items.filter(item => item.kind !== "Teaching resource").map(item => <li key={item.id}>
          <div className="meta">{item.kind} · {item.year}</div><h3>{item.name}</h3><p>{item.description}</p>
          {item.link && <a className="text-link" href={item.link} target="_blank" rel="noreferrer">{item.kind === "Open-source software" ? "Source code" : item.id === "great-grave" ? "Watch demonstration" : "Read the paper"} <LuArrowUpRight aria-hidden="true" /></a>}
        </li>)}
      </ul>
    </section>
  </div>;
}
