import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ArtStore } from "@/components/art-store";
const sans=DM_Sans({subsets:["latin"],variable:"--sans"}); const display=Playfair_Display({subsets:["latin"],variable:"--display"});
export const metadata:Metadata={title:"Zartfy — Art that makes a room yours",description:"Curated art prints for expressive homes."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${display.variable}`}><ArtStore>{children}</ArtStore></body></html>}
