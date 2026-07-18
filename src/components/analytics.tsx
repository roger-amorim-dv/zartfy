"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
export type AnalyticsData={pageViews:Record<string,number>;events:Record<string,number>;firstVisit:string;lastVisit:string};
export const ANALYTICS_KEY="zartfy-analytics-v1";
export function readAnalytics():AnalyticsData{const empty={pageViews:{},events:{},firstVisit:new Date().toISOString(),lastVisit:new Date().toISOString()};if(typeof window==="undefined")return empty;try{return{...empty,...JSON.parse(localStorage.getItem(ANALYTICS_KEY)||"{}")}}catch{return empty}}
export function recordEvent(name:string){const data=readAnalytics();data.events[name]=(data.events[name]||0)+1;data.lastVisit=new Date().toISOString();localStorage.setItem(ANALYTICS_KEY,JSON.stringify(data))}
export function AnalyticsTracker(){const pathname=usePathname();useEffect(()=>{if(pathname.startsWith("/admin"))return;const data=readAnalytics();data.pageViews[pathname]=(data.pageViews[pathname]||0)+1;data.lastVisit=new Date().toISOString();localStorage.setItem(ANALYTICS_KEY,JSON.stringify(data))},[pathname]);return pathname==="/admin"?<Link className="admin-analytics-link" href="/admin/analytics">View analytics →</Link>:null}
