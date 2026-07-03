// scripts/generate-cv.tsx
//
// Generates public/cv.pdf directly from src/data/*.json so the downloadable CV
// never drifts from the data that drives the website itself.
//
// Run with: pnpm generate:cv  (wraps `tsx scripts/generate-cv.tsx`)
// Wired into `pnpm build` via the `prebuild` script in package.json.

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import expsData from "../src/data/exps.json";
import edusData from "../src/data/edus.json";
import pubsData from "../src/data/pubs.json";
import procsData from "../src/data/procs.json";
import awardsData from "../src/data/awards.json";
import teachingData from "../src/data/teaching.json";
import servsData from "../src/data/servs.json";
import talksData from "../src/data/talks.json";
import confsData from "../src/data/confs.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "public", "cv.pdf");

// ---------------------------------------------------------------------------
// Site identity (mirrors app/components/Sidebar.tsx / app/layout.tsx)
// ---------------------------------------------------------------------------
const NAME = "Hyunwoo Park";
const TITLE = "Associate Professor, Graduate School of Data Science";
const AFFILIATION = "Seoul National University";
const EMAIL = "hyunwoopark@snu.ac.kr";
const HOMEPAGE = "https://hyunwoopark.com";

const BUILD_DATE = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

// ---------------------------------------------------------------------------
// Styles — single Helvetica family, 10pt body, dark-gray accents only
// ---------------------------------------------------------------------------
const COLOR_TEXT = "#1a1a1a";
const COLOR_MUTED = "#555555";
const COLOR_RULE = "#999999";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 56,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: COLOR_TEXT,
    lineHeight: 1.35,
  },
  // Header
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  headerLine: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
    color: COLOR_MUTED,
  },
  headerRule: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_RULE,
    marginTop: 10,
    marginBottom: 14,
  },
  // Sections
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12.5,
    textTransform: "uppercase",
    letterSpacing: 0.75,
    marginBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: COLOR_RULE,
    paddingBottom: 3,
  },
  subheading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    marginTop: 6,
    marginBottom: 2,
  },
  yearHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginTop: 5,
    marginBottom: 3,
  },
  // Generic row
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bullet: {
    width: 10,
    color: COLOR_MUTED,
  },
  rowBody: {
    flex: 1,
  },
  // Publications / proceedings
  numberedRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  numberCol: {
    width: 34,
    textAlign: "right",
    marginRight: 6,
    color: COLOR_MUTED,
  },
  pubTitle: {
    fontFamily: "Helvetica-Bold",
  },
  pubMeta: {
    marginTop: 1,
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
  },
  tag: {
    fontSize: 8,
    color: COLOR_MUTED,
    marginTop: 1,
  },
  // Institution blocks (experience / education / teaching)
  instBlock: {
    marginBottom: 8,
  },
  instName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    marginBottom: 2,
  },
  detailLine: {
    marginLeft: 10,
    marginBottom: 1.5,
  },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Bold "Park H" wherever it appears in an author string, mirroring app/page.tsx. */
const AuthorLine = ({ authors }: { authors: string }) => {
  if (!authors || !authors.includes("Park H")) {
    return <Text>{authors}</Text>;
  }
  const segments = authors.split("Park H");
  return (
    <Text>
      {segments.map((segment, i) => (
        <Text key={i}>
          {segment}
          {i < segments.length - 1 && <Text style={styles.pubTitle}>Park H</Text>}
        </Text>
      ))}
    </Text>
  );
};

const TOP_LABELS: Record<string, string> = {
  utd24: "UTD24",
  ft50: "FT50",
  abs: "ABS",
  "abs4*": "ABS4*",
  abs4: "ABS4",
  abs3: "ABS3",
  "top cs": "TOP CS",
};

