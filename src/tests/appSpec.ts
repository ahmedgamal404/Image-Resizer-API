import { startServer } from "../app";

describe("This suite is about testing the server", () => {
    it("server starting succesfully", () => {
        expect(startServer).toBeTruthy();
    });
});
