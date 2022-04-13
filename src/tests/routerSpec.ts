import supertest from "supertest";
import { app } from "../app";

const request = supertest(app);
describe("Test endpoint responses", () => {
    it("gets the api endpoint", async () => {
        const response = await request.get("/api?name=fjord.jpg&width=800&height=600");
        expect(response.status).toBe(200);
    });
});
