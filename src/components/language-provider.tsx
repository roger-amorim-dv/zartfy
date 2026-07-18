"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";

export type Language = "pt" | "en" | "es";

const translations: Record<Exclude<Language, "en">, Record<string, string>> = {
  pt: {
    "Buy via WhatsApp": "Comprar pelo WhatsApp",
    "View analytics →": "Ver análises →",
    "Let's talk about art": "Vamos falar de arte", "Found something": "Encontrou algo", "that moved you?": "que tocou você?", "We're here to help with artwork details, dimensions, orders and choosing the right piece for your space.": "Estamos aqui para ajudar com detalhes das obras, dimensões, pedidos e a escolha da peça ideal para o seu espaço.", "Analytics": "Análises", "Analytics is protected": "As análises são protegidas", "Sign in through the admin area to see your visitor summary.": "Entre pela área administrativa para ver o resumo de visitantes.", "Go to admin": "Ir para o admin", "Back to catalogue": "Voltar ao catálogo", "First-party prototype": "Protótipo próprio", "Site analytics": "Análises do site", "Private, cookie-free activity recorded in this browser.": "Atividade privada, sem cookies, registrada neste navegador.", "Reset analytics": "Redefinir análises", "Total page views": "Total de visualizações", "Contact actions": "Ações de contato", "WhatsApp clicks": "Cliques no WhatsApp", "Pages": "Páginas", "Homepage": "Página inicial", "No page views recorded yet.": "Nenhuma visualização registrada ainda.", "Contact channels": "Canais de contato", "This prototype stores analytics only in the current browser. Connect a production analytics provider before launch for shared, multi-device reporting.": "Este protótipo armazena análises apenas no navegador atual. Conecte um provedor de produção antes do lançamento para relatórios compartilhados entre dispositivos.",
    "Preparing preview...": "Preparando visualização...", "One of the preview images could not be exported.": "Uma das imagens da visualização não pôde ser exportada.", "Your browser could not create the preview.": "Seu navegador não conseguiu criar a visualização.", "The preview could not be saved.": "Não foi possível salvar a visualização.",
    "Show entire photo": "Mostrar foto inteira", "Fill preview": "Preencher visualização", "Room photo size": "Tamanho da foto do ambiente",
    "Shop art": "Comprar arte", "Our story": "Nossa história", "Try on your wall": "Veja na sua parede", "Admin": "Admin", "Make space": "Abra espaço", "for": "para", "feeling.": "sentir.", "Pieces with": "Obras com", "presence.": "presença.", "See it.": "Veja.", "In your space.": "No seu espaço.", "Find the piece": "Encontre a obra", "that feels like": "que se parece com", "you.": "você.", "Make sure it": "Tenha certeza de", "belongs.": "que combina.", "Shape the": "Dê forma à", "collection.": "coleção.",
    "Curated art, made personal": "Arte selecionada, feita para você", "Make space\nfor feeling.": "Abra espaço\npara sentir.",
    "Art shouldn't just match your room. It should change how the room feels. Discover prints chosen for homes with a point of view.": "A arte não deve apenas combinar com o ambiente. Ela deve transformar o que você sente nele. Descubra obras escolhidas para casas com personalidade.",
    "Explore the collection": "Explorar a coleção", "Try it on your wall": "Veja na sua parede", "Scroll to discover": "Role para descobrir",
    "Featured print": "Obra em destaque", "The latest edit": "Seleção mais recente", "Pieces with\npresence.": "Obras com\npresença.",
    "Selected for their ability to hold attention and transform everyday spaces—without shouting for it.": "Selecionadas por sua capacidade de atrair o olhar e transformar espaços cotidianos — sem precisar chamar atenção.",
    "All works": "Todas as obras", "View in your room": "Ver no seu ambiente", "No more guessing": "Chega de imaginar",
    "See it.\nIn your space.": "Veja.\nNo seu espaço.", "Upload a photo of your room and preview any piece at the size you're considering. Move it, resize it and find the placement that feels just right.": "Envie uma foto do seu ambiente e visualize qualquer obra no tamanho desejado. Mova, redimensione e encontre a posição perfeita.",
    "Try the room preview": "Testar no meu ambiente", "No account needed · Your photo stays private": "Sem cadastro · Sua foto permanece privada",
    "Why Zartfy": "Por que Zartfy", "Curated, never crowded": "Curadoria, sem excessos", "Made beautifully": "Produzida com cuidado", "Chosen with confidence": "Escolha com confiança",
    "Every work earns its place, selected for quality, feeling and the life it brings to a space.": "Cada obra conquista seu espaço, escolhida pela qualidade, emoção e vida que traz ao ambiente.",
    "Archival papers, responsible materials and specialist printing that honours every detail.": "Papéis de alta durabilidade, materiais responsáveis e impressão especializada que valoriza cada detalhe.",
    "Our room preview takes uncertainty out of choosing the perfect artwork and size.": "Nossa visualização no ambiente elimina a dúvida ao escolher a obra e o tamanho ideais.",
    "Find the piece\nthat feels like you.": "Encontre a obra\nque tem a sua cara.", "Explore all art": "Explorar todas as obras", "Art for expressive homes.": "Arte para casas com personalidade.",
    "Back to gallery": "Voltar à galeria", "Room preview studio": "Estúdio de visualização", "Make sure it\nbelongs.": "Tenha certeza de\nque combina.",
    "Choose a work, add your room and find the scale that feels perfect.": "Escolha uma obra, adicione seu ambiente e encontre a escala perfeita.", "Choose your artwork": "Escolha sua obra", "Add your room": "Adicione seu ambiente", "Finish & scale": "Acabamento e escala",
    "Upload a room photo": "Enviar foto do ambiente", "JPG, PNG or WEBP": "JPG, PNG ou WEBP", "Upload my image": "Enviar minha imagem", "Choose a photo or artwork from your device": "Escolha uma foto ou obra do dispositivo", "or choose from the catalogue": "ou escolha do catálogo", "Click to replace the image": "Clique para trocar a imagem", "JPG, PNG, WEBP or HEIC · up to 20 MB": "JPG, PNG, WEBP ou HEIC · até 20 MB", "Choose an image file.": "Escolha um arquivo de imagem.", "The image must be no larger than 20 MB.": "A imagem deve ter no máximo 20 MB.", "This image could not be opened.": "Não foi possível abrir esta imagem.", "Custom image": "Imagem personalizada", "Custom": "Personalizada", "Image uploaded from this device.": "Imagem enviada do dispositivo.", "Artwork scale": "Escala da obra", "Live preview": "Visualização ao vivo", "Reset": "Redefinir", "drag to position": "arraste para posicionar", "Previewing": "Visualizando", "Save preview": "Salvar visualização",
    "none": "sem moldura", "black": "preta", "white": "branca", "oak": "carvalho",
    "THE CURATOR'S DESK": "O ESPAÇO DO CURADOR", "Shape the\ncollection.": "Dê forma à\ncoleção.", "Manage the art that makes every room feel more personal.": "Gerencie a arte que torna cada ambiente mais pessoal.",
    "Back to site": "Voltar ao site", "Private access": "Acesso privado", "Welcome back.": "Boas-vindas.", "Enter the studio password to continue.": "Digite a senha do estúdio para continuar.", "Password": "Senha", "Enter the studio": "Entrar no estúdio", "Prototype password:": "Senha do protótipo:",
    "That password isn't right. Try again.": "Senha incorreta. Tente novamente.", "Artworks": "Obras", "View website": "Ver site", "Reset demo data": "Restaurar dados de demonstração", "Sign out": "Sair",
    "Catalogue manager": "Gestor de catálogo", "Your artworks": "Suas obras", "pieces": "obras", "published": "publicadas", "Add artwork": "Adicionar obra", "Prototype mode": "Modo protótipo",
    "Changes are saved in this browser only. Production will use secure authentication and shared cloud storage.": "As alterações são salvas apenas neste navegador. A versão de produção usará autenticação segura e armazenamento compartilhado na nuvem.",
    "Search title or artist...": "Buscar título ou artista...", "Artwork": "Obra", "Category": "Categoria", "Price": "Preço", "Status": "Status", "Actions": "Ações", "Published": "Publicada", "Draft": "Rascunho", "Delete this artwork?": "Excluir esta obra?",
    "Catalogue editor": "Editor de catálogo", "Edit artwork": "Editar obra", "Image URL": "URL da imagem", "Title": "Título", "Artist": "Artista", "Year": "Ano", "Price ($)": "Preço ($)", "Width (cm)": "Largura (cm)", "Height (cm)": "Altura (cm)", "Description": "Descrição", "Accent colour": "Cor de destaque", "Featured": "Destaque", "Cancel": "Cancelar", "Save artwork": "Salvar obra"
  },
  es: {
    "Buy via WhatsApp":"Comprar por WhatsApp",
    "View analytics →":"Ver análisis →",
    "Let's talk about art":"Hablemos de arte","Found something":"¿Encontraste algo","that moved you?":"que te emocionó?","We're here to help with artwork details, dimensions, orders and choosing the right piece for your space.":"Estamos aquí para ayudarte con detalles, dimensiones, pedidos y la elección de la obra ideal para tu espacio.","Analytics":"Análisis","Analytics is protected":"Los análisis están protegidos","Sign in through the admin area to see your visitor summary.":"Inicia sesión en el área administrativa para ver el resumen de visitantes.","Go to admin":"Ir al admin","Back to catalogue":"Volver al catálogo","First-party prototype":"Prototipo propio","Site analytics":"Análisis del sitio","Private, cookie-free activity recorded in this browser.":"Actividad privada, sin cookies, registrada en este navegador.","Reset analytics":"Restablecer análisis","Total page views":"Total de visitas","Contact actions":"Acciones de contacto","WhatsApp clicks":"Clics en WhatsApp","Pages":"Páginas","Homepage":"Página principal","No page views recorded yet.":"Aún no hay visitas registradas.","Contact channels":"Canales de contacto","This prototype stores analytics only in the current browser. Connect a production analytics provider before launch for shared, multi-device reporting.":"Este prototipo guarda los análisis solo en el navegador actual. Conecta un proveedor de producción antes del lanzamiento para informes compartidos entre dispositivos.",
    "Preparing preview...":"Preparando vista previa...","One of the preview images could not be exported.":"No se pudo exportar una de las imágenes de la vista previa.","Your browser could not create the preview.":"Tu navegador no pudo crear la vista previa.","The preview could not be saved.":"No se pudo guardar la vista previa.",
    "Show entire photo":"Mostrar foto completa","Fill preview":"Llenar vista previa","Room photo size":"Tamaño de la foto de la habitación",
    "Shop art":"Comprar arte","Our story":"Nuestra historia","Try on your wall":"Ver en tu pared","Admin":"Admin","Make space":"Haz espacio","for":"para","feeling.":"sentir.","Pieces with":"Obras con","presence.":"presencia.","See it.":"Míralo.","In your space.":"En tu espacio.","Find the piece":"Encuentra la obra","that feels like":"que se siente como","you.":"tú.","Make sure it":"Asegúrate de","belongs.":"que encaje.","Shape the":"Da forma a la","collection.":"colección.","Curated art, made personal":"Arte seleccionada, hecha personal","Make space\nfor feeling.":"Haz espacio\npara sentir.",
    "Art shouldn't just match your room. It should change how the room feels. Discover prints chosen for homes with a point of view.":"El arte no solo debe combinar con tu habitación. Debe transformar cómo se siente. Descubre obras elegidas para hogares con personalidad.","Explore the collection":"Explorar la colección","Try it on your wall":"Ver en tu pared","Scroll to discover":"Desliza para descubrir","Featured print":"Obra destacada","The latest edit":"Selección reciente","Pieces with\npresence.":"Obras con\npresencia.",
    "Selected for their ability to hold attention and transform everyday spaces—without shouting for it.":"Seleccionadas por su capacidad de captar la atención y transformar espacios cotidianos sin estridencias.","All works":"Todas las obras","View in your room":"Ver en tu espacio","No more guessing":"No imagines más","See it.\nIn your space.":"Míralo.\nEn tu espacio.",
    "Upload a photo of your room and preview any piece at the size you're considering. Move it, resize it and find the placement that feels just right.":"Sube una foto de tu habitación y visualiza cualquier obra al tamaño deseado. Muévela, cambia su tamaño y encuentra el lugar perfecto.","Try the room preview":"Probar en mi espacio","No account needed · Your photo stays private":"Sin cuenta · Tu foto permanece privada","Why Zartfy":"Por qué Zartfy","Curated, never crowded":"Curado, nunca saturado","Made beautifully":"Hecho con belleza","Chosen with confidence":"Elige con confianza",
    "Every work earns its place, selected for quality, feeling and the life it brings to a space.":"Cada obra se gana su lugar por su calidad, emoción y la vida que aporta al espacio.","Archival papers, responsible materials and specialist printing that honours every detail.":"Papeles duraderos, materiales responsables e impresión especializada que honra cada detalle.","Our room preview takes uncertainty out of choosing the perfect artwork and size.":"Nuestra vista previa elimina la incertidumbre al elegir la obra y el tamaño perfectos.","Find the piece\nthat feels like you.":"Encuentra la obra\nque se siente como tú.","Explore all art":"Explorar todo el arte","Art for expressive homes.":"Arte para hogares expresivos.",
    "Back to gallery":"Volver a la galería","Room preview studio":"Estudio de visualización","Make sure it\nbelongs.":"Asegúrate de\nque encaje.","Choose a work, add your room and find the scale that feels perfect.":"Elige una obra, añade tu habitación y encuentra la escala perfecta.","Choose your artwork":"Elige tu obra","Add your room":"Añade tu habitación","Finish & scale":"Acabado y escala","Upload a room photo":"Subir foto de la habitación","JPG, PNG or WEBP":"JPG, PNG o WEBP","Upload my image":"Subir mi imagen","Choose a photo or artwork from your device":"Elige una foto u obra de tu dispositivo","or choose from the catalogue":"o elige del catálogo","Click to replace the image":"Haz clic para cambiar la imagen","JPG, PNG, WEBP or HEIC · up to 20 MB":"JPG, PNG, WEBP o HEIC · hasta 20 MB","Choose an image file.":"Elige un archivo de imagen.","The image must be no larger than 20 MB.":"La imagen debe tener como máximo 20 MB.","This image could not be opened.":"No se pudo abrir esta imagen.","Custom image":"Imagen personalizada","Custom":"Personalizada","Image uploaded from this device.":"Imagen subida desde este dispositivo.","Artwork scale":"Escala de la obra","Live preview":"Vista previa","Reset":"Restablecer","drag to position":"arrastra para colocar","Previewing":"Visualizando","Save preview":"Guardar vista previa","none":"sin marco","black":"negro","white":"blanco","oak":"roble",
    "THE CURATOR'S DESK":"EL ESPACIO DEL CURADOR","Shape the\ncollection.":"Da forma a la\ncolección.","Manage the art that makes every room feel more personal.":"Gestiona el arte que hace cada espacio más personal.","Back to site":"Volver al sitio","Private access":"Acceso privado","Welcome back.":"Bienvenido de nuevo.","Enter the studio password to continue.":"Introduce la contraseña del estudio para continuar.","Password":"Contraseña","Enter the studio":"Entrar al estudio","Prototype password:":"Contraseña del prototipo:","That password isn't right. Try again.":"La contraseña no es correcta. Inténtalo de nuevo.",
    "Artworks":"Obras","View website":"Ver sitio","Reset demo data":"Restaurar datos de prueba","Sign out":"Cerrar sesión","Catalogue manager":"Gestor de catálogo","Your artworks":"Tus obras","pieces":"obras","published":"publicadas","Add artwork":"Añadir obra","Prototype mode":"Modo prototipo","Changes are saved in this browser only. Production will use secure authentication and shared cloud storage.":"Los cambios se guardan solo en este navegador. Producción usará autenticación segura y almacenamiento compartido.","Search title or artist...":"Buscar título o artista...","Artwork":"Obra","Category":"Categoría","Price":"Precio","Status":"Estado","Actions":"Acciones","Published":"Publicada","Draft":"Borrador","Delete this artwork?":"¿Eliminar esta obra?","Catalogue editor":"Editor de catálogo","Edit artwork":"Editar obra","Image URL":"URL de imagen","Title":"Título","Artist":"Artista","Year":"Año","Price ($)":"Precio ($)","Width (cm)":"Ancho (cm)","Height (cm)":"Alto (cm)","Description":"Descripción","Accent colour":"Color de acento","Featured":"Destacada","Cancel":"Cancelar","Save artwork":"Guardar obra"
  }
};

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);
const originals = new WeakMap<Text, string>();
const placeholderOriginals = new WeakMap<HTMLInputElement | HTMLTextAreaElement, string>();

