<script>
    import { capitalize } from '../../utils';
    export let pokemon;
  </script>
  
  <div class="grid grid-cols-2 gap-4 text-left text-gray-800">
    {#each pokemon.stats as stat}
      <div class="bg-gray-200 p-3 rounded-lg shadow-sm flex justify-between">
        <span class="font-medium text-black">{capitalize(stat.stat.name)}</span>
        <span class="text-blue-700 font-bold">{stat.base_stat}</span>
      </div>
    {/each}
  </div>
  