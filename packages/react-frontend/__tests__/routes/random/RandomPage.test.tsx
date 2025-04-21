import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {expect, describe, it, jest, beforeEach} from "@jest/globals";
import {findRandomPage} from "../../../src/api/backend";
import RandomPage from "../../../src/routes/random/RandomPage";
import type * as backendApi from "../../../src/api/backend";
import HomePage from "@src/routes/home/HomePage";


jest.mock("../../../src/api/backend", () => ({
    findRandomPage: jest.fn(),
}));

const mockedFindRandomPage = findRandomPage as jest.MockedFunction<typeof backendApi.findRandomPage>;

describe("RandomPage Component", () => {
    beforeEach(() => {
        // Set up mock for getUserDiaries

    });

    it("renders RandomPage component", async () => {
        render(
            <MemoryRouter>
                <RandomPage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Today I hiked up a mountain.")).toBeDefined();
        });
    });

});
