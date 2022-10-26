const axios = require('axios');

const { POKEMON_TYPES_URL } = require('../utils/pokemonUtils')

const { Type } = require('../db');

const fetchTypesFromApi = async () => {
  const types = await axios.get(POKEMON_TYPES_URL)
  return types.data.results;
}

const fetchTypesFromDB = async () => {
  return await Type.findAll()
}

const getTypesOnStartUp = async () => {
  try {
    const types = await Type.findAll()
    if (types.length) {
      console.log("Types already on DB")
      return types;
    } else {
      const apiTypes = await fetchTypesFromApi();
      apiTypes.forEach(type => Type.create({name: type.name}))
      console.log("types created!")
      return apiTypes
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { fetchTypesFromApi, fetchTypesFromDB, getTypesOnStartUp}