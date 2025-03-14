import {describe, expect, it} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import WritePage from "../../../src/routes/write/WritePage";

const testSource = "# Heading\n## Subheading";

describe("Write Page", () => {
    it("Test render", async () => {
        // Render the Markdown component
        const {debug} = render(<WritePage/>);

        debug();
    });
})