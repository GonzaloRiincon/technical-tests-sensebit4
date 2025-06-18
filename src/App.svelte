<script>
  import './app.pcss';
  import { onDestroy, onMount } from 'svelte';
  import {activeScreen , pokemonList, imagesLoading, totalImagesCount, loadedImagesCount , selectedPokemon, selectedType } from './lib/store';
    import PokemonDetails from './lib/components/PokemonDetails.svelte';
    import Home from './lib/components/Home.svelte';
    import Comparison from './lib/components/Comparison.svelte';
    import MoveComparison from './lib/components/MoveComparison.svelte';
    import { fetchTypes } from './lib/services/pokemonService';

  let types = [];
  let bottomElement = null;
  let observer;
  let offset = 0;
  const limit = 20; 

  onMount(async() => {
   types = await fetchTypes();

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePokemon();
        }
      },
      { threshold: 1.0 }
    );

    
    const checkElement = setInterval(() => {
      if (bottomElement) {
        observer.observe(bottomElement);
        clearInterval(checkElement);
      }
    }, 100);
  });



  const loadMorePokemon = async () => {
    if (!selectedType) return;

    const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
    const data = await res.json();

    const newPokemonArray = data.pokemon.slice(offset, offset + limit).map(p => p.pokemon);

    pokemonList.update(current => [...current, ...newPokemonArray]); 

    totalImagesCount.set(newPokemonArray.length);
    loadedImagesCount.set(0);
    imagesLoading.set(true);

    offset += limit; 
  };

  onDestroy(() => {
    observer.disconnect();
  });
</script>

<main class="p-4">
  {#if $activeScreen == 'home'}
    <Home/>
  {:else if ($activeScreen == 'details' )}
    <PokemonDetails/>
  {:else if ($activeScreen == 'comparison' )}
    <Comparison/>
  {:else if ($activeScreen == 'moveComparison' )}
    <MoveComparison/>
   {/if}
</main>


<style>
  main {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
