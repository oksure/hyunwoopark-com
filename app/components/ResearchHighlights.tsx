import Link from "next/link";
import { LuArrowRight, LuPlay } from "react-icons/lu";
import research from "../../src/data/research.json";
import { publicationById } from "../../src/lib/publications";

export default function ResearchHighlights() {
  return <section className="section" aria-labelledby="selected-research">
    <div className="section-heading"><h2 id="selected-research">Selected work</h2><Link className="text-link" href="/publications/">All publications <LuArrowRight aria-hidden="true" /></Link></div>
    <div className="works">
      {research.works.filter(work => work.featured).map(work => {
        const paper = publicationById(work.publicationId);
        return <article key={work.id} className={`work${work.image ? "" : " work-text"}`}>
          {work.image && <figure><a href={`#${work.id}`} aria-label={`Read about ${work.title}`}><img className={`work-image${work.imageType === "photo" ? " photo" : ""}`} src={work.image} alt={work.alt} width="800" height="500" loading="lazy" /></a><figcaption>{work.credit}</figcaption></figure>}
          <div className="meta">{paper.venue}{paper.venue.includes(paper.year) ? "" : ` · ${paper.year}`}{paper.status && paper.status !== "Working paper" ? ` · ${paper.status}` : ""}</div>
          <h3><a href={`#${work.id}`}>{work.title}</a></h3><p>{work.summary}</p>
          <div className="link-row"><Link className="text-link" href={`/publications/#${paper.id}`}>Publication <LuArrowRight aria-hidden="true" /></Link>{work.video && <a className="text-link" href={work.video} target="_blank" rel="noreferrer"><LuPlay aria-hidden="true" /> Watch demo</a>}</div>
        </article>;
      })}
    </div>
  </section>;
}
