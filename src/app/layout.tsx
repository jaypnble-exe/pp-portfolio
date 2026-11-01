import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Ambient } from "@/components/layout/Ambient";
import { profile } from "@/data/profile";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — Mobile & Web Developer`;
const description = `${profile.role} building React Native apps and Next.js web.`;

// The share image comes from app/opengraph-image.tsx (Next adds the og:image / twitter:image tags).
export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: profile.name, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body>
        <Ambient />
        {children}
      </body>
    </html>
  );
}
