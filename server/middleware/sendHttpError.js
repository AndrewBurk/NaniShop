/**
 * Created by andrew on 27.10.15.
 */

module.exports = function(req, res, next) {

    res.sendHttpError = function(error) {

        res.status(error.status);
        if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
        } else {
            res.send(error.message);
        }
    };
    next();
};