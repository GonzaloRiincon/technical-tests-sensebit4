<script>
  import PokemonList from './PokemonList.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import { capitalize } from '../utils';
  import {  imagesLoading, selectedType, filterHeight , sortAscending, filteredPokemonList, comparisonMode, searchQuery} from '../store';
  import { onMount } from 'svelte';
    import { typeTranslations } from '../constants';
    import { fetchByType, fetchTypes } from '../services/pokemonService';
    import { writable } from 'svelte/store';

  let types = writable([]);

  onMount(async () => {
   const typesArr = await fetchTypes();
   types.set(typesArr)
  });

</script>


{#if $selectedType}
  <div class="flex items-center justify-between mb-6 gap-6"> 
    <div class="relative w-1/2"> 
      <input 
      type="text" 
      bind:value={$searchQuery} 
      placeholder="Buscar Pokémon..." 
      class="px-3 py-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 pl-10 h-12"
      >
      <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"/>
      </svg>
    </div>

    <button on:click={() => comparisonMode.set(!$comparisonMode)} class="p-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition w-auto">
      {#if $comparisonMode}🔄 Cancelar Comparación{:else}📊 Comparar Pokémons{/if}
    </button>
  </div>
  <section class="mb-8 flex justify-between items-center">
    <select id="type-select" bind:value={$selectedType} on:change={() => fetchByType($selectedType)} class="p-2 rounded text-black">
      <option value="">-- Selecciona un tipo --</option>
      {#each $types as type}
        <option value={type.name}>{typeTranslations[type.name] || capitalize(type.name)}</option>
      {/each}
    </select>
  </section>
  <section class="mb-6 flex items-center gap-4">
    <div class="flex items-center rounded-lg p-2 bg-gray-100">
      <label for="height-filter" class="font-bold">Altura mínima:   </label>
      <input id="height-filter" type="number" bind:value={$filterHeight} 
      class="bg-transparent border-none outline-none text-black w-16 text-center" 
      />
    </div>

    <button on:click={() => sortAscending.set($sortAscending === 2 ? 1 : $sortAscending === 1 ? 0 : 2)} class="p-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition">
      {#if $sortAscending == 1}⬆️ Ascendente{:else if $sortAscending == 0}⬇️ Descendente {:else} Ordenar por altura{/if}
    </button>
  </section>

  {#if $filteredPokemonList.length > 0}
  <PokemonList pokemonList={$filteredPokemonList} />
  <div id="bottom-element" class="h-1 w-full"></div>
  {:else if $imagesLoading}
  <LoadingSpinner />
  {:else}
  <p class="text-center mt-12 text-lg font-bold">No hay Pokémon que cumplan el filtro.</p>
  {/if}

{:else}
<div class="text-center mb-8 bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-lg">
  <h1 class="text-6xl font-extrabold text-yellow-400">
    ¡Bienvenido a la Pokédex!
  </h1>
  <p class="text-lg text-blue-500 mt-2 font-semibold">Explora y descubre los Pokémon por tipo.</p>
</div>
<section class="flex flex-col items-center mb-8">
  <select id="type-select" bind:value={$selectedType} on:change={() => fetchByType($selectedType)} 
    class="p-3 border-2 border-yellow-400 rounded-xl text-black text-lg font-semibold bg-white shadow-md hover:shadow-lg transition">
    <option value="">-- Selecciona un tipo --</option>
    {#each $types as type}
      <option value={type.name}>{typeTranslations[type.name] || capitalize(type.name)}</option>
    {/each}
  </select>
</section>
{/if}

  <style>
    button {
      background-color: white;
      color: black;
    }
    h1 {
    font-family: 'Luckiest Guy', cursive;
    }
  </style>