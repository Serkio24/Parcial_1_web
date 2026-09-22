"use client";
import { createContext, useContext } from "react";
import type { Diccionario } from "../diccionarios";

/**
 * Contexto de i18n.
 *
 * `getDictionary()` es `server-only`: no se puede llamar desde el navegador.
 * El patrón es cargarlo una vez en el layout (Server Component) y pasárselo a
 * este provider, que sí es cliente. A partir de ahí cualquier componente del
 * árbol lee los textos con `useDiccionario()` sin recibirlos por props.
 *
 * El diccionario viaja serializado en el payload de RSC una sola vez; el
 * contexto no lo vuelve a pedir ni añade estado.
 */

/** Lo que el provider expone: los textos y el locale activo. */
interface DiccionarioContextType {
  /** Textos y datos del idioma actual. */
  dict: Diccionario;
  /** Locale activo (`"es"` | `"en"`), útil para construir enlaces internos. */
  lang: string;
}

const DiccionarioContext = createContext<DiccionarioContextType | undefined>(undefined);

/**
 * Provider del diccionario. Se monta en el root layout.
 *
 * @param dict     Diccionario ya resuelto en el servidor con `getDictionary()`.
 * @param lang     Locale de la ruta actual.
 * @param children Árbol que podrá consumir el contexto.
 */
export function DiccionarioProvider({
  dict,
  lang,
  children,
}: {
  dict: Diccionario;
  lang: string;
  children: React.ReactNode;
}) {
  return (
    <DiccionarioContext.Provider value={{ dict, lang }}>
      {children}
    </DiccionarioContext.Provider>
  );
}

/**
 * Accede al diccionario desde cualquier client component.
 *
 * @example
 * const { dict, lang } = useDiccionario();
 * return <button>{dict.formulario.submit}</button>;
 *
 * @throws Error si se usa fuera de un `DiccionarioProvider`.
 */
export function useDiccionario() {
  const context = useContext(DiccionarioContext);
  if (!context) {
    throw new Error("useDiccionario debe usarse dentro de un DiccionarioProvider");
  }
  return context;
}
