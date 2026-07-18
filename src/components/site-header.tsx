"use client";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader(){ const [open,setOpen]=useState(false); return <header className="header"><button className="mobile-menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><Link className="logo" href="/">zartfy<span>.</span></Link><nav className={open?"open":""}><Link href="/#collection">Shop art</Link><Link href="/#story">Our story</Link><Link href="/mockup">Try on your wall</Link><Link href="/admin">Admin</Link></nav><div className="header-actions"><button aria-label="Search"><Search/></button><button aria-label="Shopping bag"><ShoppingBag/><i>0</i></button></div></header> }
