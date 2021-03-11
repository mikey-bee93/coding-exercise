const fetch = require("node-fetch");
const { logger } = require("../../logger");
const { ResponseError } = require("../../routeUtils");

class AuthService {
    getAccessToken = async (payload) => {
        try {
            const response = await fetch("https://sandbox.procore.com/oauth/token", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            return data;
        } catch (err) {
            logger.error("An error occurred fetching an access token", err);
            throw new ResponseError(err.message, err.statusCode);
        }
    }
}

module.exports = AuthService;