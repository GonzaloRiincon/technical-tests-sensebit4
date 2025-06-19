<script>
    import { goToHome } from '../utils';
    export let selectedType;
  </script>
  
  <div class="text-center mt-6">
    <button 
      on:click={() => goToHome($selectedType)}
      class="px-5 py-2 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition shadow-md"
    >
      Volver a la Pokédex
    </button>
  </div>
  