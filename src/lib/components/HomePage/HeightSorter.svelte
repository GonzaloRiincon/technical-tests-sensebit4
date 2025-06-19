<script>
    import { filterHeight, sortAscending } from '../../store';
  </script>
  
  <section class="mb-6 flex items-center gap-4">
    <div class="flex items-center rounded-lg p-2 bg-gray-100">
      <label for="height-filter" class="font-bold">Altura mínima:</label>
      <input 
        id="height-filter"
        type="number" 
        bind:value={$filterHeight}
        class="bg-transparent border-none outline-none text-black w-16 text-center" 
      />
    </div>
  
    <button
      on:click={() => sortAscending.set($sortAscending === 2 ? 1 : $sortAscending === 1 ? 0 : 2)}
      class="p-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
    >
      {#if $sortAscending == 1}⬆️ Ascendente
      {:else if $sortAscending == 0}⬇️ Descendente
      {:else}Ordenar por altura{/if}
    </button>
  </section>
  
  <style>
      button {
        background-color: white;
        color: black;
      }
  </style>