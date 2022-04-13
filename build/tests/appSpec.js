"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
describe("This suite is about testing the server", () => {
    it("server starting succesfully", () => {
        expect(app_1.startServer).toBeTruthy();
    });
});
