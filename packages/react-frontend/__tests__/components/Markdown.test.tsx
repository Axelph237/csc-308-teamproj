import {expect, test} from '@jest/globals';
import {render, screen} from '@testing-library/react';
import Markdown from "../../src/components/Markdown";

const testSource = "# Heading\n## Subheading";

test('Test correct markdown parsing', async () => {
    // Render the Markdown component
    const {debug} = render(<Markdown source={testSource}/>);

    // Test heading
    const heading = await screen.findByText("Heading");
    expect(heading.tagName).toBe("H1");

    // Test subheading
    const subheading = await screen.findByText("Subheading");
    expect(subheading.tagName).toBe("H2");
});
