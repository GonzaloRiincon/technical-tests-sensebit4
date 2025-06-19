<script>
    import { capitalize, goToMoveComparison } from '../../utils';
    import { selectedMoves } from '../../store';
  
    export let pokemon;
    export let showMoves;
  
    const toggleMove = (move) => {
      selectedMoves.update(current => {
        const updated = current.includes(move)
          ? current.filter(m => m !== move)
          : current.length < 2 ? [...current, move] : current;
  
        if (updated.length === 2) goToMoveComparison(); 
        return updated;
      });
    };
  
    const getMoveClass = (move) => {
      const name = move.move.name;
      if (!$selectedMoves.includes(name)) return 'text-black';
      return $selectedMoves[0] === name ? 'text-red-500' : 'text-blue-500';
    };
  </script>
  
  <h2 class="text-2xl font-semibold mt-8 text-center cursor-pointer text-black hover:text-gray-700 transition" on:click={() => showMoves = !showMoves}>
    Movimientos de {capitalize(pokemon.name)} {showMoves ? '⬆️' : '⬇️'}
  </h2>
  
  {#if showMoves}
    <div class="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <ul class="grid grid-cols-2 gap-2">
        {#each pokemon.moves as move}
          <li class="font-medium cursor-pointer hover:text-gray-500 transition {getMoveClass(move)}" on:click={() => toggleMove(move.move.name)}>
            {capitalize(move.move.name)}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  