const { ResponseError } = require("../routeUtils");

const checkAuth = (req, _, next) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        next();
    } else {
        throw new ResponseError("Forbidden", 403);
    }
}

module.exports = checkAuth;