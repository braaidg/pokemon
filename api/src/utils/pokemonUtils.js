const ALL_POKEMONS_URL = "https://pokeapi.co/api/v2/pokemon?limit=40"
const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/"
const POKEMON_TYPES_URL = "https://pokeapi.co/api/v2/type"

const pokemonFormatter = (pokemon) => {
  const { id, name, types, sprites, stats, weight, height } = pokemon;
  const typesArray = types.map(type => type.type.name)

  return {
    id,
    name,
    types: typesArray,
    image: sprites.other["official-artwork"].front_default,
    life: stats[0]?.base_stat,
    attack: stats[1]?.base_stat,
    defense: stats[2]?.base_stat,
    speed: stats[5]?.base_stat,
    height,
    weight
  };

}

module.exports = { ALL_POKEMONS_URL, POKEMON_TYPES_URL, POKEMON_URL, pokemonFormatter}