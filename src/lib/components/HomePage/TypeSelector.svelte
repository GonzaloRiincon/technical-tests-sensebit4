<script>
    import { fetchByType, fetchTypes } from '../../services/pokemonService';
    import {  selectedType } from '../../store';
    import { typeTranslations } from '../../constants';
    import { capitalize } from '../../utils';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let types = writable([]);
  
    onMount(async () => {
     const typesArr = await fetchTypes();
     types.set(typesArr)
    });

</script>


<select id="type-select" bind:value={$selectedType} on:change={() => fetchByType($selectedType)} 
  class="p-3 border-2 border-yellow-400 rounded-xl text-black text-lg font-semibold bg-white shadow-md hover:shadow-lg transition">
  <option value="">-- Selecciona un tipo --</option>
  {#each $types as type}
  <option value={type.name}>{typeTranslations[type.name] || capitalize(type.name)}</option>
  {/each}
</select>