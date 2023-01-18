import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import { UserProvider } from "../../../context/UserProvider";

afterEach(cleanup);

describe("Test LoginForm", () => {
    it("Test if LoginForwm renders correctly", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <LoginForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        expect(getByTestId("title").textContent).toBe("Sign in your account");
    });
    it("Test username input onChange", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <LoginForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const input = getByTestId("username");
        fireEvent.change(input, { target: { value: "aaron" } });
        expect(input.value).toBe("aaron");
    });
    it("Test password input onChange", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <LoginForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const input = getByTestId("password");
        fireEvent.change(input, { target: { value: "password" } });
        expect(input.value).toBe("password");
    });
    it("should log in a previously registered user (not new users, login state should be set)", async () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <LoginForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const username = getByTestId("username");
        const password = getByTestId("password");
        const button = getByTestId("submit-button");
        fireEvent.change(username, { target: { value: "Bret" } });
        fireEvent.change(password, { target: { value: "Kulas Light" } });
        expect(username.value).toBe("Bret");
        expect(password.value).toBe("Kulas Light");
        fireEvent.click(button);
        const loggedInMessage = await screen.findByText("You have been logged in.");
        expect(loggedInMessage.textContent).toBe("You have been logged in.");
    });
    it("should not log in an invalid user (error state should be set)", async () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <LoginForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const username = getByTestId("username");
        const password = getByTestId("password");
        const button = getByTestId("submit-button");
        fireEvent.change(username, { target: { value: "Bret" } });
        fireEvent.change(password, { target: { value: "Wrong Password" } });
        expect(username.value).toBe("Bret");
        expect(password.value).toBe("Wrong Password");
        fireEvent.click(button);
        const loggedInMessage = await screen.findByText("Incorrect username or password.");
        expect(loggedInMessage.textContent).toBe("Incorrect username or password.");
    });
});
