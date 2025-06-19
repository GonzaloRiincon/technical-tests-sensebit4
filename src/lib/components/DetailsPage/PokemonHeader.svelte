<script>
    import { capitalize } from '../../utils';
    import { typeColors } from '../../constants';
    import { createEventDispatcher } from 'svelte';
  
    export let pokemon;
    const dispatch = createEventDispatcher();
  
    const getTypeColor = (type) => typeColors[type] || '#777';
    const selectType = (type) => dispatch('selectType', type);
  </script>
  
  <img src={pokemon.sprites.other['official-artwork'].front_default}  alt={pokemon.name} class="w-60 rounded-2xl shadow-lg border-2 border-gray-300 mx-auto mb-4" />
  <div class="flex justify-center gap-2 mt-4">
    {#each pokemon.types as type}
      <button 
        class="px-4 py-2 rounded-lg shadow-md text-white font-semibold text-center"
        style="background-color: {getTypeColor(type.type.name)}; min-width: 100px"
        on:click={() => selectType(type.type.name)}
      >
        {capitalize(type.type.name)}
      </button>
    {/each}
  </div>
  