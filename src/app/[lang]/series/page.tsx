import { getDictionary, hasLocale } from '../diccionarios'
import { notFound } from 'next/navigation'
import  Link  from 'next/link'
import SerieListContainer from '../components/SerieListContainer'

export default async function Page( { params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary()
  
 

  return (
    <main>
      <header className="flex flex-col items-center mr-auto gap-4">
        <div className="box-border p-3 border-4 border-dashed border-gray-200 rounded-lg max-w-4xl justify-between items-center ml-auto">
          <Link href={`/${lang}/series/new`}>{dict.page.add}</Link>
        </div>
      </header>
      <SerieListContainer emptyMessage={dict.page.empty} />
    </main>
  )
}