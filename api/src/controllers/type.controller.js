const { fetchTypesFromApi, fetchTypesFromDB } = require('../services/getTypes')

const getTypes = async (req, res) => {
  try {
    const typesFromDb = await fetchTypesFromDB();

    if(typesFromDb.lenght) {
      return res.status(200).json(typesFromDb)
    } else {
      const types = await fetchTypesFromApi();
      return res.status(200).json(types);
    }
  } catch (error) {
    res.status(404).json({error:error.message})
  }
}

module.exports = { getTypes }