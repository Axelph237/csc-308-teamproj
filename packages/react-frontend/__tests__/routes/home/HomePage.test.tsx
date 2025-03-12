import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import HomePage from "../../../src/routes/home/HomePage";
import {expect, describe, it} from "@jest/globals";

describe("HomePage Component", () => {
    it("renders the HomeHeader component", async () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Welcome to Diary")).toBeDefined();
        });
    });

    it("renders the loading state initially", async () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Loading diaries...")).toBeDefined();
        });
    });

    it("renders the Create Diary button", async () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Create Diary")).toBeDefined();
        });
    });
});
