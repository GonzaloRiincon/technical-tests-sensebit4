import { derived, writable } from 'svelte/store';

export interface Pokemon {
    name: string;
    url: string;
    imageUrl?: string;
    height?: number;
}

export const activeScreen = writable('home');


export const imagesLoading = writable(true);
export const loadedImagesCount = writable(0);
export const totalImagesCount = writable(0);


export const selectedType = writable('')
export const selectedPokemon = writable<Pokemon>();
export const selectedPokemons = writable<any[]>([]);
export const selectedMoves = writable<string[]>([]);


export const searchQuery = writable('');
export const filterHeight = writable(0);
export const sortAscending = writable(2);
export const comparisonMode = writable(false);


export const pokemonList = writable<Pokemon[]>([]);
export const filteredPokemonList = derived(
    [pokemonList, filterHeight, sortAscending, searchQuery],
    ([$pokemonList, $filterHeight, $sortAscending, $searchQuery]) => {

        const filteredList = $pokemonList.filter(
            p => (!$filterHeight || p.height >= $filterHeight) &&
                p.name.toLowerCase().includes($searchQuery.toLowerCase())
        );

        if ($sortAscending !== 2) {
            filteredList.sort((a, b) => $sortAscending === 1 ? a.height - b.height : b.height - a.height);
        }

        return filteredList;
    }
);



