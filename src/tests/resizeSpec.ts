import { resizeImg } from "../router";

describe("Test processing Image", () => {
    it("Test resizing Image", async () => {
        expect((await resizeImg("default.jpg", "800", "600")).status).toEqual(true);
    });
});
