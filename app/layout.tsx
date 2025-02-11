import { Inter } from "next/font/google"
import Provider from "./provider"
import Head from "./head"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <Head />
      <body>
        <Provider>{children}</Provider>
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