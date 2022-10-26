const { Router } = require('express');
const { allData, getPokemonById, createPokemon } = require('../controllers/pokemon.controller')

const router = Router();

router.get('/pokemons', allData )

router.get('/pokemons/:pokemonId', getPokemonById)

router.post('/pokemons', createPokemon)

module.exports = router;