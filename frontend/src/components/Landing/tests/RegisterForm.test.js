import { cleanup, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import { UserProvider } from "../../../context/UserProvider";
import RegisterForm from "../RegisterForm";

afterEach(cleanup);

describe("Test RegisterForm", () => {
    it("Test if RegisterForm renders correctly ", () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
    });
    it("Test RegisterForm username", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const username = getByTestId("username");
        fireEvent.change(username, { target: { value: "aaron" } });
        expect(username.value).toBe("aaron");
        fireEvent.change(username, { target: { value: "1" } });
        expect(username.value).toBe("1");
        fireEvent.change(username, { target: { value: "" } });
        expect(username.value).toBe("");
        fireEvent.change(username, { target: { value: "adds!da" } });
        expect(username.value).toBe("adds!da");
    });
    it("Test RegisterForm displayName", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const displayName = getByTestId("displayName");
        fireEvent.change(displayName, { target: { value: "aaron" } });
        expect(displayName.value).toBe("aaron");
        fireEvent.change(displayName, { target: { value: "aaron!" } });
        expect(displayName.value).toBe("aaron!");
    });
    it("Test RegisterForm email", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const email = getByTestId("email");
        fireEvent.change(email, { target: { value: "aaron@gmail.com" } });
        expect(email.value).toBe("aaron@gmail.com");
        fireEvent.change(email, { target: { value: "aaron@gmail." } });
        expect(email.value).toBe("aaron@gmail.");
    });
    it("Test RegisterForm phoneNumber", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const phoneNumber = getByTestId("phoneNumber");
        fireEvent.change(phoneNumber, { target: { value: "123-123-1234" } });
        expect(phoneNumber.value).toBe("123-123-1234");
        fireEvent.change(phoneNumber, { target: { value: "1111111111111" } });
        expect(phoneNumber.value).toBe("1111111111111");
        fireEvent.change(phoneNumber, { target: { value: "112-122-12" } });
        expect(phoneNumber.value).toBe("112-122-12");
    });
    it("Test RegisterForm birthday", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const birthday = getByTestId("birthday");
        fireEvent.change(birthday, { target: { value: "1992-02-12" } });
        expect(birthday.value).toBe("1992-02-12");
        fireEvent.change(birthday, { target: { value: "2022-02-12" } });
        expect(birthday.value).toBe("2022-02-12");
    });
    it("Test RegisterForm zipcode", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const zipcode = getByTestId("zipcode");
        fireEvent.change(zipcode, { target: { value: "77030" } });
        expect(zipcode.value).toBe("77030");
        fireEvent.change(zipcode, { target: { value: "7703" } });
        expect(zipcode.value).toBe("7703");
    });
    it("Test RegisterForm password", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const password = getByTestId("password");
        fireEvent.change(password, { target: { value: "password" } });
        expect(password.value).toBe("password");
    });
    it("Test RegisterForm passwordConfirm", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const password = getByTestId("password");
        const passwordConfirm = getByTestId("passwordConfirm");
        fireEvent.change(password, { target: { value: "a" } });
        fireEvent.change(passwordConfirm, { target: { value: "password" } });
        expect(passwordConfirm.value).toBe("password");
        fireEvent.change(passwordConfirm, { target: { value: "a" } });
        expect(passwordConfirm.value).toBe("a");
    });
    it("Test RegisterForm SubmitButton", async () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <RegisterForm />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const username = getByTestId("username");
        const displayName = getByTestId("displayName");
        const email = getByTestId("email");
        const phoneNumber = getByTestId("phoneNumber");
        const birthday = getByTestId("birthday");
        const zipcode = getByTestId("zipcode");
        const password = getByTestId("password");
        const passwordConfirm = getByTestId("passwordConfirm");
        fireEvent.change(username, { target: { value: "aaron" } });
        fireEvent.change(displayName, { target: { value: "aaron" } });
        fireEvent.change(email, { target: { value: "aaron@gmail.com" } });
        fireEvent.change(phoneNumber, { target: { value: "123-123-1234" } });
        fireEvent.change(birthday, { target: { value: "1992-02-12" } });
        fireEvent.change(zipcode, { target: { value: "77030" } });
        fireEvent.change(password, { target: { value: "password123" } });
        fireEvent.change(passwordConfirm, { target: { value: "password123" } });
        const SubmitButton = getByTestId("submit-button");
        fireEvent.click(SubmitButton);
    });
});
