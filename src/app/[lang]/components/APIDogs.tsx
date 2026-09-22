"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import  type {Razas} from "./RazasCard";

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
  razas: Razas[];
  /** `true` mientras la petición inicial está en curso. */
  loading: boolean;
  /** Mensaje de error si la petición falló, `null` si todo fue bien. */
  error: string | null;
  /** Agrega un personaje a la lista en memoria (no persiste en la API). */
  addRaza: (character: Razas) => void;
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
  const [razas, setRazas] = useState<Razas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carga inicial: se ejecuta una vez, ya montado en el navegador.
  useEffect(() => {
    const fetchRazas = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        console.log(data.message.Object);
        setRazas(data.Object.keys(data.message).map((breed: string) => ({ nombre: breed })));
      } catch (e) {
        console.error("Error fetching razas:", e);
        setError("No se pudieron cargar los razas");
      } finally {
        // Pase lo que pase se apaga el loading, si no la UI se queda colgada.
        setLoading(false);
      }
    };

    // Definir la función no la ejecuta: hay que llamarla.
    fetchRazas();
  }, []);

  /** Agrega un personaje a la lista en memoria (no persiste en la API). */
  const addRaza = (raza: Razas) => {
    setRazas((prevRazas) => [...prevRazas, raza]);
  };

 

  return (
    <ApiContext.Provider
      value={{ razas, loading, error, addRaza }}
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
