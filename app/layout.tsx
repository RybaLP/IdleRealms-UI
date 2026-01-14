import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Idle Realms | Become a Legend",
  description: "Embark on an epic journey in the world of Idle Realms. Develop your hero, fight tavern monsters, and collect legendary gear in this classic RPG experience.",
  keywords: ["idle game", "rpg", "browser game", "fantasy", "idle realms", "adventure"],
  openGraph: {
    title: "Idle Realms - Click, Fight, Conquer!",
    description: "The most addictive Idle RPG. Create your account and start your adventure today!",
    // url: "https://your-domain.com",
    siteName: "Idle Realms",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