const SectionTitle = ({ children }: { children: string }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

// ---------------------------------------------------------------------------
// Document
// ---------------------------------------------------------------------------

const CVDocument = () => {
  const pubItems = pubsData.items as any[];
  const procItems = procsData.items as any[];

  return (
    <Document
      title={`${NAME} - Curriculum Vitae`}
      author={NAME}
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={styles.page} wrap>
        {/* ----------------------------------------------------------- Header */}
        <Text style={styles.name}>{NAME.toUpperCase()}</Text>
        <Text style={styles.headerLine}>
          {TITLE}, {AFFILIATION}
        </Text>
        <Text style={styles.headerLine}>
          {EMAIL} | {HOMEPAGE}
        </Text>
        <View style={styles.headerRule} />

        {/* ----------------------------------------------------------- Employment */}
        <View style={styles.section}>
          <SectionTitle>Employment</SectionTitle>
          {(expsData.items as any[]).map((item, idx) => (
            <View key={idx} style={styles.instBlock}>
              <Text style={styles.instName}>{item.institution}</Text>
              {item.details.map((detail: string, i: number) => (
                <Text key={i} style={styles.detailLine}>
                  {detail}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* ----------------------------------------------------------- Education */}
        <View style={styles.section}>
          <SectionTitle>Education</SectionTitle>
          {(edusData.items as any[]).map((item, idx) => (
            <View key={idx} style={styles.instBlock}>
              <Text style={styles.instName}>{item.institution}</Text>
              {item.details.map((detail: string, i: number) => (
                <Text key={i} style={styles.detailLine}>
                  {detail}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* ----------------------------------------------------------- Publications */}
        <View style={styles.section}>
          <SectionTitle>Publications</SectionTitle>
          <Text style={styles.subheading}>Journal Articles</Text>
          {pubItems.map((item, idx) => {
            const jNumber = pubItems.length - idx; // mirrors app/page.tsx numbering
            return (
              <View key={idx} style={styles.numberedRow} wrap={false}>
                <Text style={styles.numberCol}>[J{jNumber}]</Text>
                <View style={styles.rowBody}>
                  <Text style={styles.pubTitle}>{item.title}</Text>
                  <Text style={styles.pubMeta}>
                    <AuthorLine authors={item.authors} /> ({item.year}).{" "}
                    <Text style={styles.italic}>{item.journal}</Text>
                    {item.volume ? `, ${item.volume}` : null}
                    {item.number ? `(${item.number})` : null}
                    {item.pages ? `, pp. ${item.pages}` : null}.
                  </Text>
                  {item.top && item.top.length > 0 && (
                    <Text style={styles.tag}>
                      {item.top.map((t: string) => TOP_LABELS[t] || t.toUpperCase()).join(" · ")}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}

          <Text style={styles.subheading}>Conference Proceedings</Text>
          {procItems.map((item, idx) => {
            const cNumber = procItems.length - idx; // mirrors app/page.tsx numbering
            return (
              <View key={idx} style={styles.numberedRow} wrap={false}>
                <Text style={styles.numberCol}>[C{cNumber}]</Text>
                <View style={styles.rowBody}>
                  <Text style={styles.pubTitle}>{item.title}</Text>
                  <Text style={styles.pubMeta}>
                    <AuthorLine authors={item.authors} /> ({item.year}).{" "}
                    <Text style={styles.italic}>{item.proceedings}</Text>
                    {item.pages ? `, pp. ${item.pages}` : null}.
                  </Text>
                  {item.award && item.award.length > 0 && (
                    <Text style={styles.tag}>{item.award.join(" · ")}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* ----------------------------------------------------------- Conference Presentations */}
        <View style={styles.section}>
          <SectionTitle>Conference Presentations</SectionTitle>
          {(() => {
            const years = [
              ...new Set(
                (confsData.items as any[]).flatMap((item) =>
                  item.conferences.map((c: any) => c.year)
                )
              ),
            ].sort((a: any, b: any) => Number(b) - Number(a));

            return years.map((year) => {
              const confsForYear = (confsData.items as any[]).flatMap((item) =>
                item.conferences
                  .filter((c: any) => c.year === year)
                  .map((c: any) => ({ name: c.name, location: c.location }))
              );
              const groupMap = new Map<string, true>();
              confsForYear.forEach(({ name, location }) => {
                groupMap.set(`${name}///${location || ""}`, true);
              });
              const confGroups = Array.from(groupMap.keys()).sort((a, b) =>
                a.split("///")[0].localeCompare(b.split("///")[0])
              );

              return (
                <View key={year} wrap={false} style={{ marginBottom: 4 }}>
                  <Text style={styles.yearHeading}>{year}</Text>
                  {confGroups.map((key, i) => {
                    const [confName, confLocation] = key.split("///");
                    return (
                      <View key={i} style={styles.row}>
                        <Text style={styles.bullet}>{"•"}</Text>
                        <Text style={styles.rowBody}>
                          {confName}
                          {confLocation ? `, ${confLocation}` : null}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            });
          })()}
        </View>

        {/* ----------------------------------------------------------- Invited Talks */}
        <View style={styles.section}>
          <SectionTitle>Invited Talks</SectionTitle>
          {(() => {
            const years = [
              ...new Set((talksData.items as any[]).map((t) => t.year)),
            ].sort((a: any, b: any) => Number(b) - Number(a));
            return years.map((year) => (
              <View key={year} wrap={false} style={{ marginBottom: 4 }}>
                <Text style={styles.yearHeading}>{year}</Text>
                {(talksData.items as any[])
                  .filter((t) => t.year === year)
                  .map((t, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={styles.bullet}>{"•"}</Text>
                      <Text style={styles.rowBody}>{t.institution}</Text>
                    </View>
                  ))}
              </View>
            ));
          })()}
        </View>

        {/* ----------------------------------------------------------- Grants & Awards */}
        <View style={styles.section}>
          <SectionTitle>Grants &amp; Awards</SectionTitle>
          {["grant", "award", "fellowship"].map((sectionType) => {
            const items = (awardsData.items as any[]).filter(
              (item) => item.type === sectionType
            );
            if (items.length === 0) return null;
            const heading =
              sectionType === "award"
                ? "Awards and Honors"
                : sectionType.charAt(0).toUpperCase() + sectionType.slice(1) + "s";
            return (
              <View key={sectionType} style={{ marginBottom: 6 }}>
                <Text style={styles.subheading}>{heading}</Text>
                {items.map((item, i) => (
                  <View key={i} style={styles.row} wrap={false}>
                    <Text style={styles.bullet}>{"•"}</Text>
                    <Text style={styles.rowBody}>
                      {item.special ? (
                        <Text style={styles.pubTitle}>{item.title}</Text>
                      ) : (
                        item.title
                      )}
                      {item.awarder ? `, ${item.awarder}` : null}
                      {item.year ? `, ${item.year}` : null}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>

        {/* ----------------------------------------------------------- Teaching */}
        <View style={styles.section}>
          <SectionTitle>Teaching</SectionTitle>
          {(teachingData.items as any[]).map((inst, idx) => (
            <View key={idx} style={styles.instBlock}>
              <Text style={styles.instName}>{inst.institution}</Text>
              {inst.courses.map((course: any, cIdx: number) => (
                <View key={cIdx} style={{ marginBottom: 3 }}>
                  <Text style={{ marginLeft: 8, fontFamily: "Helvetica-Bold", fontSize: 9.5 }}>
                    {course.role}
                  </Text>
                  {course.details.map((detail: string, dIdx: number) => (
                    <View key={dIdx} style={styles.row}>
                      <Text style={[styles.bullet, { marginLeft: 8 }]}>{"•"}</Text>
                      <Text style={styles.rowBody}>{detail}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* ----------------------------------------------------------- Service */}
        <View style={styles.section}>
          <SectionTitle>Service</SectionTitle>
          {(servsData.items as any[]).map((serviceItem, sIdx) => (
            <View key={sIdx} style={styles.instBlock}>
              <Text style={styles.instName}>{serviceItem.title}</Text>
              {serviceItem.details.map((detail: any, dIdx: number) => {
                if (typeof detail === "string") {
                  return (
                    <View key={dIdx} style={styles.row}>
                      <Text style={[styles.bullet, { marginLeft: 8 }]}>{"•"}</Text>
                      <Text style={styles.rowBody}>{detail}</Text>
                    </View>
                  );
                }
                return (
                  <View key={dIdx} style={{ marginBottom: 3 }}>
                    <Text style={{ marginLeft: 8, fontFamily: "Helvetica-Bold", fontSize: 9.5 }}>
                      {detail.category}
                    </Text>
                    {(serviceItem.title === "Ad-hoc Reviewer" &&
                      (detail.category === "Journals" || detail.category === "Conferences")) ||
                    (serviceItem.title === "Membership" && detail.category === "Korean") ? (
                      <View style={styles.row}>
                        <Text style={[styles.bullet, { marginLeft: 8 }]}>{"•"}</Text>
                        <Text style={styles.rowBody}>{detail.subdetails.join(", ")}</Text>
                      </View>
                    ) : (
                      detail.subdetails.map((sub: string, subIdx: number) => (
                        <View key={subIdx} style={styles.row}>
                          <Text style={[styles.bullet, { marginLeft: 8 }]}>{"•"}</Text>
                          <Text style={styles.rowBody}>{sub}</Text>
                        </View>
                      ))
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
};

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
//
// NOTE: page-number footers are added via a pdf-lib post-processing pass
// rather than react-pdf's `fixed` + `render={({pageNumber,totalPages}) => ...}`
// mechanism. That dynamic-render-on-fixed-element combination triggers a
// reproducible upstream bug in @react-pdf/render 4.5.1 ("Error: unsupported
// number: -7.96e21" inside PDFDocument.transform/clipBorderTop) once the
// document grows past a handful of pages — confirmed by bisection: removing
// `render` (even ignoring its arguments) fixes it, while removing borders,
// `break`, or empty-string children does not. Post-processing with pdf-lib
// sidesteps the buggy two-pass measurement entirely and is the standard
// workaround for this class of react-pdf issue.
async function main() {
  const baseBuffer = await renderToBuffer(<CVDocument />);

  const pdfDoc = await PDFDocument.load(baseBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;
  const footerSize = 8;
  const footerColor = rgb(0.33, 0.33, 0.33); // matches COLOR_MUTED #555555
  const ruleColor = rgb(0.6, 0.6, 0.6); // matches COLOR_RULE #999999

  pages.forEach((page, idx) => {
    const { width } = page.getSize();
    const footerText = `${NAME} — Page ${idx + 1} of ${totalPages} — Last updated: ${BUILD_DATE}`;
    const textWidth = font.widthOfTextAtSize(footerText, footerSize);

    // Thin rule above the footer text, matching the site's border-top footer style.
    page.drawLine({
      start: { x: 56, y: 40 },
      end: { x: width - 56, y: 40 },
      thickness: 0.5,
      color: ruleColor,
    });
    page.drawText(footerText, {
      x: (width - textWidth) / 2,
      y: 28,
      size: footerSize,
      font,
      color: footerColor,
    });
  });

  const finalBytes = await pdfDoc.save();
  writeFileSync(OUTPUT_PATH, finalBytes);
  console.log(`[generate-cv] wrote ${OUTPUT_PATH} (${totalPages} pages)`);
}

main().catch((err) => {
  console.error("[generate-cv] failed:", err);
  process.exit(1);
});
