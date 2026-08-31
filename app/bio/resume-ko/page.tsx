import type { Metadata } from "next"
import KrCvClient from "./KrCvClient"

export const metadata: Metadata = {
  title: "Korean CV",
  description: "Korean curriculum vitae for Hyunwoo Park, Professor at the Graduate School of Data Science, Seoul National University.",
  alternates: { canonical: "/bio/resume-ko/" },
}

export default function Page() {
  return <KrCvClient />
}
