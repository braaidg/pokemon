const {Type} = require('../db')

const {
  ALL_POKEMONS_URL,
  POKEMON_URL,
  pokemonFormatter,
} = require("../utils/pokemonUtils");

const { Pokemon } = require("../db");
const axios = require("axios");

const fetchPokemonsFromApi = async () => {
  const pokemons = await axios.get(ALL_POKEMONS_URL);
  const promises = pokemons.data.results.map((poke) => axios.get(poke.url));
  const results = await Promise.all(promises);

  return results.map((poke) => pokemonFormatter(poke.data));
};

const fetchPokemonsFromDB = async () => {
  const data = await Pokemon.findAll({
    include: {
      model: Type,
    }
  })
  return data;
};

const getSinglePokemon = async (pokemon) => {
  try {
    const pokemonData = await axios.get(`${POKEMON_URL}/${pokemon}`);
    return pokemonFormatter(pokemonData.data);
  } catch (error) {
    throw Error("Pokemon not found on pokemon API")
  }

};

const getSingleDBPokemon = async (pokeId) => {
  try {
    return await Pokemon.findOne({where : {id : pokeId}, raw:true})
  } catch (error) {
    throw Error("Pokemon not found on database")
  }
}

module.exports = {
  fetchPokemonsFromApi,
  fetchPokemonsFromDB,
  getSinglePokemon,
  getSingleDBPokemon
};
