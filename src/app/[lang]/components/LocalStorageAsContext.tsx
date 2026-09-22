"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Character } from "../rickymorty/CharacterCard";

/**
 * Contexto global de series persistidas en `localStorage`.
 *
 * Hace las veces de "base de datos" del cliente: mantiene el arreglo de series
 * en estado de React y lo sincroniza con `localStorage` bajo la clave `"series"`.
 * Se monta en el root layout, así que cualquier client component del árbol
 * puede consumirlo con `useLocalStorageContext()`.
 */
const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);

/** API que el provider expone a sus consumidores. */
interface LocalStorageContextType {
  /** Series actualmente guardadas. */

  characters: Character[];
  /** Agrega un personaje; el `id` lo genera el provider. */
  addCharacter: (character: Omit<Character, 'id'>) => void;

  removeCharacter: (id: number) => void;
  updateCharacter: (character: Character) => void;
  /** Agrega una serie; el `id` lo genera el provider. */
}

/**
 * Provider del contexto. Debe envolver toda la app (se hace en el root layout).
 */
export function LocalStorageProvider({ children }: { children: React.ReactNode }) {
    // Fuente de verdad en memoria. Arranca vacío para que el HTML del servidor
    // y el primer render del cliente coincidan (evita errores de hidratación).
    // NOTA: este hook no se está usando; la persistencia real son los dos
    // efectos de abajo. Se puede eliminar o migrar la lógica a él.
    const [storedValue, setStoredValue] = useLocalStorage("series", JSON.stringify([]));
    const [characters, setCharacters] = useState<Character[]>([]);

    // Carga inicial: una sola vez, ya montado en el navegador.
    useEffect(() => {
        try {
            const saved = localStorage.getItem("characters");
            if (saved) {
                setCharacters(JSON.parse(saved));
            }
        } 
        catch (error) {
            console.error("Error parsing saved characters", error);
        }
    }, []);

    // Guardado: cada vez que cambia el arreglo se vuelca a localStorage.
    useEffect(() => {
        try {
            localStorage.setItem("characters", JSON.stringify(characters));
        } catch (error) {
            console.error("Error saving characters", error);
        }
    }, [characters]);



    /** Añade un personaje asignándole como id el timestamp actual. */
    const addCharacter = (character: Omit<Character, 'id'>) => {
        // El `id` va DESPUÉS del spread para que pise el que traiga el objeto.
        setCharacters((prevCharacters) => [...prevCharacters, { ...character, id: Date.now() }]);
    };
    
    const removeCharacter = (id: number) => {
        setCharacters((prevCharacters) => prevCharacters.filter((character) => character.id !== id));
    };

    const updateCharacter = (updatedCharacter: Character) => {
        setCharacters((prevCharacters) =>
            prevCharacters.map((character) => (character.id === updatedCharacter.id ? updatedCharacter : character))
        );
    }

   
    return (
        <LocalStorageContext.Provider value={{ characters, addCharacter, removeCharacter, updateCharacter }}>
            {children}
        </LocalStorageContext.Provider>
    );
}

/**
 * Accede al contexto de series.
 *
 * @throws Error si se llama fuera de un `LocalStorageProvider` — así se detecta
 *         en desarrollo que falta el provider en lugar de recibir `undefined`.
 */
export function useLocalStorageContext() {
    const context = useContext(LocalStorageContext);
    if (!context) {
        throw new Error("useLocalStorageContext must be used within a LocalStorageProvider");
    }
    return context;
}
