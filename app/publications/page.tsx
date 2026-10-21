import type { Metadata } from "next";
import PublicationList from "./PublicationList";

export const metadata: Metadata = {
  title: "Publications",
  description: "Journal articles, conference papers, workshops and working papers by Hyunwoo Park and collaborators.",
  alternates: { canonical: "/publications/" },
};

export default function Publications() {
  return <div className="academic">
    <header className="page-intro"><p className="eyebrow">Papers and research contributions</p><h1>Publications</h1><p className="lead">Journal articles, conference papers, workshop contributions, and working papers.</p></header>
    <PublicationList />
  </div>;
}
