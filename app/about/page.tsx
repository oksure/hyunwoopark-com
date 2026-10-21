import type { Metadata } from "next";
import Link from "next/link";
import LegacySections from "../components/LegacySections";

export const metadata: Metadata = {
  title: "About",
  description: "Hyunwoo Park: career, education, awards, research leadership and service.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return <div className="academic">
    <header className="page-intro"><p className="eyebrow">Seoul National University</p><h1>About</h1><p className="lead">I am a Professor at the Graduate School of Data Science and lead the Data Intelligence and Learning Lab (DIAL).</p><div className="link-row"><Link className="text-link" href="/bio/">Speaker & Media Kit</Link><Link className="text-link" href="/bio/resume-ko/">국문 이력서</Link><a className="text-link" href="mailto:hyunwoopark@snu.ac.kr">hyunwoopark@snu.ac.kr</a></div></header>
    <LegacySections sections={["exps", "edus", "awards", "servs", "talks", "confs", "others"]} />
    <section className="section" aria-labelledby="affiliations"><h2 id="affiliations">Profiles and affiliations</h2><div className="link-row" style={{ marginTop: "var(--space-lg)" }}>
      <a className="text-link" href="https://y-kast.or.kr/kr/person/member_search_view.php?idx=242" target="_blank" rel="noreferrer">Y-KAST profile</a>
      <a className="text-link" href="https://www.linkedin.com/company/informs-times/" target="_blank" rel="noreferrer">INFORMS TIMES</a>
      <a className="text-link" href="https://www.jom-hub.com/editorial-team" target="_blank" rel="noreferrer">Journal of Operations Management</a>
      <a className="text-link" href="https://onlinelibrary.wiley.com/page/journal/15405915/homepage/editorialboard.html" target="_blank" rel="noreferrer">Decision Sciences</a>
    </div></section>
  </div>;
}
