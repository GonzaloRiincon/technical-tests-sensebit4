<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import { selectedMoves } from '../../store';
    import { fetchMoveComparisonData } from '../../services/pokemonService';
    import { writable } from 'svelte/store';
  
    let canvas;
    let moveData = writable([]);
  
    onMount(async () => {
      const ctx = canvas.getContext('2d');
      const data = await fetchMoveComparisonData($selectedMoves);
      moveData.set(data);
  
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(data[0]),
          datasets: $selectedMoves.map((move, index) => ({
            label: move,
            data: Object.values(data[index]),
            backgroundColor: index === 0
              ? 'rgba(255, 99, 132, 0.6)'
              : 'rgba(54, 162, 235, 0.6)',
          })),
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    });
  </script>
  
  <div class="flex justify-center">
    <canvas bind:this={canvas} class="bg-gray-100 rounded-lg shadow-md p-4"></canvas>
  </div>
  