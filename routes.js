const { Router } = require('express');
const authenticationHandler = require('./routesHandlers/authenticateHandler');
const tokenHandler = require('./routesHandlers/tokenHandler');
const usersHandler = require('./routesHandlers/users');

const router = Router();

router.post('/token', tokenHandler);
router.get('/healthcheck', (req, res) => res.send('API is up and running'));
router.use(authenticationHandler);
router.use('/user', usersHandler);

module.exports = router;
