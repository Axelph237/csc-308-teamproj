import {render, screen, waitFor} from '@testing-library/react';
import {TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import ProtectedRoutes from '@src/components/ProtectedRoutes';
import {getUser} from '@src/api/backend';

jest.mock('@src/api/backend');

describe("ProtectedRoutes", () => {
    it("renders outlet when user is authenticated", async () => {
        (getUser as jest.Mock).mockResolvedValue({name: "Test User"});

        render(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/protected" element={<div>Protected Content</div>}/>
                    </Route>
                    <Route path="/login" element={<div>Login Page</div>}/>
                </Routes>
            </MemoryRouter>
        );

        // Wait for the protected content to appear
        await waitFor(() => {
            expect(screen.queryByText("Protected Content")).toBeTruthy();
        });
    });

    it("redirects to login when user is not authenticated", async () => {
        (getUser as jest.Mock).mockResolvedValue(null);

        render(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/protected" element={<div>Protected Content</div>}/>
                    </Route>
                    <Route path="/login" element={<div>Login Page</div>}/>
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText("Login Page")).toBeTruthy();
        });
    });
});
