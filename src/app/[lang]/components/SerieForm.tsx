"use client";
import { useState } from "react";
import { useLocalStorageContext } from "./LocalStorageAsContext";
import { useRouter } from "next/navigation";
import { isString } from "util";

export interface Serie {
    id: number;
    number: number;
    title: string;
    description: string;
    rating: string;
}

type Errores = {
    titleerror: string;
    descriptionerror: string;
    ratingerror: string;
};

type formProps = {
    title: string;
    description: string;
    rating: string;
    submit: string;
};








function SerieForm( {lang, errores, formProps} : {lang: string, errores: Errores, formProps: formProps}) {
    const [serie, setSerie] = useState<Serie>({
        id: 0,
        number: 0,
        title: "",
        description: "",
        rating: "",
    });
    
    const { addSerie } = useLocalStorageContext();
    const router = useRouter();
    const [error, setError] = useState<Partial<Serie>>({});

    const validate = (): boolean => {
        const newError: Partial<Serie> = {};
        if (!serie.title) {
            newError.title = errores.titleerror;
        }
        if (!serie.description) {
            newError.description = errores.descriptionerror;
        }
        if (Number(serie.rating) < 0 || Number(serie.rating) > 10 || isNaN(Number(serie.rating)) || typeof serie.rating !== "string") {
            newError.rating = errores.ratingerror;
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSerie({...serie, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            addSerie({
                number: serie.number,
                title: serie.title,
                description: serie.description,
                rating: Number(serie.rating)
            });
            router.push(`/${lang}/series`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
            <div> <input type="text" name="number" value={serie.number} onChange={handleChange}/>
            {error.number && <span className="text-red-500">{error.number}</span>}
            </div>

            <div>
            <input type="text" name="title" placeholder={formProps.title} value={serie.title} onChange={handleChange}/>
                {error.title && <span className="text-red-500">{error.title}</span>}
        
            </div>
            <div>
            <input type="text" name="description" placeholder={formProps.description} value={serie.description} onChange={handleChange}/>
                {error.description && <span className="text-red-500">{error.description}</span>}
        
            </div>

            <div>
            <input type="text" name="rating" placeholder={formProps.rating} value={serie.rating} onChange={handleChange}/>
                {error.rating && <span className="text-red-500">{error.rating}</span>}
            </div>
            <button type="submit">{formProps.submit}</button>
        </form>

    );
}

export default SerieForm;