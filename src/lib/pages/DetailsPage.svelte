<script>
    import { onMount } from 'svelte';
    import { pokemonList, selectedMoves, selectedPokemon, selectedType } from '../store';
    import { goToHome, goToMoveComparison } from '../utils';
    import { fetchByType, fetchPokeDetails, getEvolutionChain } from '../services/pokemonService';
    import { writable } from 'svelte/store';
    import PokemonHeader from '../components/DetailsPage/PokemonHeader.svelte';
    import PokemonStats from '../components/DetailsPage/PokemonStats.svelte';
    import PokemonMoves from '../components/DetailsPage/PokemonMoves.svelte';
    import PokemonEvolutions from '../components/DetailsPage/PokemonEvolutions.svelte';
    import BackToPokedexButton from '../components/BackToPokedexButton.svelte';
  
  
    let pokemon = writable();
    let evolutions = writable([]);
    let showMoves = writable(false);
  
    onMount(async () => {
      pokemon.set(await fetchPokeDetails());
      evolutions.set(await getEvolutionChain($selectedPokemon.name));
    });
  </script>
  
  {#if $selectedPokemon && $selectedPokemon.imageUrl && $evolutions.length}
  <div class="max-w-4xl w-full mx-auto bg-white shadow-lg rounded-xl text-black p-8">
    <h1 class="text-4xl font-extrabold capitalize text-center mb-6">
      {$selectedPokemon.name}
    </h1>

    <div class="flex gap-8 items-start">
      <div class="w-1/3 text-center">
        <PokemonHeader 
          pokemon={$pokemon}
          on:selectType={(e) => {
            goToHome(e.detail);
            selectedType.set(e.detail);
            pokemonList.set([]);
            fetchByType(e.detail);
          }}
        />
      </div>

      <div class="w-2/3">
        <PokemonStats pokemon={$pokemon} />
      </div>
    </div>

    <PokemonMoves
      pokemon={$pokemon}
      bind:showMoves={$showMoves}
      on:compareMoves={() => {
        if ($selectedMoves.length === 2) goToMoveComparison();
      }}
    />

    <PokemonEvolutions 
      evolutions={$evolutions}
      on:selectEvolution={async (e) => {
        selectedPokemon.set({ name: e.detail.name, url: '', imageUrl: e.detail.image });
        pokemon.set(await fetchPokeDetails());
        evolutions.set(await getEvolutionChain($selectedPokemon.name));
      }}
    />

    <div class="text-center mt-5">
      <BackToPokedexButton {selectedType} />
    </div>
  </div>
{:else}
  <p class="text-center mt-12 text-lg font-bold">Cargando datos...</p>
{/if}

  