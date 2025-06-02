import {render, screen, waitFor} from "@testing-library/react";
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import {MemoryRouter} from "react-router-dom";
import HomePage from "../../../src/routes/home/HomePage";
import {expect, describe, it, jest, beforeEach} from "@jest/globals";
import {createDiary, getUserDiaries} from "../../../src/api/backend";

import type * as backendApi from "../../../src/api/backend";
import {userEvent} from "@testing-library/user-event";


// Mocking the getUserDiaries function (ensure it's correctly mocked)
jest.mock("../../../src/api/backend", () => ({
    getUserDiaries: jest.fn(),
    createDiary: jest.fn(),
}));

const mockedGetUserDiaries = getUserDiaries as jest.MockedFunction<typeof backendApi.getUserDiaries>;
const mockedCreateDiary = createDiary as jest.MockedFunction<typeof backendApi.createDiary>;

describe("HomePage Component", () => {
    beforeEach(() => {
        // Set up mock for getUserDiaries
        mockedGetUserDiaries.mockResolvedValue([
            {
                _id: "1",
                title: "Diary 1",
                lastEntry: "12-02-2025",
                numEntries: 25,
                entries: [],
            },
            {
                _id: "2",
                title: "A Second Diary",
                lastEntry: "12-11-2025",
                numEntries: 1,
                entries: [],
            },
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
            expect(screen.getByText("Loading...")).toBeDefined();
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

        const errorMessage = await screen.findByText("Error: Failed to load diaries")

        expect(errorMessage).toBeDefined();
    });

    it("shows input when Create Diary is clicked", async () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText("Loading...")).toBeFalsy();
        });

        const createButton = screen.getByText("Create Diary");
        await userEvent.click(createButton);
        // Ensure input is hidden initially
        const input = await screen.findByRole("textbox");
        expect(input).toBeTruthy();


        // The input should now be visible and focused
        await waitFor(() => {
            // expect(input).not.toHaveClass("hidden");
            expect(document.activeElement).toBe(input);
        });
    });

    it("calls createDiary and renders new diary on save", async () => {
        // Mock return value of createDiary
        mockedCreateDiary.mockResolvedValue({
            _id: "123",
            title: "New Test Diary",
            lastEntry: undefined,
            numEntries: 0,
            entries: []
        });

        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );

        // Wait for existing diaries to load
        await waitFor(() => {
            expect(screen.getByText("Diary 1")).toBeDefined();
            expect(screen.getByText("A Second Diary")).toBeDefined();
        });

        // Click "Create Diary"
        const createButton = screen.getByText("Create Diary");
        await userEvent.click(createButton);

        // Type into input
        const input = await screen.findByRole("textbox");
        await userEvent.type(input, "New Test Diary");

        // Click save icon (add data-testid to SaveIcon in component if needed)
        const saveIcon = screen.getByLabelText("save-icon");
        await userEvent.click(saveIcon);

        // Assert createDiary called with correct data
        await waitFor(() => {
            expect(mockedCreateDiary).toHaveBeenCalledWith({
                title: "New Test Diary",
                lastEntry: undefined,
                numEntries: 0,
                entries: [],
            });
        });

        // Assert new diary appears
        const newDiaryTitle = await screen.findByText("New Test Diary");
        expect(newDiaryTitle).toBeDefined();
    });
});
