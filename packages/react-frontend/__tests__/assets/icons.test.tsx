import * as svgs from "../../src/assets/icons";
import {describe, expect, it} from "@jest/globals";
import {cleanup, render, screen} from "@testing-library/react";

describe("icons", () => {
    it("renders correctly", () => {
        for (const ImportedSVG of Object.values(svgs)) {
            render(<ImportedSVG/>);
            expect(screen.getByTestId("icon")).toBeDefined();
            cleanup();
        }
    })
})