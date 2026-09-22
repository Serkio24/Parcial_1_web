"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { Serie } from "./SerieCard";
import { useLocalStorage } from "./useLocalStorage";
const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);

interface LocalStorageContextType {
  series: Serie[];
  addSerie : (serie: Omit<Serie, 'id'>) => void;
  removeSerie: (id: number) => void;
  updateSerie: (serie: Serie) => void;
}

export function LocalStorageProvider({ children }: { children: React.ReactNode }) {
  const [series, setSeries] = useState<Serie[]>([]);
  const [storedValue, setStoredValue] = useLocalStorage("series", JSON.stringify([]));

    useEffect(() => {
        try {
            const saved = localStorage.getItem("series");
            if (saved) {
                setSeries(JSON.parse(saved));
            }
        } catch (error) {
            console.error("Error parsing saved series", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("series", JSON.stringify(series));
        } catch (error) {
            console.error("Error saving series", error);
        }
    }, [series]);

    const addSerie = (serie: Omit<Serie, 'id'>) => {
        setSeries((prevSeries) => [...prevSeries, {...serie, id: Date.now()}]);
    };

    const removeSerie = (id: number) => {
        setSeries((prevSeries) => prevSeries.filter((serie) => serie.id !== id));
    }
    const updateSerie = (updatedSerie: Serie) => {
        setSeries((prevSeries) =>
            prevSeries.map((serie) => (serie.id === updatedSerie.id ? updatedSerie : serie))
        );
    }
    return (
        <LocalStorageContext.Provider value={{ series, addSerie, removeSerie, updateSerie}}>
            {children}
        </LocalStorageContext.Provider>
    );
}

export function useLocalStorageContext() {
    const context = useContext(LocalStorageContext);
    if (!context) {
        throw new Error("useLocalStorageContext must be used within a LocalStorageProvider");
    }
    return context;
}