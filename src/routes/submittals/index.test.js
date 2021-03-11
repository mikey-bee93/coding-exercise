const SubmittalRoute = require("./index");

describe("The Submittal Route", () => {
    let submittalRoute;
    let submittalService;
    let response;

    beforeEach(() => {
        submittalService = {
            createSubmittal: jest.fn(),
            modifySubmittal: jest.fn()
        };
        response = {
            send: jest.fn()
        };
        submittalRoute = new SubmittalRoute(submittalService);
    });

    it("should create a submittal", async () => {
        const submittalResponse = {
            "id": 123,
            "number": "12345",
            "revision": "0",
            "title": null,
            "approvers": [],
            "attachments_count": 0,
            "ball_in_court": [
                {
                    "id": 123,
                    "name": "michael",
                    "locale": null,
                    "login": "sometest@procore.com"
                }
            ],
            "created_at": new Date().toISOString(),
            "created_by": {
                "id": 123,
                "name": "michael",
                "locale": null,
                "login": "sometest@procore.com"
            },
            "current_revision": true,
            "custom_fields": {},
            "distributed_at": null,
            "due_date": null,
            "formatted_number": "12345",
            "issue_date": null,
            "private": false,
            "received_date": null,
            "received_from": null,
            "submit_by": null,
            "submittal_manager": {
                "id": 123,
                "name": "michael",
                "locale": null,
                "login": "sometest@procore.com"
            },
            "submittal_package": null,
            "type": null,
            "updated_at": new Date().toISOString(),
            "open_date": null,
            "actual_delivery_date": null,
            "confirmed_delivery_date": null,
            "custom_textarea_1": null,
            "custom_textfield_1": null,
            "description": null,
            "design_team_review_time": null,
            "distribution_members": [],
            "distributed_submittals": [],
            "internal_review_time": null,
            "lead_time": null,
            "required_on_site_date": null,
            "rich_text_description": null,
            "location": null,
            "responsible_contractor": null,
            "specification_section": null,
            "sub_job": null,
            "status": {
                "id": 1,
                "name": "Open",
                "status": "Open"
            },
            "attachments": [],
            "cost_code": null,
            "scheduled_task": null
        };
        const headers = {
            authorization: "Bearer token",
            project_id: 12345
        };
        submittalService.createSubmittal.mockReturnValue(Promise.resolve(submittalResponse));
        await submittalRoute.createSubmittal({ headers: headers, body: { number: "12345" } }, response);
        expect(response.send).toHaveBeenCalledWith(submittalResponse);
        expect(submittalService.createSubmittal).toHaveBeenCalledWith("token", 12345, { number: "12345" });
    });

    it("should throw an error creating submittal if no project_id passed", async () => {
        expect.assertions(2);
        try {
            await submittalRoute.createSubmittal({ headers: { authorization: "Bearer token" }, body: { number: "12345" }}, response);
        } catch (e) {
            expect(e.statusCode).toBe(400);
            expect(e.message).toBe("Missing project_id in Headers");
        }
    });

    it("should modify a submittal", async () => {
        const submittalResponse = {
            "id": 123,
            "number": "12345",
            "revision": "0",
            "title": "new title",
            "approvers": [],
            "attachments_count": 0,
            "ball_in_court": [
                {
                    "id": 123,
                    "name": "michael",
                    "locale": null,
                    "login": "sometest@procore.com"
                }
            ],
            "created_at": "2021-03-09T13:32:51Z",
            "created_by": {
                "id": 123,
                "name": "michael",
                "locale": null,
                "login": "sometest@procore.com"
            },
            "current_revision": true,
            "custom_fields": {},
            "distributed_at": null,
            "due_date": null,
            "formatted_number": "12345",
            "issue_date": null,
            "private": false,
            "received_date": null,
            "received_from": null,
            "submit_by": null,
            "submittal_manager": {
                "id": 123,
                "name": "michael",
                "locale": null,
                "login": "sometest@procore.com"
            },
            "submittal_package": null,
            "type": null,
            "updated_at": new Date().toISOString(),
            "open_date": null,
            "actual_delivery_date": null,
            "confirmed_delivery_date": null,
            "custom_textarea_1": null,
            "custom_textfield_1": null,
            "description": "new description",
            "design_team_review_time": null,
            "distribution_members": [],
            "distributed_submittals": [],
            "internal_review_time": null,
            "lead_time": null,
            "required_on_site_date": null,
            "rich_text_description": null,
            "location": null,
            "responsible_contractor": null,
            "specification_section": null,
            "sub_job": null,
            "status": {
                "id": 1,
                "name": "Open",
                "status": "Open"
            },
            "attachments": [],
            "cost_code": null,
            "scheduled_task": null
        };
        const request = {
            headers: {
                authorization: "Bearer token",
                project_id: 12345,
                submittal_id: 123
            },
            body: {
                number: "12345",
                title: "new title",
                description: "new description"
            }
        };
        submittalService.modifySubmittal.mockReturnValue(Promise.resolve(submittalResponse));
        await submittalRoute.modifySubmittal(request, response);
        expect(response.send).toHaveBeenCalledWith(submittalResponse);
        expect(submittalService.modifySubmittal).toHaveBeenCalledWith("token", 12345, 123, { number: "12345", title: "new title", description: "new description" });
    });

    it("should throw an error if a submittal_id is not present for modifying a submittal", async() => {
        expect.assertions(2);
        const request = {
            headers: {
                authorization: "Bearer token",
                project_id: 12345
            },
            body: {
                number: "12345",
                title: "new title",
                description: "new description"
            }
        };
        try {
            await submittalRoute.modifySubmittal(request, response);
        } catch (e) {
            expect(e.statusCode).toBe(400);
            expect(e.message).toBe("Missing submittal_id in Headers");
        }
    });

    it("should build the routes", () => {
        expect(SubmittalRoute.buildRoutes(submittalService)).toBeDefined();
    });
}); 