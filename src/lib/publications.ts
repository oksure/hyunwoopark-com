import journals from "../data/pubs.json";
import conferences from "../data/procs.json";
import working from "../data/working-papers.json";

export type Publication = {
  id: string;
  label?: string;
  title: string;
  authors: string;
  year: string;
  recordType: string;
  venue: string;
  status?: string;
  link?: string;
  demo?: string;
  volume?: string;
  number?: string;
  pages?: string;
  articleNo?: string;
  cvNote?: string;
  top?: string[];
  award?: string[];
};

export const publicationTypes: Record<string, string> = {
  journal: "Journal article",
  conference: "Conference paper",
  findings: "Findings",
  "short-paper": "Short paper / VisNote",
  workshop: "Workshop",
  abstract: "Conference abstract",
  poster: "Poster",
  presentation: "Conference presentation",
  working: "Working paper",
};

export const publications: Publication[] = [
  ...journals.items.map(p => ({ ...p, venue: p.journal })),
  ...conferences.items.map(p => ({ ...p, venue: p.proceedings })),
  ...working.items.map(p => ({ ...p, venue: "Working paper", recordType: "working" })),
].sort((a, b) => Number(b.year) - Number(a.year));

export function publicationById(id: string): Publication {
  const result = publications.find(p => p.id === id);
  if (!result) throw new Error(`Missing publication: ${id}`);
  return result;
}

export function citation(p: Publication): string {
  const issue = p.volume ? ` ${p.volume}${p.number ? `(${p.number})` : ""}` : "";
  const pages = p.pages || p.articleNo;
  return `${p.authors}. (${p.year}). ${p.title}. ${p.venue}${issue}${pages ? `, ${pages}` : ""}.${p.status ? ` ${p.status}.` : ""}${p.link ? ` ${p.link}` : ""}`;
}

export function bibtex(p: Publication): string {
  const escape = (s: string) => s.replace(/\\/g, "\\textbackslash{}").replace(/[{}%&#_]/g, m => `\\${m}`);
  const type = p.recordType === "journal" ? "article" : ["working", "presentation", "poster"].includes(p.recordType) ? "misc" : "inproceedings";
  const venueField = type === "article" ? "journal" : type === "inproceedings" ? "booktitle" : "howpublished";
  const authors = p.authors.split(", ").map(author => {
    const name = author.replace(/\*$/, "");
    const parts = name.match(/^(.*) ([A-Z.]+)$/);
    return parts ? `${parts[1]}, ${parts[2].replace(/\./g, "").split("").map(initial => initial + ".").join(" ")}` : name;
  }).join(" and ");
  const fields: Record<string, string | undefined> = {
    title: p.title, author: authors, year: p.year,
    [venueField]: p.venue, volume: p.volume, number: p.number,
    pages: p.pages?.replace(/(?<=\d)-(?=\d)/g, "--"), eid: p.articleNo,
    note: [p.status, p.cvNote].filter(Boolean).join("; ") || undefined,
    url: p.link,
  };
  return `@${type}{${p.id},\n${Object.entries(fields).filter(([,v]) => v).map(([k,v]) => `  ${k} = {${escape(v!)}},`).join("\n")}\n}`;
}
