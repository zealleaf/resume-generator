import {
  Bungee_Spice,
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
})

export const fontMono = FontMono({
  subsets: ["latin"],
})

export const bungeeSpice = Bungee_Spice({
  subsets: ["latin"],
  weight: "400",
})
