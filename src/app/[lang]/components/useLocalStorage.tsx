"use client";
import { useState, useEffect } from "react";

export function useLocalStorage(key: string, initialValue: string) {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}