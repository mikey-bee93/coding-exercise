const fetch = require("node-fetch");
const { logger } = require("../../logger");
const { ResponseError } = require("../../routeUtils");

class SubmittalService {
    createSubmittal = async (token, project_id, payload) => {
        const submittal = {
            submittal: payload
        };
        try {
            const response = await fetch(`https://sandbox.procore.com/rest/v1.0/projects/${project_id}/submittals`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(submittal)
            });
            const data = await response.json();
            return data;
        } catch (err) {
            logger.error("Error occurred processing submittal creation", err);
            throw new ResponseError(err.message, err.statusCode);
        }
    }

    modifySubmittal = async (token, project_id, submittal_id, payload) => {
        const submittal = {
            submittal: payload
        };
        try {
            const response = await fetch(`https://sandbox.procore.com/rest/v1.0/projects/${project_id}/submittals/${submittal_id}`, {
                method: "patch",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(submittal)
            });
            const data = await response.json();
            return data;
        } catch (err) {
            logger.error("Error occurred processing submittal creation", err);
            throw new ResponseError(err.message, err.statusCode);
        }
    }
}

module.exports = SubmittalService;