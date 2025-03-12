import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import HomePage from "./HomePage";
import {getUserDiaries} from "../../api/user";
import {expect, describe, it, jest} from "@jest/globals";
//import '@testing-library/jest-dom';

// const {expect, describe, it} = require('@jest/globals');
// Mock the API function
jest.mock("../../api/user.ts", () => ({
    getUserDiaries: jest.fn(),
}));

describe("HomePage Component", () => {
    it("renders the HomeHeader component", () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );
        expect(screen.getByText("Welcome to Diary")).toBeInTheDocument();
    });

    it("renders the loading state initially", () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );
        expect(screen.getByText("Loading diaries...")).toBeInTheDocument();
    });

    it("renders the Create Diary button", () => {
        render(
            <MemoryRouter>
                <HomePage/>
            </MemoryRouter>
        );
        expect(screen.getByText("Create Diary")).toBeInTheDocument();
    });
});
