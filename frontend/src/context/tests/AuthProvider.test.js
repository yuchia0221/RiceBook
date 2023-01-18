import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import AuthContext, { AuthProvider } from "../AuthProvider";

afterEach(cleanup);

const TestComponent = () => {
    const { auth, setAuth, handleAuthLogIn, handleAuthLogout } = useContext(AuthContext);

    return (
        <>
            <div data-testid="user">{auth.isLoggedIn ? "Log In" : "Log out"}</div>
            <button data-testid="set-auth" onClick={() => setAuth((prev) => ({ isLoggedIn: !prev.isLoggedIn }))}>
                Set Auth
            </button>
            <button data-testid="login-button" onClick={handleAuthLogIn}>
                Log In
            </button>
            <button data-testid="logout-button" onClick={handleAuthLogout}>
                Log Out
            </button>
        </>
    );
};

describe("Test AuthProvider", () => {
    it("Get Local Storage Data", () => {
        localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true }));
        const { getByTestId } = render(<TestComponent />, { wrapper: AuthProvider });
        expect(getByTestId("user").textContent).toBe("Log In");
        localStorage.removeItem("auth");
    });
    it("SetAuth Function", () => {
        const { getByTestId } = render(<TestComponent />, { wrapper: AuthProvider });
        expect(getByTestId("user").textContent).toBe("Log out");
        const button = screen.getByTestId("set-auth");
        fireEvent.click(button);
        expect(getByTestId("user").textContent).toBe("Log In");
    });
    it("Log In", () => {
        const { getByTestId } = render(<TestComponent />, { wrapper: AuthProvider });
        expect(getByTestId("user").textContent).toBe("Log out");
        const button = screen.getByTestId("login-button");
        fireEvent.click(button);
        expect(getByTestId("user").textContent).toBe("Log In");
        localStorage.removeItem("auth");
    });
    it("Log Out", () => {
        localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true }));
        const { getByTestId } = render(<TestComponent />, { wrapper: AuthProvider });
        expect(getByTestId("user").textContent).toBe("Log In");
        const button = screen.getByTestId("logout-button");
        fireEvent.click(button);
        expect(getByTestId("user").textContent).toBe("Log out");
        localStorage.removeItem("auth");
    });
});