function translatePage(language: Language) {
  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  const dictionary = language === "en" ? {} : translations[language];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const textNode = node as Text;
    const parent = textNode.parentElement;
    if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) continue;
    const source = originals.get(textNode) ?? textNode.data;
    originals.set(textNode, source);
    const trimmed = source.trim();
    const translated = dictionary[trimmed];
    if (translated) textNode.data = source.replace(trimmed, translated);
    else if (language === "en") textNode.data = source;
  }
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[placeholder], textarea[placeholder]").forEach((field) => {
    const source = placeholderOriginals.get(field) ?? field.placeholder;
    placeholderOriginals.set(field, source);
    field.placeholder = dictionary[source] ?? source;
  });
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");
  useEffect(() => { const saved = localStorage.getItem("zartfy-language") as Language | null; if (saved && ["pt", "en", "es"].includes(saved)) setLanguageState(saved); }, []);
  useLayoutEffect(() => { translatePage(language); const observer = new MutationObserver(() => translatePage(language)); observer.observe(document.body, { childList: true, subtree: true }); return () => observer.disconnect(); }, [language]);
  const setLanguage = useCallback((next: Language) => { localStorage.setItem("zartfy-language", next); setLanguageState(next); }, []);
  return <LanguageContext.Provider value={{ language, setLanguage }}><div className="global-language"><LanguageSwitcher /></div>{children}</LanguageContext.Provider>;
}

export function useLanguage() { const value = useContext(LanguageContext); if (!value) throw new Error("LanguageProvider missing"); return value; }

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { language, setLanguage } = useLanguage();
  return <div className={`language-switcher ${dark ? "dark" : ""}`} aria-label="Language selector">{(["pt", "en", "es"] as Language[]).map(item => <button key={item} className={language === item ? "active" : ""} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div>;
}
