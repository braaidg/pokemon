const { Router } = require('express');
const { getTypes } = require('../controllers/type.controller')

const router = Router();

router.get('/types', getTypes)

module.exports = router;