import {render, screen, waitFor} from "@testing-library/react";
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import userEvent from "@testing-library/user-event";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import CreateProfilePage from "../../../src/routes/createProfile/CreateProfilePage";
import * as auth from "@src/api/auth";
import toastMock from "react-hot-toast";
import {jest} from "@jest/globals";
import {signup} from "@src/api/auth";

jest.mock("@src/api/auth");

const mockSignup = signup as jest.MockedFunction<typeof signup>;


describe("CreateProfilePage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders correctly", () => {
        render(
            <MemoryRouter>
                <CreateProfilePage/>
            </MemoryRouter>
        );

        expect(screen.getAllByText("Create Profile")).toBeDefined();
        expect(screen.getByPlaceholderText("your username")).toBeDefined();
        expect(screen.getByPlaceholderText("your email")).toBeDefined();
        expect(screen.getByPlaceholderText("your password")).toBeDefined();
        expect(screen.getByPlaceholderText("retype password")).toBeDefined();
    });

    it("calls signup and navigates to /app/home on success", async () => {
        const mockSignup = jest
            .spyOn(auth, "signup")
            .mockResolvedValue("Success");

        render(
            <MemoryRouter initialEntries={["/createProfile"]}>
                <Routes>
                    <Route path="/createProfile" element={<CreateProfilePage/>}/>
                    <Route path="/app/home" element={<div>Welcome to Diary</div>}/>
                </Routes>
            </MemoryRouter>
        );

        // Fill out form
        await userEvent.type(screen.getByPlaceholderText("your username"), "testuser");
        await userEvent.type(screen.getByPlaceholderText("your email"), "test@example.com");
        await userEvent.type(screen.getByPlaceholderText("your password"), "StrongPass12!");
        await userEvent.type(screen.getByPlaceholderText("retype password"), "StrongPass12!");

        await userEvent.click(screen.getByRole("button", {name: /create profile/i}));

        // Expect navigation & signup call
        await waitFor(() => {
            expect(mockSignup).toHaveBeenCalledWith("test@example.com", "testuser", "StrongPass12!");
            expect(screen.getByText("Welcome to Diary")).toBeDefined();
        });

        mockSignup.mockRestore(); // ✅ clean up
    });

    it("shows error if passwords do not match", async () => {
        render(
            <MemoryRouter>
                <CreateProfilePage/>
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText("your username"), "testuser");
        await userEvent.type(screen.getByPlaceholderText("your email"), "test@example.com");
        await userEvent.type(screen.getByPlaceholderText("your password"), "GoodPass123!");
        await userEvent.type(screen.getByPlaceholderText("retype password"), "Mismatch123!");

        await userEvent.click(screen.getByRole("button", {name: "Create Profile"}));

        expect(toastMock.error).toHaveBeenCalledWith("Passwords don't match");
    });

    it("shows error for weak password", async () => {
        render(
            <MemoryRouter>
                <CreateProfilePage/>
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText("your username"), "testuser");
        await userEvent.type(screen.getByPlaceholderText("your email"), "test@example.com");
        await userEvent.type(screen.getByPlaceholderText("your password"), "weak");
        await userEvent.type(screen.getByPlaceholderText("retype password"), "weak");

        await userEvent.click(screen.getByRole("button", {name: "Create Profile"}));

        expect(toastMock.error).toHaveBeenCalledWith(expect.stringContaining("Password must include"));
    });

    it("shows toast error if signup fails", async () => {
        const mockSignup = auth.signup as jest.Mock;
        // @ts-ignore
        mockSignup.mockRejectedValueOnce("Email already used");

        render(
            <MemoryRouter>
                <CreateProfilePage/>
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText("your username"), "testuser");
        await userEvent.type(screen.getByPlaceholderText("your email"), "test@example.com");
        await userEvent.type(screen.getByPlaceholderText("your password"), "GoodPass123!");
        await userEvent.type(screen.getByPlaceholderText("retype password"), "GoodPass123!");

        await userEvent.click(screen.getByRole("button", {name: "Create Profile"}));

        await waitFor(() => {
            expect(toastMock.error).toHaveBeenCalledWith("Email already used");
        });
    });
});
