import type { Metadata } from "next";
import { Geist, Geist_Mono, Bangers, Chewy, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontBangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const fontChewy = Chewy({
  weight: "400",
  variable: "--font-chewy",
  subsets: ["latin"],
});

const fontLuckiest = Luckiest_Guy({
  weight: "400",
  variable: "--font-luckiest",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${fontBangers.variable} ${fontChewy.variable} ${fontLuckiest.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
