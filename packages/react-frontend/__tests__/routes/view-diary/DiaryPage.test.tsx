import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import DiaryPage from "../../../src/routes/view-diary/DiaryPage";
import {expect, describe, it, jest, beforeEach} from "@jest/globals";
import {getDiaryEntries, getUserDiaries} from "../../../src/api/user";
import type * as userApi from "../../../src/api/user";

// Mock the API
jest.mock("../../../src/api/user");

const mockedGetUserDiaries = getUserDiaries as jest.MockedFunction<typeof userApi.getUserDiaries>;
const mockedGetDiaryEntries = getDiaryEntries as jest.MockedFunction<typeof userApi.getDiaryEntries>;

const mockDiaries = [
    {title: "Diary 1", date: "12-01-2025"},
    {title: "A Second Diary", date: "12-01-2025"},
];

describe("DiaryPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    async function renderWithRoute(index = "0") {
        mockedGetUserDiaries.mockResolvedValue([mockDiaries[index]]);
        mockedGetDiaryEntries.mockResolvedValue([
            {
                title: "Morning",
                date: "03-10-25",
                body: "Hello world!"
            },
        ]);

        render(
            <MemoryRouter initialEntries={[`/diary/${index}`]}>
                <Routes>
                    <Route path="/diary/:index" element={<DiaryPage/>}/>
                </Routes>
            </MemoryRouter>
        );

    }

    it("shows loading message initially", () => {
        renderWithRoute();
        expect(screen.getByText("Loading entries...")).toBeDefined();
    });

    it("renders entries for valid diary index", async () => {
        renderWithRoute("0");

        await waitFor(() => {
            expect(screen.getByText("Morning")).toBeDefined();
            expect(screen.getByText("03-10-25")).toBeDefined();
            expect(screen.getByText("Hello world!")).toBeDefined();

        });
    });

    it("renders pen icon", async () => {
        renderWithRoute("0");
        await waitFor(() => {
            expect(screen.getByTestId("icon")).toBeDefined();
        });
    });

    it("shows error if diary index is out of bounds", async () => {
        mockedGetUserDiaries.mockResolvedValue(mockDiaries);
        renderWithRoute("99");

        await waitFor(() => {
            expect(screen.getByText("Error: 404 Diary not found.")).toBeDefined();
        });
    });


    it("shows error if diary pages fail to load", async () => {
        mockedGetUserDiaries.mockResolvedValue([mockDiaries[0]]);
        mockedGetDiaryEntries.mockRejectedValue(new Error("fail"));

        render(
            <MemoryRouter initialEntries={["/diary/0"]}>
                <Routes>
                    <Route path="/diary/:index" element={<DiaryPage/>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByText("Error: Failed to load pages.")).toBeDefined();
    });


    it("shows error if diary is not found", async () => {
        mockedGetDiaryEntries.mockRejectedValue(new Error("Fetch failed"));
        renderWithRoute("0");

        const errorMessage = await screen.findByText((content) =>
            content.includes("Error: Failed to load diary.")
        );
        expect(errorMessage).toBeDefined();

    });

});
