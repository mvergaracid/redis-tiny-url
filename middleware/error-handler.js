module.exports = (app) => {
    app.use((err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(err);
      }
      next();
    });
  };