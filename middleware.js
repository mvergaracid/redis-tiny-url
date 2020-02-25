const CORSMiddleware = require('./middleware/cors');
const BodyParserMiddleware = require('./middleware/body-parser');
const ErrorHandlerMiddleware = require('./middleware/error-handler');

module.exports = (app) => {
    CORSMiddleware(app);
    ErrorHandlerMiddleware(app);
    BodyParserMiddleware(app);
  };