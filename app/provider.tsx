"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}

// 'use client'

// import { 
//   ChakraProvider, 
//   createSystem,
//   defaultConfig 
// } from '@chakra-ui/react'
// import type { PropsWithChildren } from 'react'
// import { ColorModeProvider } from './color-mode'

// const system = createSystem(defaultConfig, {
//   globalCss: {
//     body: {
//       colorPalette: 'blue',
//     },
//   },
//   theme: {
//     tokens: {
//       fonts: {
//         body: { value: 'var(--font-geist)' },
//       },
//     },
//     semanticTokens: {
//       radii: {
//         l1: { value: '0.125rem' },
//         l2: { value: '0.25rem' },
//         l3: { value: '0.375rem' },
//       },
//     },
//   },
// })

// export const Provider = (props: PropsWithChildren) => (
//   <ChakraProvider value={system}>
//     <ColorModeProvider>
//       {props.children}
//     </ColorModeProvider>
//   </ChakraProvider>
// )


