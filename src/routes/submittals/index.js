const { Router } = require("express");
const Joi = require("joi");
const { wrapAsync, validate, ResponseError } = require("../../routeUtils");

const submittalSchema = Joi.object({
    actual_delivery_date: Joi.string().allow(null),
    confirmed_delivery_date: Joi.string().allow(null),
    cost_code_id: Joi.number().allow(null),
    custom_textarea_1: Joi.string().allow(null),
    custom_textfield_1: Joi.string().allow(null),
    description: Joi.string().allow(null),
    design_team_review_time: Joi.number().allow(null),
    distribution_member_ids: Joi.array().items(Joi.number()).allow(null),
    due_date: Joi.string().allow(null),
    internal_review_time: Joi.number().allow(null),
    issue_date: Joi.string().allow(null),
    lead_time: Joi.number().allow(null),
    location_id: Joi.number().allow(null),
    number: Joi.string().required(),
    private: Joi.boolean().allow(null),
    received_date: Joi.string().allow(null),
    received_from_id: Joi.number().allow(null),
    required_on_site_date: Joi.string().allow(null),
    responsible_contractor_id: Joi.number().allow(null),
    revision: Joi.string().allow(null),
    scheduled_task_key: Joi.string().allow(null),
    scheduled_task_id: Joi.number().allow(null),
    specification_section_id: Joi.number().allow(null),
    status_id: Joi.number().allow(null),
    sub_job_id: Joi.number().allow(null),
    submit_by: Joi.string().allow(null),
    submittal_manager_id: Joi.number().allow(null),
    submittal_package_id: Joi.number().allow(null),
    title: Joi.string().allow(null),
    type: Joi.string().allow(null),
    workflow_data: Joi.array().items(Joi.any())
});

class SubmittalRoute {
    constructor(submittalService) {
        this.submittalService = submittalService;
    }

    createSubmittal = async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        const project_id = req.headers.project_id;
        if (!project_id) {
            throw new ResponseError("Missing project_id in Headers", 400);
        }
        const createSubmittalRequest = validate(req.body, submittalSchema);
        const createSubmittalResponse = await this.submittalService.createSubmittal(token, project_id, createSubmittalRequest);
        res.send(createSubmittalResponse);
    }

    modifySubmittal = async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        const project_id = req.headers.project_id;
        if (!project_id) {
            throw new ResponseError("Missing project_id in Headers", 400);
        }
        const submittal_id = req.headers.submittal_id;
        if (!submittal_id) {
            throw new ResponseError("Missing submittal_id in Headers", 400);
        }
        const modifySubmittalRequest = validate(req.body, submittalSchema);
        const modifySubmittalResponse = await this.submittalService.modifySubmittal(token, project_id, submittal_id, modifySubmittalRequest);
        res.send(modifySubmittalResponse);
    }

    static buildRoutes = (submittalService) => {
        const submittalRoutes = new SubmittalRoute(submittalService);
        const router = Router();

        router.post("/", wrapAsync(submittalRoutes.createSubmittal));
        router.patch("/", wrapAsync(submittalRoutes.modifySubmittal));

        return router;
    }
}

module.exports = SubmittalRoute;