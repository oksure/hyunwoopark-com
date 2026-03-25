import type { Metadata } from "next"
import BioPage from "./BioClient"

export const metadata: Metadata = {
  title: "Bio and Photo",
  description: "Biography and professional photos for Hyunwoo Park, Associate Professor at the Graduate School of Data Science, Seoul National University.",
  openGraph: {
    title: "Bio and Photo | Hyunwoo Park",
    description: "Biography and professional photos for Hyunwoo Park, Associate Professor at Seoul National University.",
    siteName: "Hyunwoo Park",
  },
}

export default function Page() {
  return <BioPage />
}
