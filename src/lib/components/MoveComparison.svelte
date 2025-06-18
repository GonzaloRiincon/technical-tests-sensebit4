<script>
import { selectedMoves, selectedType } from '../store';
import { onMount } from 'svelte';
import Chart from 'chart.js/auto';
import {  goToHome } from '../utils';
import { writable } from 'svelte/store';
import { fetchMoveComparisonData } from '../services/pokemonService';

let moveData = writable([])
let canvas;

  onMount(async () => {

    const ctx = canvas.getContext('2d');
    const data = await fetchMoveComparisonData($selectedMoves); 
    moveData.set(data)

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys($moveData[0]),
        datasets: $selectedMoves.map((move, index) => ({
          label: move,
          data: Object.values($moveData[index]),
          backgroundColor: index === 0 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)',
        }))
      }
    });
  });

</script>
<div class="p-8 max-w-4xl w-full mx-auto bg-white shadow-lg rounded-xl text-black">
  <h1 class="text-3xl font-bold text-center mb-6">Comparación de Movimientos</h1>
  <div class="flex justify-center">
    <canvas bind:this={canvas} class="bg-gray-100 rounded-lg shadow-md p-4"></canvas>
  </div>
  <button 
    on:click={() => goToHome($selectedType)}
    class="px-5 py-2 mt-5 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition shadow-md mx-auto block"
  >
    Volver a la Pokédex
  </button>
</div>
