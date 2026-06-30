/**
 * Prefija una ruta de /public con el basePath del despliegue.
 * En dev local NEXT_PUBLIC_BASE_PATH es "" y en GitHub Pages es "/pixelar_web_page".
 * Úsalo para <img src> de assets estáticos (logos, etc.) que de otro modo
 * romperían bajo el subdirectorio de Pages.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
