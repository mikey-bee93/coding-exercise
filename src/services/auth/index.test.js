const AuthService = require("./index");
const { ResponseError } = require("../../routeUtils");

describe("AuthService", () => {
    let authService;

    beforeEach(() => {
        jest.clearAllMocks();
        authService = {
            getAccessToken: jest.fn()
        };
        authService = new AuthService();
        authService.getAccessToken = jest.fn();
    });

    it("should get an access token", async () => {
        authService.getAccessToken.mockResolvedValue(Promise.resolve({
            access_token: "123",
            token_type: "Bearer",
            expires_in: 7199,
            created_at: new Date().toISOString()
        }));
        const payload = {
            grant_type: "client_credentials", 
            client_id: "id",
            client_secret: "secret"
        };
        const token = await authService.getAccessToken(payload);
        expect(authService.getAccessToken).toHaveBeenCalledWith(payload);
        expect(token.access_token).toBe("123");
        expect(token.token_type).toBe("Bearer");
        expect(token.expires_in).toBe(7199);
    });

    it("should return an error if we are unable to fetch a token", async () => {
        authService.getAccessToken.mockImplementation(() => {
            throw new ResponseError("Boom", 400);
        });
        const payload = {};
        try {
            await authService.getAccessToken(payload);
        } catch (e) {
            expect(e.message).toBe("Boom");
            expect(e.statusCode).toBe(400);
        }
    });
});