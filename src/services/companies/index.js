const fetch = require("node-fetch");
const { logger } = require("../../logger");
const { ResponseError } = require("../../routeUtils");

class CompanyService {
    getCompanyInfo = async (token) => {
        try {
            const response = await fetch("https://sandbox.procore.com/rest/v1.0/companies", {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data;
        } catch (err) {
            logger.error("Error occurred obtaining company information", err);
            throw new ResponseError(err.message, err.statusCode);
        }
    }
}

module.exports = CompanyService;