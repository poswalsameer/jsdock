import "./globals.css"
import type { Metadata } from "next"
import { Provider as JotaiProvider } from "jotai"
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/providers/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "JS Playground",
  description: "A browser-based JavaScript playground",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground h-screen w-screen overflow-hidden`}
      >
        <JotaiProvider>
          <ThemeProvider />
          {children}
        </JotaiProvider>
      </body>
    </html>
  )
}
