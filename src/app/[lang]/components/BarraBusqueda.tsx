/**
 * Buscador. Componente CONTROLADO: no tiene useState propio.
 * El valor y la función para cambiarlo llegan por props desde cardlist.tsx,
 * que es quien realmente filtra. Así el mismo texto puede combinarse con
 * el filtro de estado.
 *
 * NUEVA API: este archivo no cambia. Lo que cambia es el campo por el que
 * busca cardlist.tsx (hoy `c.name`).
 */
'use client'

import { useDiccionario } from './DiccionarioContext'
import React from 'react'
// Componente de barra de búsqueda que utiliza el diccionario para el placeholder y aria-label.
interface SearchBarProps {
  value: string                        // lo que se ve escrito
  onChange: (value: string) => void    // qué hacer cuando el usuario escribe
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { dictionary } = useDiccionario()
    return (
        <input
        type="search" // muestra la "x" para limpiar en la mayoría de navegadores
        value={value}
        // e.target.value es lo que hay escrito; se lo mandamos al padre.
        onChange={(e) => onChange(e.target.value)}
        placeholder={dictionary.list.searchPlaceholder} // hasta el placeholder sale del diccionario
        aria-label={dictionary.list.searchPlaceholder}  // para lectores de pantalla
        className="flex-1 rounded border bg-white px-3 py-2"
        />
    )
}