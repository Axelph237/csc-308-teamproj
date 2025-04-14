import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import AccountPage from "../../../src/routes/account/AccountPage";
import {expect, describe, it} from "@jest/globals";
import userEvent from "@testing-library/user-event";

describe("AccountPage Component", () => {
    const user = userEvent.setup();

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
        });
    });
    it("opens password modal and shows modal buttons", async () => {
        render(
            <MemoryRouter>
                <AccountPage/>
            </MemoryRouter>
        );
        const resetBtn = screen.getByRole("button", {name: "Reset Password"});
        await user.click(resetBtn);

        const cancelModalBtn = await screen.getByRole("button", {name: "Cancel"});
        const changePwdBtn = await screen.getByRole("button", {name: "Change Password"});
        expect(cancelModalBtn).toBeDefined();
        expect(changePwdBtn).toBeTruthy();
        await user.click(cancelModalBtn);

    });

    it("opens profile picture modal and shows", async () => {
        render(
            <MemoryRouter>
                <AccountPage/>
            </MemoryRouter>
        );
        const profileBtn = screen.getByRole("button", {name: "Change Profile Picture"});
        await user.click(profileBtn);

        const cancelModalBtn = await screen.getByRole("button", {name: "Cancel"});
        const uploadBtn = await screen.getByRole("button", {name: "Upload"});

        expect(cancelModalBtn).toBeDefined();
        expect(uploadBtn).toBeDefined();
        expect(uploadBtn.getAttribute("aria-disabled")).toBe("true");

        // Find the file input
        const fileInput = screen.getByLabelText("Upload profile picture");
        expect(fileInput).toBeDefined();
        expect(screen.getByText("No image selected")).toBeDefined();
        
        // const file = new File(["hello"], "hello.png", {type: "image/png"});
        // await user.upload(fileInput, file);

    });


});