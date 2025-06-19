  <script>
    import { selectedType } from '../store';
    import BackToPokedexButton from '../components/BackToPokedexButton.svelte';
    import MoveChart from '../components/MoveComparisonPage/MoveChart.svelte';
  </script>
  
  <div class="p-8 max-w-4xl w-full mx-auto bg-white shadow-lg rounded-xl text-black">
    <h1 class="text-3xl font-bold text-center mb-6">Comparación de Movimientos</h1>
    <MoveChart />
  
    <div class="text-center">
      <BackToPokedexButton {selectedType} />
    </div>
  </div>
  