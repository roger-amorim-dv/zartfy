"use client";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Artwork, seedArtworks } from "@/data/artworks";

type Store = { artworks:Artwork[]; ready:boolean; save:(art:Artwork)=>void; remove:(id:string)=>void; reset:()=>void };
const Context = createContext<Store | null>(null);
const KEY = "zartfy-artworks-v1";

export function ArtStore({children}:{children:ReactNode}) {
  const [artworks,setArtworks] = useState(seedArtworks);
  const [ready,setReady] = useState(false);
  useEffect(()=>{ try { const saved=localStorage.getItem(KEY); if(saved){const stored=JSON.parse(saved) as Artwork[];const missing=seedArtworks.filter(seed=>!stored.some(item=>item.id===seed.id));setArtworks([...stored,...missing]);} } finally { setReady(true); } },[]);
  useEffect(()=>{ if(ready) localStorage.setItem(KEY,JSON.stringify(artworks)); },[artworks,ready]);
  const value=useMemo<Store>(()=>({ artworks,ready,save:(art)=>setArtworks(a=>a.some(x=>x.id===art.id)?a.map(x=>x.id===art.id?art:x):[art,...a]),remove:(id)=>setArtworks(a=>a.filter(x=>x.id!==id)),reset:()=>setArtworks(seedArtworks) }),[artworks,ready]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useArtStore(){ const value=useContext(Context); if(!value) throw new Error("ArtStore missing"); return value; }
