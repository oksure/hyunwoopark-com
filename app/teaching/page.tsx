import type { Metadata } from "next";
import { LuArrowUpRight } from "react-icons/lu";
import LegacySections from "../components/LegacySections";
import resources from "../../src/data/resources.json";

export const metadata: Metadata = {
  title: "Teaching & Resources",
  description: "Courses, collaborative teaching materials and research tools by Hyunwoo Park.",
  alternates: { canonical: "/teaching/" },
};

export default function Teaching() {
  return <div className="academic">
    <header className="page-intro"><p className="eyebrow">Courses, materials, and tools</p><h1>Teaching & resources</h1><p className="lead">Teaching connects the analysis of data with the practice of building, interpreting, and questioning computational systems.</p></header>
    <section className="section" aria-labelledby="teaching-resources"><h2 id="teaching-resources">Open resources</h2><ul className="resource-list">
      {resources.items.filter(item => ["Teaching resource", "Open-source software"].includes(item.kind)).map(item => <li key={item.id}><div className="meta">{item.kind} · {item.year}</div><h3>{item.name}</h3><p>{item.description}</p><a className="text-link" href={item.link} target="_blank" rel="noreferrer">{item.kind === "Teaching resource" ? "Read the book" : "Source code"} <LuArrowUpRight aria-hidden="true" /></a></li>)}
    </ul></section>
    <LegacySections sections={["teaching", "books", "software"]} />
  </div>;
}
