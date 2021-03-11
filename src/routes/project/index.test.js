const ProjectRoute = require("./index");

describe("The Project API Route", () => {
    let projectRoute;
    let projectService;
    let response;

    beforeEach(() => {
        projectService = {
            getProjects: jest.fn()
        };
        response = {
            send: jest.fn()
        };
        projectRoute = new ProjectRoute(projectService);
    });

    it("returns projects the auth user is associated with", async () => {
        const projects = [
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
        ];
        projectService.getProjects.mockReturnValue(Promise.resolve(projects));
        const headers = {
            authorization: "Bearer token",
            company_id: 1234
        };
        await projectRoute.getProjects({ headers: headers }, response);
        expect(response.send).toHaveBeenCalledWith(projects);
        expect(projectService.getProjects).toHaveBeenCalledWith("token", 1234);
    });

    it("returns a 400 if no company_id is present in the headers", async () => {
        expect.assertions(2);
        try {
            await projectRoute.getProjects({ headers: { authorization: "Bearer token" }}, response);
        } catch (e) {
            expect(e.statusCode).toBe(400);
            expect(e.message).toBe("Missing company_id in request");
        }
    });

    it("should build the routes", () => {
        expect(ProjectRoute.buildRoutes(projectService)).toBeDefined();
    });
});