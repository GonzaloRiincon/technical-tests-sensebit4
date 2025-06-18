<script lang="ts">
  import type { Pokemon } from '../store.ts';
  import PokemonCard from './PokemonCard.svelte';

  export let pokemonList: Pokemon[]; 
</script>

<section class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {#if pokemonList.length > 0}
    {#each pokemonList as pokemon}
      <PokemonCard {pokemon} />
    {/each}
  {:else}
    <p class="text-center col-span-full font-bold">No hay Pokémon disponibles.</p>
  {/if}
</section>
