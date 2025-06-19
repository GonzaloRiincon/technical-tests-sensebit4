<script>
    import TypeSelector from "./TypeSelector.svelte";

</script>

<div class="text-center mb-8 bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-lg">
    <h1 class="text-6xl font-extrabold text-yellow-400 font-welcome">
      ¡Bienvenido a la Pokédex!
    </h1>
    <p class="text-lg text-blue-500 mt-2 font-semibold">
      Explora y descubre los Pokémon por tipo.
    </p>
</div>
<section class="flex flex-col items-center mb-8">
    <TypeSelector/>
</section>
  
  <style>
    .font-welcome {
      font-family: 'Luckiest Guy', cursive;
    }
  </style>
  