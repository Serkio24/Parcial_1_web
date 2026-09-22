import { NextResponse, NextRequest } from "next/server";

/**
 * Proxy (antes "Middleware", renombrado en Next.js 16).
 *
 * Se ejecuta ANTES de que se resuelva cada petición y aquí se usa únicamente
 * para el enrutamiento por idioma: si la URL no empieza por un locale
 * soportado, redirige al mismo path pero prefijado con el locale por defecto.
 *
 * Ejemplo: `/series` -> redirect 307 -> `/es/series`
 *
 * Gracias a esto el resto de la app puede asumir que TODA ruta vive bajo
 * `src/app/[lang]/...` y que `[lang]` siempre tiene valor.
 */

/** Locales soportados. Debe mantenerse sincronizado con las claves de `diccionarios.ts`. */
let locales = ['es', 'en']
/** Locale al que se redirige cuando la URL no trae ninguno. */
const defaultLocale = 'es'


export function proxy(request: NextRequest) {
  // ¿La ruta ya viene con un locale soportado? (`/es`, `/en/series`, ...)
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Sí -> se deja pasar sin tocar nada.
  if (pathnameHasLocale) return

  // No -> se antepone el locale por defecto y se redirige.
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  // p. ej. la petición entrante es /products
  // La nueva URL es ahora /es/products
  return NextResponse.redirect(request.nextUrl)
}

/**
 * Filtra en qué rutas corre el proxy.
 * El patrón actual cubre todo excepto los archivos internos de Next (`/_next/...`).
 */
export const config = {
  matcher: [
    // Omite todas las rutas internas (_next)
    '/((?!_next).*)',
    // Opcional: correr solo en la URL raíz (/)
    // '/'
  ],
}
