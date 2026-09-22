"use client";
import { notFound } from 'next/navigation'
import {useDiccionario} from './components/DiccionarioContext'
import Link from 'next/link'
import Header from './components/Header'
import ListaPerros from './components/ListaPerros'
import { useApi } from './components/APIDogs'

/**
 * Home (`/es`, `/en`).
 *
 * Server Component que muestra el listado de series *estáticas* definidas en
 * el diccionario del idioma (datos de ejemplo del JSON), no las que el usuario
 * ha creado — esas viven en localStorage y se ven en `/[lang]/series`.
 */
export default  function Page( { params }: PageProps<'/[lang]'>) {
  // `params` es una promesa en Next.js 16.
  const {dict, lang} =  useDiccionario();
  const {razas, loading, error} = useApi();
  return (  
    <main>
      <header className="flex flex-col items-center mr-auto gap-4">
        
      
      </header>
      <h1>{dict.page.title}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ListaPerros razas={razas} emptyMessage={dict.page.empty} />
    </main>
    
  )
}
