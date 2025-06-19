<script>
    import {  imagesLoading, selectedType, filteredPokemonList,} from '../store';
    import PokemonList from '../components/HomePage/PokemonList.svelte';
    import LoadingSpinner from '../components/LoadingSpinner.svelte';
    import WelcomeBanner from '../components/HomePage/WelcomeBanner.svelte';
    import TypeSelector from '../components/HomePage/TypeSelector.svelte';
    import SearchAndCompareBar from '../components/HomePage/SearchAndCompareBar.svelte';
    import HeightSorter from '../components/HomePage/HeightSorter.svelte';
  

  
  </script>
  
  
  {#if $selectedType}
    <SearchAndCompareBar/>
    <section class="mb-8 flex justify-between items-center">
        <TypeSelector/>
    </section>
    <HeightSorter/>
  
    {#if $filteredPokemonList.length > 0}
        <PokemonList pokemonList={$filteredPokemonList} />
        <div id="bottom-element" class="h-1 w-full"></div>
    {:else if $imagesLoading}
        <LoadingSpinner />
    {:else}
        <p class="text-center mt-12 text-lg font-bold">No hay Pokémon que cumplan el filtro.</p>
    {/if}
  
  {:else}
    <WelcomeBanner/>
  {/if}