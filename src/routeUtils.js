const { logger } = require("./logger");

class ResponseError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};

const wrapAsync = fn => {
    return async(req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (e) {
            logger.error("An error occurred", e);
            res.status(e.statusCode || 500).send(JSON.stringify({ message: e.message }));
        }
    }
};

const validate = (body, schema) => {
    const { error, value } = schema.validate(body);
    if (error) {
        const err = new ResponseError(error.details.map(d => `${ d.message } at path ${ d.path }`).join(","));
        err.statusCode = 422;
        throw err;
    }
    return value;
};

module.exports = {
    wrapAsync: wrapAsync,
    validate: validate,
    ResponseError: ResponseError
};