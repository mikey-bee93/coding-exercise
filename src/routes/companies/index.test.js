const CompaniesRoute = require("./index");

describe("The Companies Route", () => {
    let companiesRoute;
    let companyService;
    let response;

    beforeEach(() => {
        companyService = {
            getCompanyInfo: jest.fn()
        };
        response = {
            send: jest.fn()
        };
        companiesRoute = new CompaniesRoute(companyService);
    });

    it("should return data on the companies the auth user is associated to", async () => {
        const companyDataResponse = [
            {
                id: 1,
                is_active: true,
                name: "test"
            }
        ];
        companyService.getCompanyInfo.mockReturnValue(Promise.resolve(companyDataResponse));
        const headers = {
            authorization: "Bearer token"
        };
        await companiesRoute.getCompanyInfo({ headers: headers }, response);
        expect(response.send).toHaveBeenCalledWith(companyDataResponse);
        expect(companyService.getCompanyInfo).toHaveBeenCalledWith("token");
    });

    it("should build routes", () => {
        expect(CompaniesRoute.buildRoutes(companyService)).toBeDefined();
    });
});