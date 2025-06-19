<script>
    import { onMount } from 'svelte';
    import { selectedPokemons } from '../../store';
    import { getPokemonData } from '../../services/pokemonService';
    import Chart from 'chart.js/auto';
  
    let canvas;
    let pokemonData;
  
    onMount(async () => {
      if ($selectedPokemons.length === 2) {
        pokemonData = await getPokemonData($selectedPokemons[0], $selectedPokemons[1]);
  
        new Chart(canvas, {
          type: 'bar',
          data: {
            labels: ['Altura (cm)', 'Peso (kg)', 'Movimientos'],
            datasets: [
              {
                label: pokemonData.pokemonA.name,
                data: [
                  pokemonData.pokemonA.height * 10,
                  pokemonData.pokemonA.weight,
                  pokemonData.pokemonA.moves.length
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.7)'
              },
              {
                label: pokemonData.pokemonB.name,
                data: [
                  pokemonData.pokemonB.height * 10,
                  pokemonData.pokemonB.weight,
                  pokemonData.pokemonB.moves.length
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    });
  </script>
  
  <section class="flex justify-center w-full">
    <div class="w-2/3 bg-gray-100 p-4 rounded-lg shadow-md">
      <canvas bind:this={canvas} class="w-full h-48"></canvas>
    </div>
  </section>
  