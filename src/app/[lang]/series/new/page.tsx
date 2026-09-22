import SerieForm from '../../components/SerieForm';
import { getDictionary, hasLocale } from '../../diccionarios';
import { notFound } from 'next/navigation';



export default async function NewSeriePage( { params }: PageProps<'/[lang]/series/new'> ) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    const dict = await getDictionary();




  return (
    <div className="flex flex-col items-center mr-auto gap-4">
        <main>
            <h1 className="text-2xl font-bold">New Serie</h1>
            <SerieForm lang={lang} errores={dict.errores} formProps={dict.formulario}/>
        </main>
    </div>
  );
}