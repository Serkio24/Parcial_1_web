"use client";
import SerieList from './SerieList'
import { useLocalStorageContext } from './LocalStorageAsContext'

export default function SerieListContainer({ emptyMessage }: { emptyMessage: string }) {
  const { series } = useLocalStorageContext()
  return <SerieList series={series} emptyMessage={emptyMessage} />
}
