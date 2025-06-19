<script>
    import { capitalize, goToDetails } from '../../utils';
    import { selectedPokemons } from '../../store';
  </script>
  
  <section class="flex justify-between items-center my-5">
    <div class="w-1/3 text-center cursor-pointer" on:click={() => goToDetails($selectedPokemons[0])}>
      <img src={$selectedPokemons[0].imageUrl} alt={$selectedPokemons[0].name} class="w-32 h-32 object-contain mx-auto shadow-md rounded-lg" />
      <h2 class="text-lg font-semibold mt-2 text-gray-800">{capitalize($selectedPokemons[0].name)}</h2>
    </div>
  
    <h1 class="text-3xl font-bold text-gray-600">VS</h1>
  
    <div class="w-1/3 text-center cursor-pointer" on:click={() => goToDetails($selectedPokemons[1])}>
      <img src={$selectedPokemons[1].imageUrl} alt={$selectedPokemons[1].name} class="w-32 h-32 object-contain mx-auto shadow-md rounded-lg" />
      <h2 class="text-lg font-semibold mt-2 text-gray-800">{capitalize($selectedPokemons[1].name)}</h2>
    </div>
  </section>
  