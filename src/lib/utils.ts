import { loadMorePokemon } from './services/pokemonService';
import { selectedPokemon, activeScreen, selectedPokemons, selectedMoves, comparisonMode } from './store';

let observer: IntersectionObserver | null = null;

export const capitalize = (word) => {
	return word.charAt(0).toUpperCase() + word.slice(1)
}

//Observer del scroll infinito
export const setupObserver = (bottomElement: Element, selectedType: string): void => {
	observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				loadMorePokemon(selectedType);
			}
		},
		{ threshold: 1.0 }
	);

	observer.observe(bottomElement);
};


//CAMBIO DE PANTALLAS

export const goToDetails = (pokemon) => {
	selectedPokemon.set(pokemon);
	comparisonMode.set(false)
	activeScreen.set('details');
};

export const goToHome = (selectedType: string) => {
	activeScreen.set('home');
	selectedPokemons.set([])
	selectedMoves.set([])

	//Esto es necesario para el scroll infinito, si entras a detalles y sales no funciona el scroll sin esto
	setTimeout(() => {
		const bottomElement = document.querySelector('#bottom-element');
		if (bottomElement) {
			setupObserver(bottomElement, selectedType);
		}
	}, 500);
};

export const goToComparison = () => {
	activeScreen.set('comparison');
};

export const goToMoveComparison = () => {
	activeScreen.set('moveComparison');
};







