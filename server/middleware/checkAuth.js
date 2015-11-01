/**
 * Created by andrew on 27.10.15.
 */
var HttpError = require('../lib/error').HttpError;

module.exports = function (req, res, next) {
    if (!req.isAuthenticated())
        next(new HttpError(401,'Вы не авторизированы для доступа на эту страницую')); //res.send(401);
    else
        next();
};
