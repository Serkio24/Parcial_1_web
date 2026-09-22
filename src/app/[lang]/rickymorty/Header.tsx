import Link from "next/link";
import { useDiccionario } from "../components/DiccionarioContext";

/**
 * Cabecera de la sección de Rick and Morty: título, selector de idioma y
 * enlace al formulario de creación.
 *
 * No lleva `"use client"` pero usa un hook: funciona porque su único
 * importador (`rickymorty/page.tsx`) sí es cliente, y todo lo que un Client
 * Component importa se compila como código de cliente. Si algún día lo
 * importara un Server Component, reventaría — ahí sí habría que añadir la
 * directiva.
 */
export function Header() {
    // `lang` es el locale de la ruta actual: lo necesitan los enlaces internos.
    const { dict, lang } = useDiccionario();
    return (
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold">{dict.rickymorty.title}</h1>
            {/* El selector de idioma: cada enlace apunta al mismo path con otro locale. */}
            <nav className="mt-2">
                <Link href="/es/rickymorty" className="text-blue-400 hover:underline">
                    Español
                </Link>
                <Link href="/en/rickymorty" className="text-blue-400 hover:underline ml-4">
                    English
                </Link>
                {/* Usa el locale activo para no sacar al usuario de su idioma. */}
                <Link href={`/${lang}/rickymorty/crear`} className="text-blue-400 hover:underline ml-4">
                    {dict.create_character}
                </Link>
            </nav>
        </header>
    );
}

export default Header;