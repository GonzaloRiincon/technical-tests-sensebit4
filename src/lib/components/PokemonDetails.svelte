<script>
  import { pokemonList, selectedMoves, selectedPokemon, selectedType } from '../store';
  import {  onMount } from 'svelte';
  import { capitalize,  goToHome, goToMoveComparison } from '../utils';
  import { writable } from 'svelte/store';
    import { typeColors } from '../constants';
    import { fetchByType, fetchPokeDetails, getEvolutionChain } from '../services/pokemonService';

  let pokemon = writable();

  let evolutions = writable([])

  let showMoves = writable(false);

 

  onMount(async () => {
    pokemon.set(await fetchPokeDetails());
    evolutions.set( await getEvolutionChain($selectedPokemon.name))
  });

  const getTypeColor = (type) => {
    return typeColors[type] || "#777"; 
  }

  const handleClickType = (type) => {
    goToHome(type)
    pokemonList.set([])
    selectedType.set(type)
    fetchByType(type)
  }

  const handleClickEvo = async (poke) => {
    selectedPokemon.set({name:poke.name, url:'', imageUrl:poke.image})
    pokemon.set(await fetchPokeDetails());
    evolutions.set( await getEvolutionChain($selectedPokemon.name))
  }

  const selectMove = (move) => {
    selectedMoves.update(currentMoves => {
      if (currentMoves.includes(move)) {
        return currentMoves.filter(m => m !== move); 
      }

      if (currentMoves.length < 2) {
        return [...currentMoves, move]; 
      }

      return currentMoves;
    });

    if ($selectedMoves.length === 2) {
      goToMoveComparison(); 
    }
  };

  const getMoveClass = (move) => {
    if ($selectedMoves.length === 0 || !$selectedMoves.includes(move)) return "text-black";
    return $selectedMoves[0] === move ? "text-red-500" : "text-blue-500";
  };

</script>

{#if $selectedPokemon && $selectedPokemon.imageUrl && $evolutions.length}
 <div class="p-8 max-w-4xl w-full mx-auto bg-white shadow-lg rounded-xl text-black">
 <h1 class="text-4xl font-extrabold capitalize text-gray-800 text-center mb-6 ">
  {$selectedPokemon.name}
</h1>

  <div class="flex gap-8 items-start">
    
    <div class="w-1/3 text-center">
      <img src={$selectedPokemon.imageUrl} alt={$selectedPokemon.name} class="w-60 rounded-2xl shadow-lg border-2 border-gray-300 mx-auto mb-4" />
      <div class="flex justify-center gap-2 mt-4">
        {#each $pokemon.types as type}
          <button 
            class="px-4 py-2 rounded-lg shadow-md text-white font-semibold text-center"
            style="background-color: {getTypeColor(type.type.name)}; min-width: 100px"
            on:click={() => handleClickType(type.type.name)}
          >
            {capitalize(type.type.name)}
          </button>
        {/each}
      </div>
    </div>

    <div class="w-2/3 grid grid-cols-2 gap-4 text-left text-gray-800">
      {#each $pokemon.stats as stat}
        <div class="bg-gray-200 p-3 rounded-lg shadow-sm flex justify-between">
          <span class="font-medium text-black">{capitalize(stat.stat.name)}</span>
          <span class="text-blue-700 font-bold">{stat.base_stat}</span>
        </div>
      {/each}
    </div>
  </div>
  <h2 class="text-2xl font-semibold mt-8 text-center cursor-pointer text-black hover:text-gray-700 transition" on:click={()=> showMoves.set(!$showMoves)}>
    Movimientos de {capitalize($selectedPokemon.name)} 
    {#if $showMoves}⬆️{:else}⬇️{/if}
  </h2>
  {#if $showMoves}
    <div class="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <ul class="grid grid-cols-2 gap-2">
        {#each $pokemon.moves as move}
          <li class="font-medium cursor-pointer hover:text-gray-500 transition {getMoveClass(move.move.name)}" on:click={() => selectMove(move.move.name)}>
            {capitalize(move.move.name)}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  <h2 class="text-2xl font-semibold mt-8 text-center">Cadena Evolutiva</h2>
  <div class="flex justify-center gap-6 mt-6">
    {#each $evolutions as evolution}
      <div class="text-center cursor-pointer" on:click={()=> handleClickEvo(evolution)}>
        <img src="{evolution.image}" alt="{evolution.name}" class="w-24 h-24 mx-auto rounded-lg shadow-md border-2 border-gray-300">
        <p class="text-lg font-semibold capitalize text-black mt-2">{capitalize(evolution.name)}</p>
      </div>
    {/each}
  </div>
    <button 
      on:click={() => goToHome($selectedType)}
      class="px-5 py-2 mt-5 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition shadow-md"
    >
      Volver a la Pokédex
    </button>
</div>
{:else}
  <p class="text-center mt-12 text-lg font-bold">Cargando datos...</p>
{/if}
