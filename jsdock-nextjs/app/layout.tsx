import "./globals.css"
import type { Metadata } from "next"
import { Provider as JotaiProvider } from "jotai"
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/providers/theme-provider"
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google"

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
  title: "JS Dock",
  description: "A browser-based JavaScript playground to run your daily driving JS code without any hassle",
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
        <Analytics />
      </body>
    </html>
  )
}
