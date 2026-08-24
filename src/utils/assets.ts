/**
 * Formats image assets to work seamlessly with Vite base path (e.g. GitHub Pages subpath /akimov-portfolio/)
 * Prevents double-prefixing if Vite already attached BASE_URL to imported ES module assets.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  const base = import.meta.env.BASE_URL;
  if (base && base !== '/' && path.startsWith(base)) {
    return path;
  }
  
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};
