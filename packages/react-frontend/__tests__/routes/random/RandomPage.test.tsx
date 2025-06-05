import {render, screen, waitFor} from "@testing-library/react";
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import {MemoryRouter} from "react-router-dom";
import {expect, describe, it, jest, beforeEach} from "@jest/globals";
import {findRandomPage, addLike, postComment} from "../../../src/api/backend";
import RandomPage from "../../../src/routes/random/RandomPage";
import type * as backendApi from "../../../src/api/backend";
import {userEvent} from "@testing-library/user-event";

jest.mock("../../../src/api/backend", () => ({
    findRandomPage: jest.fn(),
    addLike: jest.fn(),
    postComment: jest.fn(),
}));

const mockedFindRandomPage = findRandomPage as jest.MockedFunction<typeof backendApi.findRandomPage>;
const mockedAddLike = addLike as jest.MockedFunction<typeof backendApi.addLike>;
const mockedPostComment = postComment as jest.MockedFunction<typeof backendApi.postComment>;

describe("RandomPage Component", () => {
    beforeEach(() => {
        // Set up mock for getUserDiaries
        mockedFindRandomPage.mockResolvedValue({
            parentDiaryId: "123",
            page: {
                _id: "44",
                title: "Diary 1",
                date: "2025-01-02",
                body: "Today I hiked up a mountain.",
                likeCounter: 50,
                comments: [{
                    _id: "c1",
                    text: "lol",
                    author: "snoopy",
                }]
            }
        });
    });

    it("renders RandomPage component", async () => {
        render(
            <MemoryRouter>
                <RandomPage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Today I hiked up a mountain.")).toBeDefined();
            expect(screen.getByText("Comments")).toBeDefined();
            const likeButton = screen.getByRole("button", {name: "😻"});
            expect(likeButton).toBeDefined();

            const commentButton = screen.findByLabelText("toggle-comments");
            expect(commentButton).toBeDefined();

            expect(screen.getByText("50")).toBeDefined();
        });
    });

    it("renders RandomPage comments", async () => {
        render(
            <MemoryRouter>
                <RandomPage/>
            </MemoryRouter>
        );
        const commentButton = screen.findByLabelText("toggle-comments");
        expect(commentButton).toBeDefined();
        await userEvent.click(await commentButton);

        const sendButton = screen.getByLabelText("send-button");

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Add Comment")).toBeDefined();
            expect(sendButton).toBeDefined();
            expect(screen.getByText("50")).toBeDefined();
            expect(screen.getByText("Comments")).toBeDefined();
            expect(screen.getByText("lol")).toBeDefined();
        });
    })

    it("renders loading state initially", async () => {
        render(
            <MemoryRouter>
                <RandomPage/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Loading...")).toBeDefined();
        });
    });

    it("RandomPage throw error failed fetch", async () => {
        mockedFindRandomPage.mockRejectedValue(new Error("Fetch failed"));
        render(<MemoryRouter>
            <RandomPage/>
        </MemoryRouter>)

        const errorMessage = await screen.findByText("Error: Failed to load page")

        expect(errorMessage).toBeDefined();
    });

    it("like button updates like counter", async () => {
        mockedAddLike.mockResolvedValue({
            likeCounter: 51,
            _id: "entry1",
            title: "Liked Page",
            date: "2025-05-01",
            body: "Hello!",
            comments: []
        });
        render(
            <MemoryRouter>
                <RandomPage/>
            </MemoryRouter>
        );
        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText("Loading...")).toBeFalsy();
        });
        const likeButton = screen.getByRole("button", {name: "😻"});
        expect(likeButton).toBeDefined();
        expect(screen.getByText("50")).toBeDefined();

        await userEvent.click(likeButton);
        await waitFor(() => {
            expect(screen.getByText("51")).toBeDefined();
        });
    });

    it("postComment button updates the page", async () => {
        mockedPostComment.mockResolvedValue({
            _id: "entry1",
            title: "Liked Page",
            date: "2025-05-01",
            body: "Hello!",
            likeCounter: 51,
            comments: [{
                _id: "c1",
                text: "great",
                author: "snoopy",
            }]
        })
        render(
            <MemoryRouter>
                <RandomPage/>
            </MemoryRouter>
        );
        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText("Loading...")).toBeFalsy();
        });

        const commentButton = await screen.findByLabelText("toggle-comments");
        expect(commentButton).toBeDefined();
        await userEvent.click(await commentButton);

        const sendButton = await screen.getByLabelText("send-button");
        const input = screen.getByPlaceholderText("Add Comment");
        await userEvent.type(input, "great");
        await userEvent.click(await sendButton);
        const newComment = await screen.findByText("great");
        expect(newComment).toBeDefined();
    });

});
