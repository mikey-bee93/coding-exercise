const { Router } = require("express");
const { wrapAsync, ResponseError } = require("../../routeUtils");

class ProjectRoute {
    constructor(projectService) {
        this.projectService = projectService;
    }

    getProjects = async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        const company_id = req.headers.company_id;
        if (!company_id) {
            throw new ResponseError("Missing company_id in request", 400);
        }
        const project = await this.projectService.getProjects(token, company_id);
        res.send(project);
    };
    

    static buildRoutes = (projectService) => {
        const projectRoutes = new ProjectRoute(projectService);
        const router = Router();
        router.get("/", wrapAsync(projectRoutes.getProjects));
        return router;
    }
}

module.exports = ProjectRoute;