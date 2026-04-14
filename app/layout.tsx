import type { Metadata } from "next";
import { Geist, Geist_Mono, Epilogue, Manrope, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import CommandCenter from "./components/CommandCenter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const fontSuperFunky = localFont({
  src: "./fonts/Super-Funky.ttf",
  variable: "--font-super-funky",
});

export const metadata: Metadata = {
  title: "Harsh Bhadana | Senior Frontend Developer",
  description: "Professional portfolio of Harsh Bhadana, a Senior Frontend Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontSuperFunky.variable} ${epilogue.variable} ${manrope.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <LoadingScreen />
          <CommandCenter />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
