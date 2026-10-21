import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p><strong>Hyunwoo Park</strong></p>
          <p>Seoul National University</p>
          <p><a href="mailto:hyunwoopark@snu.ac.kr">hyunwoopark@snu.ac.kr</a></p>
          <p className="copyright">© {new Date().getFullYear()} Hyunwoo Park</p>
        </div>
        <div className="footer-links">
          <a href="https://dial.snu.ac.kr/" target="_blank" rel="noreferrer">DIAL Lab</a>
          <a href="https://gsds.snu.ac.kr/" target="_blank" rel="noreferrer">SNU Data Science</a>
          <Link href="/bio/">Speaker & Media Kit</Link>
          <a href="https://scholar.google.com/citations?user=AbopKDkAAAAJ" target="_blank" rel="noreferrer">Google Scholar</a>
          <a href="https://orcid.org/0000-0001-9818-217X" target="_blank" rel="noreferrer">ORCID</a>
          <a href="https://github.com/oksure" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://connect.informs.org/times/home" target="_blank" rel="noreferrer">INFORMS TIMES</a>
          <Link href="/netview/">NetView</Link>
        </div>
      </div>
    </footer>
  );
}
