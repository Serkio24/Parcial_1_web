import 'server-only'
import { lang } from 'next/root-params'
import { notFound } from 'next/navigation'

/**
 * Diccionarios de i18n.
 *
 * Cada locale apunta a una función que importa su JSON de forma diferida
 * (dynamic import), de modo que el bundle del servidor solo carga el idioma
 * que realmente se está renderizando.
 *
 * Los JSON viven en `./diccionarios/<locale>.json` y contienen los textos de
 * la UI (`page`, `formulario`, `errores`) y el listado de series de ejemplo.
 */
const dictionaries = {
  es: () => import('./diccionarios/es.json').then((module) => module.default),
  en: () => import('./diccionarios/en.json').then((module) => module.default),
}

/** Union de los locales soportados: `'es' | 'en'`. */
export type Locale = keyof typeof dictionaries

/**
 * Type guard: indica si un string cualquiera es un locale soportado.
 * Se usa en las páginas para descartar URLs como `/fr/series` antes de renderizar.
 */
export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

/**
 * Devuelve el diccionario del idioma de la petición actual.
 *
 * `lang()` viene de `next/root-params` (Next.js 16): lee el segmento dinámico
 * `[lang]` que está por encima del root layout, sin necesidad de recibir
 * `params` por props. Solo funciona en Server Components.
 *
 * Si el locale no existe, responde con la página 404.
 *
 * @throws Redirige a `notFound()` cuando el locale no está soportado.
 */
export const getDictionary = async () => {
  const locale = await lang()
  if (!hasLocale(locale)) notFound()
  return dictionaries[locale]()
}

/**
 * Forma del diccionario ya resuelto (el contenido del JSON del idioma activo).
 *
 * Se deriva de `getDictionary` en vez de escribirse a mano, así que si cambian
 * los JSON el tipo se actualiza solo. Los client components lo importan con
 * `import type`, que TypeScript borra al compilar: el `server-only` de arriba
 * nunca llega al bundle del navegador.
 */
export type Diccionario = Awaited<ReturnType<typeof getDictionary>>
