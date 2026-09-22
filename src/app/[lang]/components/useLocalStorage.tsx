"use client";
import { useState, useEffect } from "react";

/**
 * Hook genérico de estado persistido en `localStorage`.
 *
 * Se comporta como `useState`, pero:
 *  - inicializa el valor leyéndolo de `localStorage` (si existe),
 *  - vuelve a escribirlo cada vez que cambia.
 *
 * El guard `typeof window === "undefined"` es necesario porque el componente
 * también se renderiza en el servidor, donde no hay `localStorage`.
 *
 * NOTA: hoy este hook no lo usa nadie de forma efectiva —
 * `LocalStorageAsContext` lo importa pero implementa su propia persistencia.
 *
 * @param key          Clave bajo la que se guarda en localStorage.
 * @param initialValue Valor por defecto si no hay nada guardado.
 * @returns Tupla `[valor, setValor]` al estilo `useState`.
 */
export function useLocalStorage(key: string, initialValue: string) {
    // Inicialización perezosa: el callback solo corre en el primer render.
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // JSON corrupto o acceso bloqueado: se cae al valor por defecto.
            console.error(error);
            return initialValue;
        }
    });

    // Sincroniza el valor hacia localStorage en cada cambio.
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}
