<script>
  import PokemonList from './PokemonList.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import { capitalize } from '../utils';
  import {  imagesLoading, selectedType, filterHeight , sortAscending, filteredPokemonList, comparisonMode} from '../store';
  import { onMount } from 'svelte';
    import { typeTranslations } from '../constants';
    import { fetchByType, fetchTypes } from '../services/pokemonService';

  let types = [];

  onMount(async () => {
    types = await fetchTypes();
  });

</script>

<h1 class="text-3xl font-bold mb-6 text-center">Pokédex</h1>

<section class="mb-8 flex justify-between items-center">
  <div class="flex gap-4 items-center">
    <label for="type-select" class="font-bold">Elige un tipo de Pokémon:</label>
    <select id="type-select" bind:value={$selectedType} on:change={() => fetchByType($selectedType)} class="p-2 border rounded text-black">
      <option value="">-- Selecciona un tipo --</option>
      {#each types as type}
        <option value={type.name}>{typeTranslations[type.name] || capitalize(type.name)}</option>
      {/each}
    </select>
  </div>
  {#if $selectedType}
  <button on:click={() => comparisonMode.set(!$comparisonMode)} class="p-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
    {#if $comparisonMode}🔄 Cancelar Comparación{:else}📊 Comparar Pokémons{/if}
  </button>
  {/if}
</section>

{#if $selectedType}
  <section class="mb-6 flex justify-start gap-4">
    <label for="height-filter" class="font-bold">Altura mínima:</label>
    <input id="height-filter" type="number" bind:value={$filterHeight} class="p-2 border rounded text-black w-24 text-center" />

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
{/if}


  <style>
    button {
      background-color: white;
      color: black;
    }
  </style>