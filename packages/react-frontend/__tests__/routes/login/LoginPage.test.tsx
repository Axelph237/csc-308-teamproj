import {render, screen, waitFor} from "@testing-library/react";
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import {MemoryRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../../../src/routes/login/LoginPage";
import * as auth from "@src/api/auth";
import {expect, describe, it, jest} from "@jest/globals";
import {userEvent} from "@testing-library/user-event";

describe("LoginPage Component", () => {

    it("renders LoginPage component", async () => {
        render(
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Login to your diaries")).toBeDefined();
            expect(screen.getByText("Username")).toBeDefined();
            expect(screen.getByText("Password")).toBeDefined();

            const button = screen.getByRole("button");
            expect(button).toBeDefined();
            expect(button.textContent).toBe("Login");
        });
    });
    it("logs in successfully", async () => {
        const mockLogin = jest.spyOn(auth, "login").mockResolvedValue(undefined);

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/app/home" element={<div>Welcome to Diary</div>}/>
                </Routes>
            </MemoryRouter>
        );
        await userEvent.type(screen.getByPlaceholderText("your username"), "testuser");
        await userEvent.type(screen.getByPlaceholderText("your password"), "testpass");
        await userEvent.click(screen.getByRole("button", {name: "Login"}));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("testuser", "testpass");
            expect(screen.getByText("Welcome to Diary")).toBeDefined();
        });
        mockLogin.mockRestore();
    });
    it("displays an error if login fails", async () => {
        const mockLogin = jest
            .spyOn(auth, "login")
            .mockRejectedValueOnce("Invalid credentials");
        
        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {
        });

        render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </MemoryRouter>
        );

        await userEvent.type(screen.getByPlaceholderText("your username"), "wronguser");
        await userEvent.type(screen.getByPlaceholderText("your password"), "wrongpass");
        await userEvent.click(screen.getByRole("button", {name: /login/i}));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("wronguser", "wrongpass");
            expect(alertMock).toHaveBeenCalledWith("Invalid credentials");
        });

        mockLogin.mockRestore();
        alertMock.mockRestore();
    });


});