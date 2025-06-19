<script>
    import { searchQuery, comparisonMode } from '../../store';
  </script>
  
  <div class="flex items-center justify-between mb-6 gap-6"> 
    <div class="relative w-1/2"> 
      <input 
        type="text"
        bind:value={$searchQuery}
        placeholder="Buscar Pokémon..." 
        class="px-3 py-3 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 pl-10 h-12"
      >
      <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"/>
      </svg>
    </div>
  
    <button 
      on:click={() => comparisonMode.set(!$comparisonMode)} 
      class="p-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition w-auto"
    >
      {#if $comparisonMode}🔄 Cancelar Comparación{:else}📊 Comparar Pokémons{/if}
    </button>
  </div>


  <style>
    button {
        background-color: white;
        color: black;
    }
  </style>
  