import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./language.css";
import "./mockup/upload.css";
import "./contact-analytics.css";
import "./admin-link.css";
import "./whatsapp.css";
import "./catalogue-details.css";
import { ArtStore } from "@/components/art-store";
import { LanguageProvider } from "@/components/language-provider";
import { AnalyticsTracker } from "@/components/analytics";
const sans=DM_Sans({subsets:["latin"],variable:"--sans"}); const display=Playfair_Display({subsets:["latin"],variable:"--display"});
export const metadata:Metadata={title:"Zartfy — Art that makes a room yours",description:"Curated art prints for expressive homes."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body className={`${sans.variable} ${display.variable}`}><LanguageProvider><ArtStore><AnalyticsTracker/>{children}</ArtStore></LanguageProvider></body></html>}
