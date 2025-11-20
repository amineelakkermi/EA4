import type { Metadata } from "next";
import { Josefin_Sans, Poppins , Kufam } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";



export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})


export const kufam = Kufam({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kufam",
})



export const metadata: Metadata = {
  title: "Portfolio | Développeur Web Front-End & React - [Ton Nom]",
  description:
    "Découvrez le portfolio de [Ton Nom], développeur web spécialisé en React, Next.js et Tailwind CSS. Création de sites modernes, rapides et optimisés pour le SEO.",
  keywords: [
    "développeur web",
    "frontend developer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "portfolio développeur",
    "création de site web",
    "freelance web",
    "JavaScript",
    "intégration web",
  ],
  authors: [{ name: "[Ton Nom]" }],
  creator: "[Ton Nom]",
  publisher: "[Ton Nom]",
  openGraph: {
    title: "Portfolio | Développeur Web Front-End & React - [Ton Nom]",
    description:
      "Développeur web passionné par la création d’expériences numériques modernes et performantes avec React et Next.js.",
    url: "https://ton-site.vercel.app",
    siteName: "Portfolio de [Ton Nom]",
    images: [
      {
        url: "https://ton-site.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aperçu du portfolio de [Ton Nom]",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elakkermi Amine | Portfolio",
    description:
      "Portfolio de [Ton Nom], développeur web spécialisé en React, Next.js et Tailwind CSS.",
    creator: "@TonPseudoTwitter",
    images: ["https://ton-site.vercel.app/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const fontClass = poppins.className;

  return (
    <html lang="en">
      <body
        className={`${fontClass} ${poppins.variable} ${kufam.variable} antialiased`}
      >
        <Cursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
