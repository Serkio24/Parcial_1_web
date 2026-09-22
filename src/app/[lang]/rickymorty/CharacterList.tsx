import Link from "next/link";
import CharacterCard, { Character } from "./CharacterCard";

function CharacterList({ characters, emptyMessage }: { characters: Character[], emptyMessage: string }) {
    
    if (characters.length === 0) {
        return <p>{emptyMessage}</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
            ))}
        </div>
    );
}

export default CharacterList;