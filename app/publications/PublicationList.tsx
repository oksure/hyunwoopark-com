"use client";

import { useMemo, useState } from "react";
import { LuCheck, LuCopy, LuExternalLink, LuPlay } from "react-icons/lu";
import { publications, publicationTypes, citation, bibtex, type Publication } from "../../src/lib/publications";

function Authors({ value }: { value: string }) {
  return <>{value.split(", ").map((author, i) => <span key={`${author}-${i}`}>{i > 0 ? ", " : ""}{/^Park H\*?$/.test(author) ? <strong>{author}</strong> : author}</span>)}</>;
}

function CopyCitation({ paper }: { paper: Publication }) {
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [format, setFormat] = useState("text");
  const text = format === "bibtex" ? bibtex(paper) : citation(paper);
  async function copy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); }
    catch { setShow(true); }
  }
  return <div className="citation">
    <div className="publication-links">
      <button type="button" className="copy-button" onClick={copy} title={`Copy ${format === "bibtex" ? "BibTeX" : "citation"}`} aria-label={`Copy citation for ${paper.title}`}>{copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}{copied ? "Copied" : "Copy citation"}</button>
      <button type="button" className="copy-button" aria-expanded={show} aria-controls={`citation-${paper.id}`} onClick={() => setShow(!show)}>{show ? "Hide citation" : "Citation / BibTeX"}</button>
      <span role="status" aria-live="polite" className="sr-only">{copied ? "Citation copied to clipboard" : ""}</span>
    </div>
    {show && <div id={`citation-${paper.id}`} style={{ marginTop: "var(--space-md)" }}>
      <label htmlFor={`format-${paper.id}`}>Citation format</label>
      <select id={`format-${paper.id}`} value={format} onChange={e => { setFormat(e.target.value); setCopied(false); }}><option value="text">Plain text</option><option value="bibtex">BibTeX</option></select>
      <textarea aria-label={`Citation for ${paper.title}`} readOnly value={text} onFocus={e => e.currentTarget.select()} />
    </div>}
  </div>;
}

export default function PublicationList() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [kind, setKind] = useState("all");
  const years = [...new Set(publications.map(p => p.year))].sort((a, b) => Number(b) - Number(a));
  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return publications.filter(p => (year === "all" || p.year === year) && (kind === "all" || p.recordType === kind) && terms.every(term => `${p.title} ${p.authors} ${p.venue} ${p.year} ${p.status || ""}`.toLowerCase().includes(term)));
  }, [query, year, kind]);
  return <>
    <div className="filter-bar" role="search" aria-label="Find publications">
      <label htmlFor="publication-query">Search<input id="publication-query" type="search" placeholder="Title, author, or venue" value={query} onChange={e => setQuery(e.target.value)} /></label>
      <label htmlFor="publication-type">Contribution type<select id="publication-type" value={kind} onChange={e => setKind(e.target.value)}><option value="all">All types</option>{Object.entries(publicationTypes).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
      <label htmlFor="publication-year">Year<select id="publication-year" value={year} onChange={e => setYear(e.target.value)}><option value="all">All years</option>{years.map(item => <option key={item}>{item}</option>)}</select></label>
    </div>
    <p className="publication-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "record" : "records"}{(query || year !== "all" || kind !== "all") && <> · <button type="button" className="copy-button" onClick={() => { setQuery(""); setYear("all"); setKind("all"); }}>Clear filters</button></>}</p>
    {filtered.length === 0 && <div className="empty-state"><h2>No matching publications</h2><p>Try another title, author, or venue.</p></div>}
    <ol className="publication-list">
      {filtered.map(p => <li className="publication" id={p.id} key={p.id}>
        <div className="publication-label">{p.label || "WP"}</div>
        <article>
          <div className="meta">{p.year} · {publicationTypes[p.recordType]}{p.status ? ` · ${p.status}` : ""}</div>
          <h2>{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.title}</a> : p.title}</h2>
          <p><Authors value={p.authors} /></p>
          <p className="muted"><em>{p.venue}</em>{p.volume ? `, ${p.volume}` : ""}{p.number ? `(${p.number})` : ""}{p.pages ? `, ${p.pages}` : ""}{p.articleNo ? `, article ${p.articleNo}` : ""}</p>
          {p.cvNote && <p>{p.cvNote}</p>}
          {p.award?.length ? <p>{p.award.join(" · ")}</p> : null}
          {p.top?.length ? <p className="muted">{p.top.join(" · ").toUpperCase()}</p> : null}
          <div className="publication-links">
            {p.link && <a href={p.link} target="_blank" rel="noreferrer">Paper <LuExternalLink style={{ display: "inline" }} aria-hidden="true" /></a>}
            {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Demo <LuPlay style={{ display: "inline" }} aria-hidden="true" /></a>}
          </div>
          <CopyCitation paper={p} />
        </article>
      </li>)}
    </ol>
  </>;
}
