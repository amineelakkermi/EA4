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
  title: "Portfolio | Développeur Web Front-End & React - EA4",
  description:
    "Découvrez le portfolio de [EA4], développeur web spécialisé en React, Next.js et Tailwind CSS. Création de sites modernes, rapides et optimisés pour le SEO.",
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
  authors: [{ name: "[EA4]" }],
  creator: "[EA4]",
  publisher: "[EA4]",
  openGraph: {
    title: "Portfolio | Développeur Web Front-End & React - [EA4]",
    description:
      "Développeur web passionné par la création d’expériences numériques modernes et performantes avec React et Next.js.",
    url: "https://ea-4.vercel.app",
    siteName: "Portfolio de [EA4]",
   
    locale: "fr_FR",
    type: "website",
  },
 
  
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "B4J_IbpW_NgiKCPNR9zJINqtGP2Gqasl2XLRX_kWi0g",
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
