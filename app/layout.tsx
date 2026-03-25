import Provider from "./provider"
import Script from "next/script"
import type { Metadata, Viewport } from "next"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['400', '700'],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://hyunwoopark.com"),
  title: {
    default: "Hyunwoo Park - Seoul National University",
    template: "%s | Hyunwoo Park",
  },
  description: "Hyunwoo Park is an Associate Professor at the Graduate School of Data Science, Seoul National University. Research in business analytics, supply chain networks, and technology management.",
  authors: [{ name: "Hyunwoo Park" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Hyunwoo Park",
    title: "Hyunwoo Park - Seoul National University",
    description: "Associate Professor, Graduate School of Data Science, Seoul National University. Research in business analytics, supply chain networks, and technology management.",
    url: "https://hyunwoopark.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Hyunwoo Park - Seoul National University",
    description: "Associate Professor, Graduate School of Data Science, Seoul National University.",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: "Hyunwoo Park",
              givenName: "Hyunwoo",
              familyName: "Park",
              jobTitle: "Associate Professor",
              worksFor: {
                "@type": "Organization",
                name: "Seoul National University",
                url: "https://snu.ac.kr",
              },
              affiliation: {
                "@type": "Organization",
                name: "Graduate School of Data Science, Seoul National University",
                url: "https://gsds.snu.ac.kr",
              },
              url: "https://hyunwoopark.com",
              email: "hyunwoopark@snu.ac.kr",
              image: "https://zzz.sfo3.cdn.digitaloceanspaces.com/y/Profile_HP_20231115_Standing_Square_256.png",
              sameAs: [
                "https://scholar.google.com/citations?user=AbopKDkAAAAJ",
                "https://www.linkedin.com/in/hyunwoo-park-profile/",
                "https://github.com/oksure",
                "https://orcid.org/0000-0001-9818-217X",
                "https://gsds.snu.ac.kr/people-post/hyunwoo-park/",
              ],
            },
          })}}
        />
      </head>
      <body>
        <Provider>{children}</Provider>
        <Script
          src="https://umami.hwpark.net/script.js"
          data-website-id="543f70de-f25c-443c-b307-ad595feea524"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
