import Link from "next/link";

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
    return (
        /*Header que va de extremo a extremo de la pantalla*/
        <header className="bg-[#FF6B35] w-full text-white p-4">
            {/* El selector de idioma: cada enlace apunta al mismo path con otro locale. */}
            <nav className="mt-2">
                <img src="/pawsome-advice-logo.png" alt="Logo" className="w-16 h-16 mb-2" />
                <Link href="/es" className="text-blue-400 hover:underline">
                    Español
                </Link>
                <Link href="/en" className="text-blue-400 hover:underline ml-4">
                    English
                </Link>
                {/* Usa el locale activo para no sacar al usuario de su idioma. */}
            </nav>
        </header>
    );
}

export default Header;