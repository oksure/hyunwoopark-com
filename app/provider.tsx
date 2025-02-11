"use client"

// import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ChakraProvider, createSystem, defaultConfig, Flex, Box } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      colorPalette: 'cyan',
    },
  },
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Flex direction="column" minH="100vh" letterSpacing="tight">
          <Navbar />
          <Box as="main" flex="1">
            {props.children}
          </Box>
          <Footer />
        </Flex>
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


