module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        // Allowed headers
        res.header("Access-Control-Allow-Headers",
            "Origin"
            + ",X-Requested-With"   // Dont allow AJAX CORS without server consent - see http://stackoverflow.com/questions/17478731/whats-the-point-of-the-x-requested-with-header
            + ",x-access-token"
            + ",Content-Type"
            + ",Authorization"
            + ",Accept"
        );

        // SOLUTION HERE
        // Allow headers access
        res.header("access-control-expose-headers",
            ",Authorization"
            + ",Content-Length"
        );

        // Allowed methods
        res.header('Access-Control-Allow-Methods',
            'GET,'
            + ',POST'
            + ',OPTIONS'
            + ',PUT,'
            + ',DELETE'
        );

        // Handle CORS requests: cross-domain/origin requests will begin with an OPTION request to the same endpoint.
        if ('OPTIONS' === req.method) {
            res.sendStatus(200);
        } else {
            // Request validations complete
            next();
        }
    });
};