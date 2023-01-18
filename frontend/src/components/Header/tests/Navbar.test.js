import { cleanup, render } from "@testing-library/react";
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import { UserProvider } from "../../../context/UserProvider";

afterEach(cleanup);

it("Test Navbar", async () => {
    const { findAllByRole } = render(
        <MemoryRouter>
            <AuthProvider>
                <UserProvider>
                    <Navbar />
                </UserProvider>
            </AuthProvider>
        </MemoryRouter>
    );
    expect(await findAllByRole("link")).toHaveLength(3);
});
