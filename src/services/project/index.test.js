const ProjectService = require("./index");
const { ResponseError } = require("../../routeUtils");

describe("ProjectService", () => {
    let projectService;

    beforeEach(() => {
        jest.clearAllMocks();
        projectService = new ProjectService();
        projectService.getProjects = jest.fn();
    });

    it("should get all projects from the auth user", async () => {
        projectService.getProjects.mockResolvedValue(Promise.resolve([
            {
                "id": 1,
                "name": "name",
                "display_name": "display name",
                "project_number": "1",
                "address": "5555 main st",
                "city": "orlando",
                "state_code": "FL",
                "country_code": "US",
                "zip": "55555",
                "county": "Orange",
                "time_zone": "US/Pacific",
                "latitude": null,
                "longitude": null,
                "stage": "None",
                "phone": "",
                "created_at": "2021-03-03T20:56:15Z",
                "updated_at": "2021-03-03T21:00:32Z",
                "active": true,
                "origin_id": null,
                "origin_data": null,
                "origin_code": null,
                "owners_project_id": null,
                "estimated_value": "1000.0",
                "project_region_id": null,
                "project_bid_type_id": null,
                "project_owner_type_id": null,
                "photo_id": null,
                "start_date": "2021-03-01",
                "completion_date": "2021-06-01",
                "total_value": "1000.0",
                "accounting_project_number": "",
                "store_number": "",
                "designated_market_area": "",
                "company": {
                    "id": 1234,
                    "name": "test"
                }
            }
        ]));
        const authToken = "123";
        const company_id = 1234;
        const projects = await projectService.getProjects(authToken, company_id);
        expect(projectService.getProjects).toHaveBeenCalledWith(authToken, company_id);
        expect(projects[0].name).toBe("name");
        expect(projects[0].company.id).toBe(1234);
    });

    it("should return 403 if we don't pass an auth token or company_id", async () => {
        projectService.getProjects.mockImplementation(() => {
            throw new ResponseError("Forbidden", 403);
        });
        try {
            await projectService.getProjects();
        } catch (e) {
            expect(e.message).toBe("Forbidden");
            expect(e.statusCode).toBe(403);
        }
    });
});