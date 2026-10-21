"use client"

import { IconButton } from "@chakra-ui/react"
import { useTheme } from "next-themes"
import { LuMoon, LuSun } from "react-icons/lu"

export function ColorModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }
  return (
    <IconButton variant="ghost" aria-label="toggle color mode" onClick={toggleColorMode}>
      {resolvedTheme === "light" ? <LuMoon /> : <LuSun />}
    </IconButton>
  )
}
