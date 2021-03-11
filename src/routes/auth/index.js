const { Router } = require("express");
const Joi = require("joi");
const { wrapAsync, validate } = require("../../routeUtils");

const getAccessTokenSchema = Joi.object({
    grant_type: Joi.string().required(),
    client_id: Joi.string().required(),
    client_secret: Joi.string().required()
});

class AuthRoute {
    constructor(authService) {
        this.authService = authService;
    }

    getAccessToken = async (req, res) => {
        const accessTokenRequest = validate(req.body, getAccessTokenSchema);
        const accessTokenResponse = await this.authService.getAccessToken(accessTokenRequest);
        res.send(accessTokenResponse);
    }

    static buildRoutes = (authService) => {
        const authRoutes = new AuthRoute(authService);
        const router = Router();

        router.post("/", wrapAsync(authRoutes.getAccessToken));

        return router;
    }
}

module.exports = AuthRoute;