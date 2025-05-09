import {describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import WritePage from "../../../src/routes/write/WritePage";
import {userEvent} from "@testing-library/user-event";

const testSource = "# Heading\n## Subheading";

describe("Write Page", () => {

    it("Test render", async () => {
        // Render the Markdown component
        const user = userEvent.setup();
        const {debug} = render(<WritePage/>);
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
        const {debug} = render(<WritePage/>);
        const editor = screen.getByTestId("md-editor");

        // Test type status change
        await user.type(editor, testSource);
        const status = screen.getByText("Unsaved");
        expect(status.textContent).toBe("Unsaved");

        // Test submit
        const submitBtn = screen.getByText("Submit");
        await user.click(submitBtn);
        expect(status.textContent).toBe("Saved!");
    })
})