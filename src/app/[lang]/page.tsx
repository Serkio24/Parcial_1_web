import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './diccionarios'
import Link from 'next/link'

/**
 * Home (`/es`, `/en`).
 *
 * Server Component que muestra el listado de series *estáticas* definidas en
 * el diccionario del idioma (datos de ejemplo del JSON), no las que el usuario
 * ha creado — esas viven en localStorage y se ven en `/[lang]/series`.
 */
export default async function Page( { params }: PageProps<'/[lang]'>) {
  // `params` es una promesa en Next.js 16.
  const { lang } = await params
  // Locale no soportado (p. ej. `/fr`) -> 404.
  if (!hasLocale(lang)) notFound()
  // Textos y datos de ejemplo del idioma actual.
  const dict = await getDictionary()

  return (
    <main>
      <header className="flex flex-col items-center mr-auto gap-4">
        <div className="box-border p-3 border-4 border-dashed border-gray-200 rounded-lg max-w-4xl justify-between items-center ml-auto">
          {/* Los enlaces internos conservan el locale para no disparar el redirect del proxy. */}
          <Link href={`/${lang}/series/new`}>{dict.page.add}</Link>
        </div>
      
      </header>
      <h1>{dict.page.title}</h1>
      {/* `dict.series` son datos fijos del JSON; `emptyMessage` ya viene traducido. */}
    </main>
    
  )
}
