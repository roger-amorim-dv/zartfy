"use client";

import { MessageCircle } from "lucide-react";
import { recordEvent } from "./analytics";

type WhatsAppBuyButtonProps = { title: string; price: number; artworkId: string };

export function WhatsAppBuyButton({ title, price, artworkId }: WhatsAppBuyButtonProps) {
  const message = [
    "Olá! Tenho interesse nesta obra e gostaria de mais informações.",
    "",
    `*${title}*`,
    `*Preço:* ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price)}`,
    `*URL:* https://zartfy.com/#${artworkId}`,
    "",
    "Obrigado!",
  ].join("\n");
  const url = `https://api.whatsapp.com/send?phone=5519999077538&text=${encodeURIComponent(message)}&app_absent=0`;
  return <a className="whatsapp-buy" href={url} target="_blank" rel="noreferrer" onClick={() => recordEvent("buy_whatsapp")}><MessageCircle />Buy via WhatsApp</a>;
}
