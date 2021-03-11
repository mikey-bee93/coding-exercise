const SubmittalService = require("./index");
const { ResponseError } = require("../../routeUtils");

describe("SubmittalService", () => {
    let submittalService;

    beforeEach(() => {
        jest.clearAllMocks();
        submittalService = new SubmittalService();
        submittalService.createSubmittal = jest.fn();
        submittalService.modifySubmittal = jest.fn();
    });

    it("should create a submittal", async () => {
        submittalService.createSubmittal.mockReturnValue(Promise.resolve({
            "id": 123,
            "number": "12345",
            "revision": "0",
            "title": "title",
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
            "description": "description",
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
        }));
        const token = "123";
        const project_id = 123456;
        const payload = {
            number: "12345",
            title: "title",
            description: "description"
        };
        const submittal = await submittalService.createSubmittal(token, project_id, payload);
        expect(submittalService.createSubmittal).toHaveBeenCalledWith(token, project_id, payload);
        expect(submittal.number).toBe("12345");
        expect(submittal.title).toBe("title");
        expect(submittal.description).toBe("description");
    });

    it("should return 403 if we don't pass an auth token or company_id", async () => {
        submittalService.createSubmittal.mockImplementation(() => {
            throw new ResponseError("Forbidden", 403);
        });
        try {
            await submittalService.createSubmittal();
        } catch (e) {
            expect(e.message).toBe("Forbidden");
            expect(e.statusCode).toBe(403);
        }
    });
});