"use client";

import { ChangeEvent, PointerEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Download, ImagePlus, MessageCircle, Move, RotateCcw, Upload } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useArtStore } from "@/components/art-store";
import type { Artwork } from "@/data/artworks";
import { recordEvent } from "@/components/analytics";

const demoRoom = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90";
const MAX_FILE_SIZE = 20 * 1024 * 1024;

function imageFromDevice(file: File): Promise<{ url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) return reject(new Error("Choose an image file."));
    if (file.size > MAX_FILE_SIZE) return reject(new Error("The image must be no larger than 20 MB."));
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({ url, width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("This image could not be opened.")); };
    image.src = url;
  });
}

export default function Mockup() {
  const { artworks } = useArtStore();
  const list = artworks.filter((art) => art.published);
  const [selected, setSelected] = useState<Artwork | undefined>(list[0]);
  const [room, setRoom] = useState(demoRoom);
  const [roomName, setRoomName] = useState("");
  const [roomFit, setRoomFit] = useState<"contain" | "cover">("cover");
  const [roomZoom, setRoomZoom] = useState(100);
  const [scale, setScale] = useState(30);
  const [frame, setFrame] = useState("black");
  const [position, setPosition] = useState({ x: 50, y: 40 });
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const placedArtRef = useRef<HTMLDivElement>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
  const artworkInputRef = useRef<HTMLInputElement>(null);
  const objectUrls = useRef<string[]>([]);

  useEffect(() => () => objectUrls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const uploadRoom = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      setError("");
      const image = await imageFromDevice(file);
      objectUrls.current.push(image.url);
      setRoom(image.url);
      setRoomName(file.name);
      setRoomFit("contain");
      setRoomZoom(100);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "This image could not be opened.");
    }
  };

  const uploadArtwork = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      setError("");
      const image = await imageFromDevice(file);
      objectUrls.current.push(image.url);
      const ratio = image.width / image.height;
      setSelected({
        id: `custom-${Date.now()}`,
        title: file.name.replace(/\.[^.]+$/, ""),
        artist: "Custom image",
        year: new Date().getFullYear().toString(),
        category: "Custom",
        description: "Image uploaded from this device.",
        price: 0,
        width: ratio >= 1 ? 60 : Math.round(60 * ratio),
        height: ratio >= 1 ? Math.round(60 / ratio) : 60,
        image: image.url,
        featured: false,
        published: true,
        accent: "#f0e8db",
      });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "This image could not be opened.");
    }
  };

  const moveArtwork = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setPosition((current) => ({
      x: Math.max(10, Math.min(90, current.x + ((event.clientX - drag.x) / rect.width) * 100)),
      y: Math.max(12, Math.min(85, current.y + ((event.clientY - drag.y) / rect.height) * 100)),
    }));
    setDrag({ x: event.clientX, y: event.clientY });
  };

  const loadCanvasImage = (source: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    if (!source.startsWith("blob:") && !source.startsWith("data:")) image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("One of the preview images could not be exported."));
    image.src = source;
  });

  const savePreview = async () => {
    if (!selected || !stageRef.current || !placedArtRef.current) return;
    try {
      setError("");
      setExporting(true);
      const [roomImage, artworkImage] = await Promise.all([loadCanvasImage(room), loadCanvasImage(selected.image)]);
      const stageRect = stageRef.current.getBoundingClientRect();
      const artworkRect = placedArtRef.current.getBoundingClientRect();
      const outputScale = Math.min(3, Math.max(2, 1800 / stageRect.width));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(stageRect.width * outputScale);
      canvas.height = Math.round(stageRect.height * outputScale);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser could not create the preview.");

      context.fillStyle = "#e6e1d8";
      context.fillRect(0, 0, canvas.width, canvas.height);
      const fitScale = roomFit === "contain"
        ? Math.min(canvas.width / roomImage.naturalWidth, canvas.height / roomImage.naturalHeight)
        : Math.max(canvas.width / roomImage.naturalWidth, canvas.height / roomImage.naturalHeight);
      const roomScale = fitScale * (roomZoom / 100);
      const roomWidth = roomImage.naturalWidth * roomScale;
      const roomHeight = roomImage.naturalHeight * roomScale;
      context.drawImage(roomImage, (canvas.width - roomWidth) / 2, (canvas.height - roomHeight) / 2, roomWidth, roomHeight);

      const artX = (artworkRect.left - stageRect.left) * outputScale;
      const artY = (artworkRect.top - stageRect.top) * outputScale;
      const artWidth = artworkRect.width * outputScale;
      const artHeight = artworkRect.height * outputScale;
      const border = frame === "none" ? 0 : Math.max(7, artWidth * 0.025);
      if (border) {
        context.fillStyle = frame === "white" ? "#f8f4e9" : frame === "oak" ? "#b38355" : "#111111";
        context.shadowColor = "rgba(0,0,0,.34)";
        context.shadowBlur = artWidth * 0.05;
        context.shadowOffsetY = artWidth * 0.025;
        context.fillRect(artX, artY, artWidth, artHeight);
        context.shadowColor = "transparent";
      }
      context.drawImage(artworkImage, artX + border, artY + border, artWidth - border * 2, artHeight - border * 2);

      const link = document.createElement("a");
      link.download = `zartfy-${selected.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "preview"}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.94);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The preview could not be saved.");
    } finally {
      setExporting(false);
    }
  };

  const buyViaWhatsApp = () => {
    if (!selected || !roomName) return;
    const frameLabels: Record<string, string> = { none: "Sem moldura", black: "Moldura preta", white: "Moldura branca", oak: "Moldura carvalho" };
    const roomFitLabels = { contain: "Foto inteira", cover: "Preencher visualização" };
    const price = selected.price > 0 ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(selected.price) : "A combinar";
    const message = [
      "Olá! Montei uma composição no simulador da Zartfy e gostaria de comprar esta obra.",
      "",
      `*Obra:* ${selected.title}`,
      `*Artista:* ${selected.artist}`,
      `*Dimensões:* ${selected.width} × ${selected.height} cm`,
      `*Acabamento:* ${frameLabels[frame]}`,
      `*Preço:* ${price}`,
      `*Escala escolhida:* ${scale}%`,
      `*Ajuste da foto do ambiente:* ${roomFitLabels[roomFit]} · ${roomZoom}%`,
      `*Foto do ambiente:* ${roomName}`,
      selected.id.startsWith("custom-") ? "*Imagem:* Enviada pelo cliente" : `*Referência:* https://zartfy.com/#${selected.id}`,
      "",
      "Tenho a prévia salva e posso enviá-la nesta conversa. Poderiam confirmar os detalhes e o prazo?",
    ].join("\n");
    recordEvent("mockup_buy_whatsapp");
    window.open(`https://api.whatsapp.com/send?phone=5519999077538&text=${encodeURIComponent(message)}&app_absent=0`, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <SiteHeader />
      <div className="mockup-head">
        <Link href="/"><ArrowLeft /> Back to gallery</Link>
        <p className="kicker">Room preview studio</p>
        <h1>Make sure it<br /><em>belongs.</em></h1>
        <p>Choose a work, add your room and find the scale that feels perfect.</p>
      </div>

      <section className="mockup-workspace">
        <aside>
          <h2><span>01</span>Choose your artwork</h2>
          <input ref={artworkInputRef} className="visually-hidden-input" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" onChange={uploadArtwork} />
          <button className="device-upload-button" type="button" onClick={() => artworkInputRef.current?.click()}>
            <ImagePlus /><span>Upload my image<small>Choose a photo or artwork from your device</small></span>
          </button>
          <div className="upload-separator"><span>or choose from the catalogue</span></div>
          <div className="mini-art-grid">
            {list.map((art) => (
              <button className={selected?.id === art.id ? "selected" : ""} key={art.id} onClick={() => setSelected(art)}>
                <img src={art.image} alt="" />
                <span>{art.title}<small>{art.width} × {art.height} cm</small></span>
              </button>
            ))}
          </div>

          <h2><span>02</span>Add your room</h2>
          <input ref={roomInputRef} className="visually-hidden-input" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" onChange={uploadRoom} />
          <button className={`room-upload ${roomName ? "uploaded" : ""}`} type="button" onClick={() => roomInputRef.current?.click()}>
            {roomName ? <Check /> : <Upload />}
            <span>{roomName || "Upload a room photo"}<small>{roomName ? "Click to replace the image" : "JPG, PNG, WEBP or HEIC · up to 20 MB"}</small></span>
          </button>
          {roomName && <div className="room-sizing-controls">
            <div className="room-fit-options">
              <button type="button" className={roomFit === "contain" ? "active" : ""} onClick={() => setRoomFit("contain")}>Show entire photo</button>
              <button type="button" className={roomFit === "cover" ? "active" : ""} onClick={() => setRoomFit("cover")}>Fill preview</button>
            </div>
            <label>Room photo size <output>{roomZoom}%</output><input type="range" min="60" max="180" value={roomZoom} onChange={(event) => setRoomZoom(+event.target.value)} /></label>
          </div>}
          {error && <p className="mockup-error">{error}</p>}

          <h2><span>03</span>Finish & scale</h2>
          <div className="frames">
            {["none", "black", "white", "oak"].map((option) => <button className={frame === option ? "active" : ""} onClick={() => setFrame(option)} key={option}>{option}</button>)}
          </div>
          <label className="scale-control">Artwork scale <output>{scale}%</output><input type="range" min="12" max="65" value={scale} onChange={(event) => setScale(+event.target.value)} /></label>
        </aside>

        <div className="mockup-preview">
          <div className="mockup-toolbar"><span>Live preview · {selected?.width} × {selected?.height} cm</span><button onClick={() => { setPosition({ x: 50, y: 40 }); setScale(30); }}><RotateCcw /> Reset</button></div>
          <div className="room-stage" ref={stageRef}>
            <img className={`room-photo ${roomFit}`} src={room} alt="Room preview" style={{ transform: `scale(${roomZoom / 100})` }} />
            {selected && <div ref={placedArtRef} className={`placed-art ${frame}`} style={{ left: `${position.x}%`, top: `${position.y}%`, width: `${scale}%`, aspectRatio: `${selected.width}/${selected.height}` }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDrag({ x: event.clientX, y: event.clientY }); }} onPointerMove={moveArtwork} onPointerUp={() => setDrag(null)}><img src={selected.image} alt={selected.title} /><i><Move /> drag to position</i></div>}
          </div>
          <div className="mockup-bottom"><div><ImagePlus /><span>Previewing <strong>{selected?.title}</strong></span></div><div className="mockup-actions"><button className="save-mockup" type="button" onClick={savePreview} disabled={exporting}><Download /> {exporting ? "Preparing preview..." : "Save preview"}</button><button className="buy-mockup" type="button" onClick={buyViaWhatsApp} disabled={!roomName}><MessageCircle /> Buy this composition</button></div></div>
          {!roomName && <p className="mockup-buy-hint">Upload your room photo to unlock WhatsApp purchasing with all your selected details.</p>}
        </div>
      </section>
    </main>
  );
}
