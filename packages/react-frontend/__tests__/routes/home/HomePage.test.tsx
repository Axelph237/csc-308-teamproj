import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import HomePage from "../../../src/routes/home/HomePage";
import {getUserDiaries} from "../../../src/api/user";
import {expect, describe, it, jest} from "@jest/globals";
//import '@testing-library/jest-dom';

// const {expect, describe, it} = require('@jest/globals');
// Mock the API function

describe("HomePage Component", () => {
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
    test('renders Diary titles in user.ts is successful', async () => {
        render(<MemoryRouter>
            <HomePage/>
        </MemoryRouter>);

        await waitFor(() => {
            expect(screen.findByText('Diary 1')).toBeDefined();
            expect(screen.findByText('A Second Diary')).toBeDefined();
        })

        // expect(await screen.findByText('Another Entry')).toBeInTheDocument();
    });

});
