import Provider from "./provider"
import Script from "next/script"
import type { Metadata, Viewport } from "next"

import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['400', '700'], // Add weights as needed
  display: "swap",
});

import { Noto_Sans_KR } from "next/font/google";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ['400', '700'], // Example weights - adjust as needed
  display: "swap",
});

import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700'], // Example weights - adjust as needed
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hyunwoo Park - Seoul National University",
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
    <html className={roboto.className} suppressHydrationWarning>
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

// import Provider from "./provider"

// export default function RootLayout(props: { children: React.ReactNode }) {
//   const { children } = props
//   return (
//     <html suppressHydrationWarning>
//       <body>
//         <Provider>{children}</Provider>
//       </body>
//     </html>
//   )
// }
