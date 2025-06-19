<script>
    import { capitalize } from '../../utils';
    import { createEventDispatcher } from 'svelte';
  
    export let evolutions = [];
    const dispatch = createEventDispatcher();
  
    const handleClick = (evo) => {
      dispatch('selectEvolution', evo);
    };
  </script>

  <h2 class="text-2xl font-semibold mt-8 text-center">Cadena Evolutiva</h2>
  <div class="flex justify-center gap-6 mt-6">
    {#each evolutions as evolution}
      <div class="text-center cursor-pointer" on:click={() => handleClick(evolution)}>
        <img src={evolution.image} alt={evolution.name} class="w-24 h-24 mx-auto rounded-lg shadow-md border-2 border-gray-300">
        <p class="text-lg font-semibold capitalize text-black mt-2">{capitalize(evolution.name)}</p>
      </div>
    {/each}
  </div>
  