import { pokemonList, selectedPokemon, activeScreen, selectedPokemons, selectedMoves } from '../store';
import { setupObserver } from '../utils';



const limit = 20;
let offset = 0;
let observer: IntersectionObserver | null = null;

export const fetchTypes = async (): Promise<any[]> => {
    const res = await fetch('https://pokeapi.co/api/v2/type');
    const data = await res.json();
    return data.results;
};


export const fetchByType = async (selectedType: string): Promise<void> => {
    if (!selectedType) return;

    pokemonList.set([]);
    offset = 0;

    if (observer) {
        observer.disconnect();
        observer = null;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
    const data = await res.json();

    if (!data || !data.pokemon) {

        return;
    }


    const newPokemonArray = await Promise.all(
        data.pokemon.slice(0, 20).map(async (p) => {
            const pokeRes = await fetch(p.pokemon.url);
            const pokeData = await pokeRes.json();
            return {
                name: pokeData.name,
                imageUrl: pokeData.sprites.other["official-artwork"].front_default,
                height: pokeData.height,
            };
        })
    );
    pokemonList.set(newPokemonArray);

    setTimeout(() => {
        const bottomElement = document.querySelector('#bottom-element');
        if (bottomElement) {
            setupObserver(bottomElement, selectedType);
        }
    }, 500);
};

export const fetchImage = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.sprites.other['official-artwork'].front_default || '';
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
    }
};

export const fetchPokeDetails = async () => {

    let pokemonName = '';

    selectedPokemon.subscribe(value => {
        pokemonName = value.name;
    });

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await res.json();
    return data;
}

export const fetchMoveComparisonData = async (moves) => {
    return Promise.all(
        moves.map(async (move) => {
            const res = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
            const data = await res.json();

            // 🔹 Obtener los tipos de los Pokémon que aprenden el movimiento de forma concurrente
            const typePromises = data.learned_by_pokemon.map(async (pokemon) => {
                const typeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const typeData = await typeRes.json();
                return typeData.types[0].type.name;
            });

            const types = await Promise.all(typePromises);

            // 🔹 Contar cuántos Pokémon de cada tipo pueden aprender el movimiento
            return types.reduce((typeCount, primaryType) => {
                typeCount[primaryType] = (typeCount[primaryType] || 0) + 1;
                return typeCount;
            }, {});
        })
    );
};

export const getEvolutionChain = async (pokemonName) => {
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const speciesData = await speciesRes.json();

    const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json();

    let evolutions = [];
    let currentStage = evolutionData.chain;

    while (currentStage) {
        let name = currentStage.species.name;

        const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonData = await pokemonRes.json();
        let image = pokemonData.sprites.other["official-artwork"].front_default;

        evolutions.push({ name, image });
        currentStage = currentStage.evolves_to[0];
    }

    return evolutions;
};

export const getPokemonData = async (pokemonA, pokemonB) => {
    if (!pokemonA || !pokemonB) return;

    const [dataA, dataB] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonA.name}`).then(res => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonB.name}`).then(res => res.json()),
    ]);

    return {
        pokemonA: {
            name: dataA.name,
            imageUrl: dataA.sprites.other["official-artwork"].front_default || '',
            height: dataA.height ?? 0,
            weight: dataA.weight ?? 0,
            moves: dataA.moves.map(m => m.move.name) ?? []
        },
        pokemonB: {
            name: dataB.name,
            imageUrl: dataB.sprites.other["official-artwork"].front_default || '',
            height: dataB.height ?? 0,
            weight: dataB.weight ?? 0,
            moves: dataB.moves.map(m => m.move.name) ?? []
        }
    };
};




export const loadMorePokemon = async (selectedType: string): Promise<void> => {
    if (!selectedType) return;

    const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
    const data = await res.json();

    const newPokemonArray = await Promise.all(
        data.pokemon.slice(offset, offset + limit).map(async (p) => {
            const pokeRes = await fetch(p.pokemon.url);
            const pokeData = await pokeRes.json();


            return {
                name: pokeData.name,
                imageUrl: pokeData.sprites.other["official-artwork"].front_default || '',
                height: pokeData.height ?? 0
            };
        })
    );


    pokemonList.update(current => [...current, ...newPokemonArray]);

    offset += limit;
};
