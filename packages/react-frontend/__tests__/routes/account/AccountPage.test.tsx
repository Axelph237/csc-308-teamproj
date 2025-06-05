import {render, screen, waitFor} from "@testing-library/react";
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import {MemoryRouter} from "react-router-dom";
import AccountPage from "../../../src/routes/account/AccountPage";
import {expect, describe, it, beforeEach, beforeAll} from "@jest/globals";
import userEvent from "@testing-library/user-event";
import type * as backendApi from "../../../src/api/backend";
import {jest} from "@jest/globals";
import {act} from "react";
import toastMock from "react-hot-toast";

jest.mock("react-hot-toast");

jest.mock("../../../src/api/backend", () => ({
    getUser: jest.fn(),
    editUser: jest.fn(),
    editPassword: jest.fn(),
}));
// Dummy Data
const dummyUser = {
    _id: "1",
    username: "testuser",
    email: "testuser@example.com",
    password: "pass",
    diariesID: [],
    profilePicture: null,
};

const {getUser, editPassword, editUser} = require("../../../src/api/backend");
const mockedGetUser = getUser as jest.MockedFunction<typeof backendApi.getUser>;
const mockedEditPassword = editPassword as jest.MockedFunction<typeof backendApi.editPassword>;
const mockedEditUser = editUser as jest.MockedFunction<typeof backendApi.editUser>;


describe("AccountPage Component", () => {
    const user = userEvent.setup();

    async function renderWithRouter(component: React.ReactNode) {
        await act(async () => {
            render(<MemoryRouter>{component}</MemoryRouter>);
        });
    }

    beforeAll(() => {
        global.URL.createObjectURL = jest.fn(() => "mocked-preview-url");
    })
    beforeEach(() => {
        mockedGetUser.mockResolvedValue(dummyUser);
        mockedEditPassword.mockResolvedValue(dummyUser);
        mockedEditUser.mockResolvedValue({...dummyUser, profilePicture: dummyUser.profilePicture});
        window.alert = jest.fn();
    });

    it("renders AccountPage component", async () => {
        render(
            <MemoryRouter>
                <AccountPage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            const heading = screen.getByText("Account Settings");
            expect(heading).toBeDefined();

            const profileBtn = screen.getByRole("button", {name: "Change Profile Picture"});
            const resetBtn = screen.getByRole("button", {name: "Reset Password"});

            expect(profileBtn).toBeDefined();
            expect(resetBtn).toBeDefined();

            const logoutBtn = screen.getByRole("link", {name: "Log Out"});
            expect(logoutBtn).toBeDefined();


            const username = screen.getByText("Username: testuser");
            expect(username).toBeDefined();

            const email = screen.getByText("Email: testuser@example.com");
            expect(email).toBeDefined();
        });
    });
    it("opens password modal and cancels it", async () => {
        await renderWithRouter(<AccountPage/>);

        const resetBtn = screen.getByRole("button", {name: "Reset Password"});
        await user.click(resetBtn);

        const cancelModalBtn = await screen.getByRole("button", {name: "Cancel"});
        expect(cancelModalBtn).toBeDefined();

        // Click cancel
        await user.click(cancelModalBtn);

        // Optionally assert the modal disappeared
        await waitFor(() => {
            expect(screen.queryByPlaceholderText("Enter new password")).toBeNull();
        });
    });

    it("toast error weak new password through modal", async () => {
        await renderWithRouter(<AccountPage/>);

        const resetBtn = screen.getByRole("button", {name: "Reset Password"});
        await user.click(resetBtn);

        const changePwdBtn = await screen.getByRole("button", {name: "Change Password"});
        const newPwdInput = await screen.findByPlaceholderText("Enter new password");

        await user.type(newPwdInput, "weak");
        await user.click(changePwdBtn);

        await waitFor(() => {
            expect(toastMock.error).toHaveBeenCalledWith(expect.stringContaining("Password must include"));
        });
    });

    it("submits a new password through modal", async () => {
        await renderWithRouter(<AccountPage/>);

        const resetBtn = screen.getByRole("button", {name: "Reset Password"});
        await user.click(resetBtn);

        const changePwdBtn = await screen.getByRole("button", {name: "Change Password"});
        const newPwdInput = await screen.findByPlaceholderText("Enter new password");

        await user.type(newPwdInput, "NEwp12!!");
        await user.click(changePwdBtn);

        await waitFor(() => {
            expect(mockedEditPassword).toHaveBeenCalledWith("1", "NEwp12!!");
        });
    });

    it("opens profile picture modal and cancels it", async () => {
        await renderWithRouter(<AccountPage/>);

        const profileBtn = screen.getByRole("button", {name: "Change Profile Picture"});
        await user.click(profileBtn);

        const cancelModalBtn = await screen.getByRole("button", {name: "Cancel"});
        expect(cancelModalBtn).toBeDefined();

        // Click cancel
        await user.click(cancelModalBtn);

        // Assert modal is closed
        await waitFor(() => {
            expect(screen.queryByPlaceholderText("Enter image URL")).toBeNull();
        });
    });


    it("uploads a new profile pic", async () => {
        await renderWithRouter(<AccountPage/>);

        const profileBtn = screen.getByRole("button", {name: "Change Profile Picture"});
        await user.click(profileBtn);

        const cancelModalBtn = await screen.getByRole("button", {name: "Cancel"});
        const uploadBtn = await screen.getByRole("button", {name: "Upload"});

        expect(cancelModalBtn).toBeDefined();
        expect(uploadBtn).toBeDefined();
        expect(uploadBtn.getAttribute("aria-disabled")).toBe("true");

        // Find the url input
        const urlInput = screen.getByPlaceholderText("Enter image URL");
        expect(urlInput).toBeDefined();

        const display = screen.getByText("No image URL");
        expect(display).toBeDefined();

        const url = "https://image"
        await user.type(urlInput, url);

        await waitFor(() => {
            expect(uploadBtn.getAttribute("aria-disabled")).toBe("false");
        })


        await user.click(uploadBtn);
        await waitFor(() => {
            expect(editUser).toHaveBeenCalledWith({
                email: "testuser@example.com",
                profilePicture: "https://image",
                username: "testuser",
            }, "1");
        })
        expect(toastMock.success).toHaveBeenCalledWith("Profile picture updated!");

    });


});