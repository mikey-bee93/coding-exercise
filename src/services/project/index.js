const fetch = require("node-fetch");
const { logger } = require("../../logger");
const { ResponseError } = require("../../routeUtils");

class ProjectService {
    getProjects = async (token, company_id) => {
        try {
            const response = await fetch(`https://sandbox.procore.com/rest/v1.0/projects/?company_id=${company_id}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data;
        } catch (err) {
            logger.error("Error obtaining project info", err);
            throw new ResponseError(err.message, err.statusCode)
        }
    }
}

module.exports = ProjectService;