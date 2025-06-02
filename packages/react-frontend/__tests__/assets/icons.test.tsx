import * as svgs from "../../src/assets/icons";
import {describe, expect, it} from "@jest/globals";
import {cleanup, render, screen} from "@testing-library/react";

describe("icons", () => {
    afterEach(cleanup);
    it("renders correctly", () => {
        for (const [name, ImportedSVG] of Object.entries(svgs)) {
            render(<ImportedSVG/>);
            const icon = screen.queryByTestId("icon");
            expect(icon).toBeDefined();
            cleanup();
        }
    })
})