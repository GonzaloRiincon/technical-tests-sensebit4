import { derived, writable } from 'svelte/store';

export interface Pokemon {
    name: string;
    url: string;
    imageUrl?: string;
    height?: number;
}
export const activeScreen = writable('home');

export const pokemonList = writable<Pokemon[]>([]);
export const imagesLoading = writable(true);
export const loadedImagesCount = writable(0);
export const totalImagesCount = writable(0);

export const selectedType = writable('')

export const selectedPokemon = writable<Pokemon>();

export const filterHeight = writable(0);
export const sortAscending = writable(2);

export const filteredPokemonList = derived(
    [pokemonList, filterHeight, sortAscending],
    ([$pokemonList, $filterHeight, $sortAscending]) => {

        const filteredList = $pokemonList.filter(
            (p, index, self) => (!$filterHeight || p.height >= $filterHeight) &&
                self.findIndex(pk => pk.name === p.name) === index
        );

        if ($sortAscending !== 2) {
            filteredList.sort((a, b) => $sortAscending === 1 ? a.height - b.height : b.height - a.height);
        }

        return filteredList;
    }
);

export const comparisonMode = writable(false);
export const selectedPokemons = writable<any[]>([]);

export const selectedMoves = writable<string[]>([]);
