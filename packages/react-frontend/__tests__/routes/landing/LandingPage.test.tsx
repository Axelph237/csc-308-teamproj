import { render, screen, waitFor } from "@testing-library/react";
import { TextEncoder } from "util";

global.TextEncoder = TextEncoder;
import { MemoryRouter } from "react-router-dom";
import { expect, describe, it, jest, beforeEach } from "@jest/globals";
import LandingPage from "../../../src/routes/landing/LandingPage";

describe("LandingPage Component", () => {
  it("renders RandomPage component", async () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText("Welcome to Diary Share")).toBeDefined();
      expect(
        screen.getByText(
          "In Diary Share you can store and create diary entries, just like any great diary!",
        ),
      ).toBeDefined();
      const loginButton = screen.getByRole("button", { name: "Login" });
      expect(loginButton).toBeDefined();

      const createProfButton = screen.getByRole("button", {
        name: "Create Profile",
      });
      expect(createProfButton).toBeDefined();
    });
  });
});
