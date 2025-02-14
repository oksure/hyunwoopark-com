import Provider from "./provider"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={roboto.className} suppressHydrationWarning>
      <Head />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

function Head() {
  return (
    <>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Hyunwoo Park</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer src="https://umami.hwpark.net/script.js" data-website-id="543f70de-f25c-443c-b307-ad595feea524"></script>
      </head>
    </>
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