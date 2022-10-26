const { Router } = require('express');

const pokemonRoutes = require('./pokemonRoutes')
const pokemonTypeRoutes = require('./pokemonTypeRoutes')

const router = Router();

router.use('/', pokemonRoutes)
router.use('/', pokemonTypeRoutes)

module.exports = router;
