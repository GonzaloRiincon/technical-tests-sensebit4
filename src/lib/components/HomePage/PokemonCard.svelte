<script>
  export let pokemon;
  import { imagesLoading, loadedImagesCount,  totalImagesCount, comparisonMode, selectedPokemons } from '../../store';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
    import {  goToComparison, goToDetails } from '../../utils';

  const dispatch = createEventDispatcher();

  onMount(async() => {
  });

    function handleImageLoad() {
    loadedImagesCount.update(n => n + 1);
    if ($loadedImagesCount >= $totalImagesCount) {
      imagesLoading.set(false); 
    }
  }
  
  const handleClick = () => {
    dispatch('select', pokemon);
    
    if (!$comparisonMode) {
      goToDetails(pokemon);
      return;
    }
    
    selectedPokemons.update(currentList => {
      const isSelected = currentList.some(p => p.name === pokemon.name);
      
      if (isSelected) {
        return currentList.filter(p => p.name !== pokemon.name); 
      } 
      
      if (currentList.length < 2) {
        return [...currentList, pokemon]; 
      }
      
      return currentList;
    });
    
    if ($selectedPokemons.length === 2) {
      goToComparison(); 
    }
  };
  
  const getPokemonClass = (pokemon) => {
  if ($selectedPokemons.length === 0 || !$selectedPokemons.includes(pokemon)) return "border-gray-300";
  return $selectedPokemons[0] === pokemon ? "border-red-500" : "border-blue-500";
  };

</script>

<div 
  class="block shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer bg-white border-2 {getPokemonClass(pokemon)}"
  on:click={handleClick}
>
  {#if pokemon.imageUrl}
    <img 
        src={pokemon.imageUrl} 
        alt={pokemon.name} 
        class="w-full h-40 object-contain mb-2" 
        on:load={handleImageLoad}
    />
  {/if}
  <h2 class="text-lg font-semibold capitalize text-center text-black">{pokemon.name}</h2>
</div>
