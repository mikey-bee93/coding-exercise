const AuthRoute = require("./index");

describe("The Auth Route", () => {
    let authRoute;
    let authService;
    let response;

    beforeEach(() => {
        authService = {
            getAccessToken: jest.fn()
        };
        response = {
            send: jest.fn()
        };
        authRoute = new AuthRoute(authService);
    });

    it("should provide an access token for a user", async () => {
        const accessToken = {
            access_token: "12345",
            token_type: "Bearer",
            expires_in: 7200,
            created_at: Date.now()
        };
        authService.getAccessToken.mockReturnValue(Promise.resolve(accessToken));
        const authRequest = {
            grant_type: "client_credentials",
            client_id: "foo",
            client_secret: "bar"
        };
        await authRoute.getAccessToken({ body: authRequest }, response);
        expect(response.send).toHaveBeenCalled();
        expect(authService.getAccessToken).toHaveBeenCalledWith(authRequest);
    });

    it("should build the routes", () => {
        expect(AuthRoute.buildRoutes(authService)).toBeDefined();
    });
});