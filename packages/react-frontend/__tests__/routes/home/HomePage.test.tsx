import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import HomePage from "../../../src/routes/home/HomePage";
import {expect, describe, it, jest, beforeEach} from "@jest/globals";
import type * as userApi from "@src/api/user";

// Mocking the getUserDiaries function (ensure it's correctly mocked)
jest.mock("../../../src/api/user", () => ({
    getUserDiaries: jest.fn(),
}));


const {getUserDiaries} = require("../../../src/api/user");
const mockedGetUserDiaries = getUserDiaries as jest.MockedFunction<typeof userApi.getUserDiaries>;

describe("HomePage Component", () => {
    beforeEach(() => {
        // Set up mock for getUserDiaries
        getUserDiaries.mockResolvedValue([
            {title: "Diary 1", date: "12-01-2025"},
            {title: "A Second Diary", date: "12-02-2025"}
        ]);
    });

    it("renders HomeHeader component", async () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Welcome to Diary")).toBeDefined();
        });
    });

    it("renders loading state initially", async () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Loading diaries...")).toBeDefined();
        });
    });

    it("renders Create Diary button", async () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Create Diary")).toBeDefined();
        });
    });
    it('renders Diary titles in user.ts is successful', async () => {
        render(<MemoryRouter>
            <HomePage/>
        </MemoryRouter>);

        // Ensure that the diary titles are rendered after data is fetched
        const diary1Title = await screen.findByText('Diary 1');
        const diary2Title = await screen.findByText('A Second Diary');

        expect(diary1Title).toBeDefined();
        expect(diary2Title).toBeDefined();


        // expect(await screen.findByText('Another Entry')).toBeInTheDocument();
    });
    it("should fail when component does not render a specific element", async () => {
        render(<MemoryRouter>
            <HomePage/>
        </MemoryRouter>);

        // This assertion will fail because "Non-existent button" doesn't exist
        await expect(screen.findByText('not exist')).rejects.toThrow();
    });

    it("should throw error failed fetch", async () => {
        mockedGetUserDiaries.mockRejectedValue(new Error("Fetch failed"));
        render(<MemoryRouter>
            <HomePage/>
        </MemoryRouter>)

        const errorMessage = await screen.findByText("Error: Fetch failed")

        expect(errorMessage).toBeDefined();
    });
});
