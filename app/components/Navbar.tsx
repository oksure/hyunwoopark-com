"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuArrowUpRight, LuDownload, LuMenu, LuX } from "react-icons/lu";
import { ColorModeButton } from "../../components/ui/color-mode";

const links = [["Research", "/research/"], ["Publications", "/publications/"], ["Teaching", "/teaching/"], ["About", "/about/"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="nav-inner">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>Hyunwoo Park</Link>
        <nav id="primary-navigation" aria-label="Main navigation" className={`nav-links${open ? " is-open" : ""}`}>
          {links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname.replace(/\/$/, "") === href.replace(/\/$/, "") ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
          <a href="https://dial.snu.ac.kr/" target="_blank" rel="noreferrer">DIAL <LuArrowUpRight style={{ display: "inline" }} aria-hidden="true" /></a>
        </nav>
        <div className="nav-controls">
          <a className="cv-link" href="https://zzz.sfo3.cdn.digitaloceanspaces.com/y/CV%20Hyunwoo%20Park.pdf" target="_blank" rel="noreferrer" title="Download academic CV (PDF)"><LuDownload aria-hidden="true" /> CV</a>
          <ColorModeButton title="Switch light or dark theme" />
          <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <LuX /> : <LuMenu />}</button>
        </div>
      </div>
    </header>
  );
}
