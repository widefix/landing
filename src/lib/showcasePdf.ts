import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Match the landscape page's printable width at 96 CSS pixels per inch.
const PAGE_WIDTH = 326;
const PAGE_HEIGHT = 230;
const MARGIN = 10;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const CONTENT_HEIGHT = PAGE_HEIGHT - MARGIN * 2;
const RENDER_WIDTH = Math.floor(CONTENT_WIDTH * 96 / 25.4);

// Safari can taint a canvas when an SVG is used as a repeating background.
// Rasterize those decorations first; ordinary images keep their original source.
async function prepareBackgrounds(page: HTMLElement, images: Map<string, Promise<string>>) {
  const doc = page.ownerDocument;
  const rules: string[] = [];
  await Promise.all([page, ...Array.from(page.querySelectorAll<HTMLElement>('*'))].map(async (element, index) => {
    for (const pseudo of ['', '::before', '::after']) {
      const background = doc.defaultView!.getComputedStyle(element, pseudo || null).backgroundImage;
      const matches = Array.from(background.matchAll(/url\(["']?([^"')]+\.svg(?:\?[^"')]+)?)["']?\)/g));
      if (!matches.length) continue;
      let replacement = background;
      for (const match of matches) {
        const url = match[1];
        if (!images.has(url)) images.set(url, (async () => {
          const image = new window.Image();
          image.crossOrigin = 'anonymous';
          image.src = url;
          await image.decode();
          const canvas = document.createElement('canvas');
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          canvas.getContext('2d')!.drawImage(image, 0, 0);
          return canvas.toDataURL('image/png');
        })());
        replacement = replacement.replace(match[0], `url("${await images.get(url)}")`);
      }
      element.setAttribute('data-pdf-background', String(index));
      rules.push(`[data-pdf-background="${index}"]${pseudo} { background-image: ${replacement} !important; }`);
    }
  }));
  const style = doc.createElement('style');
  style.textContent = rules.join('\n');
  doc.head.appendChild(style);
}

export async function downloadShowcasePDF(markup: string, filename: string) {
  const container = document.createElement('div');
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText = `position: absolute; left: -10000px; top: 0; width: ${RENDER_WIDTH}px;`;
  container.innerHTML = markup;
  document.body.appendChild(container);

  try {
    const root = container.querySelector<HTMLElement>('.showcase-pdf')!;
    await Promise.all(Array.from(root.querySelectorAll('img'), async image => {
      image.loading = 'eager';
      await image.decode().catch(() => undefined);
    }));
    // Force layout to request every font used by the export before awaiting it.
    root.getBoundingClientRect();
    await document.fonts.ready;

    const pdf = new jsPDF({ unit: 'mm', format: [PAGE_WIDTH, PAGE_HEIGHT], orientation: 'landscape' });
    const pages = Array.from(root.children) as HTMLElement[];
    const backgrounds = new Map<string, Promise<string>>();
    for (let index = 0; index < pages.length; index++) {
      const page = pages[index];
      const links: { url: string; x: number; y: number; width: number; height: number }[] = [];
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        // Render the clone at a fixed desktop viewport, even on mobile.
        windowWidth: 1440,
        windowHeight: 1000,
        scrollX: 0,
        scrollY: 0,
        onclone: async (_doc, clonedPage) => {
          await prepareBackgrounds(clonedPage, backgrounds);
          const bounds = clonedPage.getBoundingClientRect();
          clonedPage.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(link => {
            Array.from(link.getClientRects()).forEach(rect => links.push({
              url: link.href,
              x: (rect.left - bounds.left) / bounds.width,
              y: (rect.top - bounds.top) / bounds.height,
              width: rect.width / bounds.width,
              height: rect.height / bounds.height,
            }));
          });
        },
      });
      // Fit the complete section, including its images, onto one page. Never
      // slice a continuous canvas through cards, text or image content.
      const ratio = Math.min(CONTENT_WIDTH / canvas.width, CONTENT_HEIGHT / canvas.height);
      const width = canvas.width * ratio;
      const height = canvas.height * ratio;
      const left = MARGIN + (CONTENT_WIDTH - width) / 2;
      if (index > 0) pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/jpeg', 1), 'JPEG', left, MARGIN, width, height);
      links.forEach(link => pdf.link(left + link.x * width, MARGIN + link.y * height,
        link.width * width, link.height * height, { url: link.url }));
      canvas.width = canvas.height = 0;
    }
    pdf.save(filename);
  } finally {
    container.remove();
  }
}
