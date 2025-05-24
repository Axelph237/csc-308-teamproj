import {describe, expect, it, jest} from '@jest/globals';
import {render, screen, waitFor} from '@testing-library/react';
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import WritePage from "../../../src/routes/write/WritePage";
import {userEvent} from "@testing-library/user-event";
import {createPage, getUserDiaries} from "../../../src/api/backend";
import type * as backendApi from "../../../src/api/backend";
import {MemoryRouter, Route, Routes} from "react-router-dom";

jest.mock("../../../src/api/backend", () => ({
    createPage: jest.fn(),
}));
const mockedCreatePage = createPage as jest.MockedFunction<typeof backendApi.createPage>;

const testSource = "# Heading\n## Subheading";

describe("Write Page", () => {
    it("renders WritePage component", async () => {
        render(
            <MemoryRouter>
                <WritePage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Submit")).toBeDefined();
        });
    });
    it("Test render", async () => {
        // Render the Markdown component
        const user = userEvent.setup();
        const {debug} = render(<MemoryRouter> <WritePage/> </MemoryRouter>);
        const editor = screen.getByTestId("md-editor");

        await user.type(editor, testSource);

        const h1 = screen.getByText("Heading");
        const h2 = screen.getByText("Subheading");
        // debug();
        expect(h1.tagName).toBe("H1");
        expect(h2.tagName).toBe("H2");
    });

    it("Test upload & status", async () => {
        const user = userEvent.setup();
        mockedCreatePage.mockResolvedValueOnce({
            _id: "44",
            title: "Untitled Page",
            date: "2025-05-06",
            body: testSource,
        });
        const {debug} = render(
            <MemoryRouter initialEntries={[`/diary/123`]}>
                <Routes>
                    <Route path="/diary/:diaryId" element={<WritePage/>}/>
                </Routes>
            </MemoryRouter>);
        const editor = screen.getByTestId("md-editor");

        // Test type status change
        await user.type(editor, testSource);
        const status = screen.getByText("Unsaved");
        expect(status.textContent).toBe("Unsaved");

        // Test submit
        const submitBtn = screen.getByText("Submit");
        await user.click(submitBtn);

        await waitFor(() => {
            expect(mockedCreatePage).toHaveBeenCalledWith("123", {
                title: "Untitled Page",
                date: expect.any(String),
                body: testSource + "\n",
            });
            expect(status.textContent).toBe("Saved!");
        })

    })
})