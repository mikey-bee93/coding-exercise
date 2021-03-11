const { Router } = require("express");
const { wrapAsync } = require("../../routeUtils");

class CompaniesRoute {
    constructor(companyService) {
        this.companyService = companyService;
    }

    getCompanyInfo = async (req, res) => {
        const token = req.headers.authorization.split(" ")[1];
        const company = await this.companyService.getCompanyInfo(token);
        res.send(company);
    };
    
    static buildRoutes = (companyService) => {
        const projectRoutes = new CompaniesRoute(companyService);
        const router = Router();
        router.get("/", wrapAsync(projectRoutes.getCompanyInfo));
        return router;
    }
}

module.exports = CompaniesRoute;