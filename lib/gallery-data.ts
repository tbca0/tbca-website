export type GalleryItem = {
  /** Public URL (encoded) */
  src: string;
  alt: string;
  caption: string;
  label: string;
};

const GALLARY_FILES = [
  "Durga-Puja- 1.jpg.jpeg",
  "Durga-Puja- 2.jpg.jpeg",
  "Durga-Puja- 3.webp",
  "Durga-Puja- 4.webp",
  "Durga-Puja- 5.jpeg",
  "saraswati Puja 1.png",
  "saraswati Puja 2.png",
  "saraswati Puja 5.webp",
  "saraswati Puja 13.jpg.jpeg",
] as const;

function stripImageExtensions(name: string): string {
  let s = name;
  while (/\.(jpe?g|png|webp)$/i.test(s)) {
    s = s.replace(/\.(jpe?g|png|webp)$/i, "");
  }
  return s;
}

function labelFromFilename(name: string): string {
  return stripImageExtensions(name)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const galleryItems: GalleryItem[] = GALLARY_FILES.map((file) => {
  const path = `/gallary/${encodeURIComponent(file)}`;
  const label = labelFromFilename(file);
  return {
    src: path,
    alt: label || "TBCA event photo",
    caption: label || "TBCA event",
    label: label || "Gallery",
  };
});
