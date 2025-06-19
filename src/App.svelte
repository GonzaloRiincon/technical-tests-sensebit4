<script>
  import './app.pcss';
  import {activeScreen  } from './lib/store';
    import HomePage from './lib/pages/HomePage.svelte';
    import DetailsPage from './lib/pages/DetailsPage.svelte';
    import PokemonComparisonPage from './lib/pages/PokemonComparisonPage.svelte';
    import MoveComparisonPage from './lib/pages/MoveComparisonPage.svelte';
</script>

<main class="p-4">
  {#if $activeScreen == 'home'}
    <HomePage/>
  {:else if ($activeScreen == 'details' )}
    <DetailsPage/>
  {:else if ($activeScreen == 'comparison' )}
    <PokemonComparisonPage/>
  {:else if ($activeScreen == 'moveComparison' )}
    <MoveComparisonPage/>
   {/if}
</main>


<style>
  main {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
