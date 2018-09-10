const app = require('../app');
const logger = require('../logger');

Object.assign(process.env, app.config);

app.listen(process.env.port, () => logger.debug(`App listening on port ${process.env.port}`));
