import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./language.css";
import { ArtStore } from "@/components/art-store";
import { LanguageProvider } from "@/components/language-provider";
const sans=DM_Sans({subsets:["latin"],variable:"--sans"}); const display=Playfair_Display({subsets:["latin"],variable:"--display"});
export const metadata:Metadata={title:"Zartfy — Art that makes a room yours",description:"Curated art prints for expressive homes."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body className={`${sans.variable} ${display.variable}`}><LanguageProvider><ArtStore>{children}</ArtStore></LanguageProvider></body></html>}
