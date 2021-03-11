const CompanyService = require("./index");
const { ResponseError } = require("../../routeUtils");

describe("CompanyService", () => {
    let companyService;

    beforeEach(() => {
        jest.clearAllMocks();
        companyService = new CompanyService();
        companyService.getCompanyInfo = jest.fn();
    });

    it("should get company information for the auth user", async () => {
        companyService.getCompanyInfo.mockResolvedValue(Promise.resolve([
            {
                id: 1,
                is_active: true,
                name: "test"
            }
        ]));
        const token = "123";
        const companies = await companyService.getCompanyInfo(token);
        expect(companyService.getCompanyInfo).toHaveBeenCalledWith(token);
        expect(companies[0].id).toBe(1);
        expect(companies[0].is_active).toBe(true);
        expect(companies[0].name).toBe("test");
    });

    it("should return 403 if we don't pass an auth token", async () => {
        companyService.getCompanyInfo.mockImplementation(() => {
            throw new ResponseError("Forbidden", 403);
        });
        try {
            await companyService.getCompanyInfo();
        } catch (e) {
            expect(e.message).toBe("Forbidden");
            expect(e.statusCode).toBe(403);
        }
    });
});