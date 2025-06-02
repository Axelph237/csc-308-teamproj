import {describe, expect, it, jest} from '@jest/globals';
import {render, screen, waitFor, within} from '@testing-library/react';
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import WritePage from "../../../src/routes/write/WritePage";
import {userEvent} from "@testing-library/user-event";
import {createPage, getUserDiaries} from "../../../src/api/backend";
import type * as backendApi from "../../../src/api/backend";
import {MemoryRouter, Route, Routes} from "react-router-dom";

jest.mock("../../../src/api/backend", () => ({
    createPage: jest.fn(),
    getUserDiaries: jest.fn(),
}));
const mockedCreatePage = createPage as jest.MockedFunction<typeof backendApi.createPage>;
const mockedGetUserDiaries = getUserDiaries as jest.MockedFunction<typeof backendApi.getUserDiaries>;

const testSource = "# Heading\n## Subheading";

describe("Write Page", () => {
    it("renders WritePage component", async () => {
        render(
            <MemoryRouter>
                <WritePage/>
            </MemoryRouter>
        );
        const saveButton = await screen.findByRole("button", {name: "Save Button"});
        const dropdown = await screen.findByRole("button", {name: "Dropdown"});

        await waitFor(() => {
            expect(screen.getByText("Save")).toBeDefined();
            expect(saveButton).toBeDefined();
            expect(dropdown).toBeDefined();
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
        mockedGetUserDiaries.mockResolvedValue([
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
                        body: "Hello world!"
                    }
                ]
            },
        ])
        mockedCreatePage.mockResolvedValueOnce({
            _id: "44",
            title: "Untitled Page",
            date: "2025-05-06",
            body: testSource,
        });
        const {debug} = render(
            <MemoryRouter initialEntries={["/diary?diary=abc123"]}>
                <Routes>
                    <Route path="/diary" element={<WritePage/>}/>
                </Routes>
            </MemoryRouter>);

        const dropdownBtn = screen.getByRole("button", {name: "Dropdown"});
        await user.click(dropdownBtn);

        // 2. Select a diary from the dropdown
        const dropdownList = within(screen.getByRole("list")).getByText("Test Diary");
        await user.click(dropdownList);
        expect(dropdownBtn.textContent).toContain("Test Diary");

        const editor = screen.getByTestId("md-editor");

        // Test type status change
        await user.type(editor, testSource);

        // Check Title change input
        const titleInput = screen.getByPlaceholderText("Untitled Page"); // or: getByRole("textbox", { name: /title/i })
        await user.clear(titleInput); // optional, clears "Untitled Page"
        await user.type(titleInput, "My New Page Title");


        // Check for "CloudArrowUpIcon"
        await waitFor(() => {
            expect(screen.getByText("Save")).toBeDefined();
            expect(screen.getByTestId("icon-upload")).toBeDefined();
        });

        // Click Save
        const saveBtn = screen.getByRole("button", {name: "Save Button"});
        await user.click(saveBtn);

        // After save, expect "Saved!" to appear
        await waitFor(() => {
            expect(mockedCreatePage).toHaveBeenCalledWith("abc123", {
                title: "My New Page Title",
                date: expect.any(String),
                body: testSource + "\n",
            });
            expect(screen.getByText("Saved!")).toBeDefined();
        });
    });
})