import 'server-only'
import { lang } from 'next/root-params'
import { notFound } from 'next/navigation'
const dictionaries = {
  es: () => import('./diccionarios/es.json').then((module) => module.default),
  en: () => import('./diccionarios/en.json').then((module) => module.default),
}
 
export type Locale = keyof typeof dictionaries
 
export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries
 
export const getDictionary = async () => {
  const locale = await lang()
  if (!hasLocale(locale)) notFound()
  return dictionaries[locale]()
}