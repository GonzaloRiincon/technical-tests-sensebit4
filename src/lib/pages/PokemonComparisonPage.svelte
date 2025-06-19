<script>
    import BackToPokedexButton from '../components/BackToPokedexButton.svelte';
    import PokemonComparisonChart from '../components/PokemonComparisonPage/PokemonComparisonChart.svelte';
    import PokemonComparisonHeader from '../components/PokemonComparisonPage/PokemonComparisonHeader.svelte';
    import { selectedType } from '../store';
  </script>
  
  <div class="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg text-center flex flex-col justify-between h-80vh">
    <h1 class="text-3xl font-bold text-gray-800">Comparación de Pokémon</h1>
  
    <PokemonComparisonHeader />
    <PokemonComparisonChart />
  
    <div class="mt-5">
      <BackToPokedexButton {selectedType} />
    </div>
  </div>
  