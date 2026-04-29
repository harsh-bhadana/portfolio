import type { Metadata } from "next";
import { Geist, Geist_Mono, Epilogue, Manrope, Space_Grotesk, Dancing_Script } from "next/font/google";
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

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const fontSuperFunky = localFont({
  src: "./fonts/Super-Funky.ttf",
  variable: "--font-super-funky",
});

export const metadata: Metadata = {
  title: "Harsh Bhadana | Senior Frontend Architect",
  description: "Senior Frontend Architect specializing in high-performance web ecosystems, security protocols, and immersive UI/UX. Exploring the boundaries of Next.js 16 and React 19.",
  keywords: ["Frontend Architect", "Next.js 16", "React 19", "Web Performance", "Portfolio", "Harsh Bhadana"],
  authors: [{ name: "Harsh Bhadana" }],
  openGraph: {
    title: "Harsh Bhadana | Senior Frontend Architect",
    description: "Professional portfolio and engineering laboratory of Harsh Bhadana.",
    url: "https://harshbhadana.com",
    siteName: "Harsh Bhadana Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Bhadana | Senior Frontend Architect",
    description: "Professional portfolio and engineering laboratory of Harsh Bhadana.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fontSuperFunky.variable} ${epilogue.variable} ${manrope.variable} ${spaceGrotesk.variable} ${dancingScript.variable} antialiased`}
      >
        <ThemeProvider>
          <LoadingScreen />
          <CommandCenter />
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Harsh Bhadana",
                "jobTitle": "Senior Frontend Architect",
                "url": "https://harshbhadana.com",
                "sameAs": [
                  "https://github.com/harsh-bhadana",
                  "https://linkedin.com/in/harsh-bhadana"
                ]
              })
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
