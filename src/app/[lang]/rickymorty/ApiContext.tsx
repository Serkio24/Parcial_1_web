"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Character } from "./CharacterCard";

/**
 * Contexto de los personajes de la API de Rick and Morty.
 *
 * El fetch se hace UNA sola vez en el provider y el resultado se comparte con
 * todo el subárbol. Si el fetch viviera dentro del hook consumidor, cada
 * componente que lo usara dispararía su propia petición.
 */

/** API que el provider expone a sus consumidores. */
interface ApiContextType {
  /** Personajes cargados desde la API. */
  characters: Character[];
  /** `true` mientras la petición inicial está en curso. */
  loading: boolean;
  /** Mensaje de error si la petición falló, `null` si todo fue bien. */
  error: string | null;
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
  updateCharacter: (character: Character) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

/**
 * Provider: aquí vive el estado y el fetch.
 *
 * Es un COMPONENTE (devuelve JSX y recibe `children`), no un hook.
 *
 * @param children Subárbol que podrá consumir el contexto con `useApi()`.
 */
export function ApiProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga inicial: se ejecuta una vez, ya montado en el navegador.
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setCharacters(data.results);
      } catch (e) {
        console.error("Error fetching characters:", e);
        setError("No se pudieron cargar los personajes");
      } finally {
        // Pase lo que pase se apaga el loading, si no la UI se queda colgada.
        setLoading(false);
      }
    };

    // Definir la función no la ejecuta: hay que llamarla.
    fetchCharacters();
  }, []);

  /** Agrega un personaje a la lista en memoria (no persiste en la API). */
  const addCharacter = (character: Character) => {
    setCharacters((prevCharacters) => [...prevCharacters, character]);
  };

  /** Quita el personaje con ese id. */
  const removeCharacter = (id: number) => {
    setCharacters((prevCharacters) => prevCharacters.filter((c) => c.id !== id));
  };

  /** Reemplaza el personaje cuyo id coincide. */
  const updateCharacter = (character: Character) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((c) => (c.id === character.id ? character : c))
    );
  };

  return (
    <ApiContext.Provider
      value={{ characters, loading, error, addCharacter, removeCharacter, updateCharacter }}
    >
      {children}
    </ApiContext.Provider>
  );
}

/**
 * Consumidor: solo lee el contexto, no tiene estado propio.
 *
 * @throws Error si se usa fuera de un `ApiProvider`.
 */
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi debe usarse dentro de un ApiProvider");
  }
  return context;
}
