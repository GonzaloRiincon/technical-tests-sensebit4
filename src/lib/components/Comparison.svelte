<script>
  import { onMount } from "svelte";
  import {  selectedType, selectedPokemons } from "../store";
  import { capitalize,  goToDetails,  goToHome } from "../utils";
  import Chart from "chart.js/auto";
    import { getPokemonData } from "../services/pokemonService";

  let canvas;
  let pokemonData = { pokemonA: null, pokemonB: null };

  onMount(async () => {
    if ($selectedPokemons.length == 2) {
      pokemonData = await getPokemonData($selectedPokemons[0], $selectedPokemons[1]);
    }

    if (canvas && pokemonData.pokemonA && pokemonData.pokemonB) {
      new Chart(canvas, {
        type: "bar",
        data: {
          labels: ["Altura (cm)", "Peso (kg)", "Movimientos"],
          datasets: [
            {
              label: pokemonData.pokemonA.name,
              data: [pokemonData.pokemonA.height * 10, pokemonData.pokemonA.weight, pokemonData.pokemonA.moves.length],
              backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
            {
              label: pokemonData.pokemonB.name,
              data: [pokemonData.pokemonB.height * 10, pokemonData.pokemonB.weight, pokemonData.pokemonB.moves.length],
              backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  });
</script>

<div class="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg text-center flex flex-col justify-between h-80vh">
  <h1 class="text-3xl font-bold text-gray-800">Comparación de Pokémon</h1>

  <section class="flex justify-between items-center my-5">
    <div class="w-1/3 text-center cursor-pointer" on:click={()=> goToDetails($selectedPokemons[0])}>
      <img src={$selectedPokemons[0].imageUrl} alt={$selectedPokemons[0].name} class="w-32 h-32 object-contain mx-auto shadow-md rounded-lg" />
      <h2 class="text-lg font-semibold mt-2 text-gray-800">{capitalize($selectedPokemons[0].name)}</h2>
    </div>

    <h1 class="text-3xl font-bold text-gray-600">VS</h1>

    <div class="w-1/3 text-center cursor-pointer" on:click={()=> goToDetails($selectedPokemons[1])}>
      <img src={$selectedPokemons[1].imageUrl} alt={$selectedPokemons[1].name} class="w-32 h-32 object-contain mx-auto shadow-md rounded-lg" />
      <h2 class="text-lg font-semibold mt-2 text-gray-800">{capitalize($selectedPokemons[1].name)}</h2>
    </div>
  </section>

  <section class="flex justify-center w-full">
    <div class="w-2/3 bg-gray-100 p-4 rounded-lg shadow-md">
      <canvas bind:this={canvas} class="w-full h-48"></canvas>
    </div>
  </section>

  <div>
    <button 
      on:click={() => goToHome($selectedType)}
      class="px-5 py-2 mt-5 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition shadow-md"
    >
      Volver a la Pokédex
    </button>
  </div>
</div>

