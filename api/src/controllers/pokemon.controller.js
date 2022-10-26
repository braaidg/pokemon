const { Pokemon, Type } = require("../db");

const {
  fetchPokemonsFromApi,
  getSinglePokemon,
  fetchPokemonsFromDB,
  getSingleDBPokemon,
} = require("../services/getPokemons");

const allData = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const singlePokemon = await getSinglePokemon(name.toLowerCase());
      return res.status(200).json(singlePokemon);
    }
    const pokemonApiData = await fetchPokemonsFromApi();
    const pokemonDBData = await fetchPokemonsFromDB();

    res.status(200).json(pokemonApiData.concat(pokemonDBData));
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

const getPokemonById = async (req, res) => {
  const { pokemonId } = req.params;
  let pokemon;

  try {
    if (pokemonId.length > 7) {
      pokemon = await getSingleDBPokemon(pokemonId);
      return res.status(200).json(pokemon);
    }
    pokemon = await getSinglePokemon(Number(pokemonId));
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
};

const createPokemon = async (req, res) => {
  const { name, image, life, attack, defense, speed, height, weight, types } =
    req.body;
  try {
    const newPokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    const pokemonTypes = await Type.findAll({ where: { name: types } });
    newPokemon.addType(pokemonTypes);
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

module.exports = {
  allData,
  getPokemonById,
  createPokemon,
};
