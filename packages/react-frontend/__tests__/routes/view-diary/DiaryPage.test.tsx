import {render, screen, waitFor} from "@testing-library/react";
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import {MemoryRouter, Route, Routes} from "react-router-dom";
import DiaryPage from "../../../src/routes/view-diary/DiaryPage";
import {expect, describe, it, jest, beforeEach} from "@jest/globals";
import {getUserDiaries, removePage} from "../../../src/api/backend";
import type * as backendApi from "../../../src/api/backend";
import {Diary} from "types/diary";
import {userEvent} from "@testing-library/user-event";

// Mock the API
jest.mock("../../../src/api/backend", () => ({
    getUserDiaries: jest.fn(),
    removePage: jest.fn(),
}));

const mockedGetUserDiaries = getUserDiaries as jest.MockedFunction<typeof backendApi.getUserDiaries>;
const mockedRemovePage = removePage as jest.MockedFunction<typeof backendApi.removePage>;

const mockDiaries: Diary[] = [
    {
        _id: "abc123",
        title: "Test Diary",
        lastEntry: "2025-05-01",
        numEntries: 1,
        entries: [
            {
                _id: "entry1",
                title: "Morning",
                date: "03-10-25",
                body: "Hello world!",
                likeCounter: 102,
                comments: [
                    {
                        _id: "c1",
                        text: "hi!",
                        author: "bob"
                    }
                ],
            }
        ]
    },
];

describe("DiaryPage Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        window.alert = jest.fn();
    });

    async function renderWithRoute(index = "0") {
        render(
            <MemoryRouter initialEntries={[`/app/diary/${index}`]}>
                <Routes>
                    <Route path="/app/diary/:diaryId" element={<DiaryPage/>}/>
                </Routes>
            </MemoryRouter>
        );

    }

    it("shows loading message initially", async () => {
        mockedGetUserDiaries.mockResolvedValue([mockDiaries[0]]);
        renderWithRoute("abc123");

        expect(screen.getByText("Loading diary...")).toBeDefined();
        await waitFor(() => {
            expect(expect(screen.queryByText("Loading diary...")).toBeDefined()).toBeFalsy();
        });
        expect(screen.getByText("Test Diary")).toBeDefined();
    });

    it("shows error when diaryId is undefined", async () => {
        render(
            <MemoryRouter initialEntries={["/app/diary"]}>
                <Routes>
                    <Route path="/app/diary" element={<DiaryPage/>}/>
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Error: Diary not found.")).toBeDefined();
        });
    });

    it("renders entries for valid diary index", async () => {
        mockedGetUserDiaries.mockResolvedValue([mockDiaries[0]]);
        renderWithRoute("abc123");


        await waitFor(() => {
            expect(screen.getByText("Morning")).toBeDefined();
            expect(screen.getByText("03-10-25")).toBeDefined();
            expect(screen.getByText("Hello world!")).toBeDefined();
            expect(screen.getByText("Likes 😻")).toBeDefined();
            expect(screen.getByText("102")).toBeDefined();
            expect(screen.getByText("Comments")).toBeDefined();
            expect(screen.getByText("hi!")).toBeDefined();

        });
    });
    it("renders pen icon", async () => {
        mockedGetUserDiaries.mockResolvedValue([mockDiaries[0]]);
        renderWithRoute("abc123");
        await waitFor(() => {
            expect(screen.getByTestId("icon")).toBeDefined();
        });
    });

    it("shows error if diary index is invalid", async () => {
        mockedGetUserDiaries.mockResolvedValue(mockDiaries);
        renderWithRoute("invalid");

        await waitFor(() => {
            expect(screen.getByText("Error: Diary not found.")).toBeDefined();
        });
    });

    it("delete page successful", async () => {
        mockedGetUserDiaries.mockResolvedValue([mockDiaries[0]]);
        mockedRemovePage.mockResolvedValue({});

        await renderWithRoute("abc123");

        const deleteButton = await screen.findByRole("button", {name: "Remove page"});
        await userEvent.click(deleteButton);

        await waitFor(() => {
            expect(mockedRemovePage).toHaveBeenCalledWith("entry1", "abc123")
        })
        expect(mockedGetUserDiaries).toHaveBeenCalledTimes(2);
    });
    it("shows error if deleting a page fails", async () => {
        mockedGetUserDiaries.mockResolvedValue([mockDiaries[0]]);
        mockedRemovePage.mockRejectedValue(new Error("Failed to delete"));

        await renderWithRoute("abc123");

        const deleteButton = await screen.findByRole("button", {name: "Remove page"});
        await userEvent.click(deleteButton);

        await waitFor(() => {
            expect(mockedRemovePage).toHaveBeenCalledWith("entry1", "abc123");
            expect(window.alert).toHaveBeenCalledWith(expect.stringContaining("Failed to delete page:"))
        });

        // And/or assert that the page is still present
        expect(screen.getByText("Morning")).toBeDefined();
    });
});