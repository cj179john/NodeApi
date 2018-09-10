const { Router } = require('express');
const authenticationHandler = require('./routesHandlers/tokenHandler');
const dataEntityHandler = require('./routesHandlers/dataEntityHandler');
const tokenHandler = require('./routesHandlers/tokenHandler');

const router = Router();

router.post('/token', authenticationHandler);
router.get('/healthcheck', (req, res) => res.send('API is up and running'));
router.use('/authenticate', tokenHandler);
router.get('/entity', dataEntityHandler);

module.exports = router;
