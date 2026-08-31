import type { Metadata } from "next"
import BioPage from "./BioClient"

export const metadata: Metadata = {
  title: "Speaker and Media Kit",
  description: "Official short and standard biographies and high-resolution press photos for Hyunwoo Park, Professor at the Graduate School of Data Science, Seoul National University.",
  alternates: { canonical: "/bio/" },
  openGraph: {
    title: "Speaker and Media Kit | Hyunwoo Park",
    description: "Official biographies and high-resolution press photos for Hyunwoo Park, Professor at Seoul National University.",
    siteName: "Hyunwoo Park",
    images: [
      {
        url: "https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Square.png",
        width: 1926,
        height: 1926,
        alt: "Hyunwoo Park",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speaker and Media Kit | Hyunwoo Park",
    description: "Official biographies and high-resolution press photos for Hyunwoo Park, Professor at Seoul National University.",
    images: [
      {
        url: "https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Square.png",
        alt: "Hyunwoo Park",
      },
    ],
  },
}

export default function Page() {
  return <BioPage />
}
