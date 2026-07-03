"use client"

import { ChakraProvider, createSystem, defaultConfig, Flex, Box } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      colorPalette: '',
    },
    a: {
      textDecoration: 'underline',
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

