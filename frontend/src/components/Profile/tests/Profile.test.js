import { cleanup, fireEvent, render } from "@testing-library/react";
import { UserProvider } from "../../../context/UserProvider";
import Profile from "../Profile";

afterEach(cleanup);

describe("Test Profile", () => {
    it("Test Profile displayName", async () => {
        const { getByTestId } = await render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const displayName = getByTestId("displayName");
        fireEvent.change(displayName, { target: { value: "aaron" } });
        expect(displayName.value).toBe("aaron");
        fireEvent.change(displayName, { target: { value: "aaron!" } });
        expect(displayName.value).toBe("aaron!");
    });
    it("Test Profile email", () => {
        const { getByTestId } = render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const email = getByTestId("email");
        fireEvent.change(email, { target: { value: "aaron@gmail.com" } });
        expect(email.value).toBe("aaron@gmail.com");
        fireEvent.change(email, { target: { value: "a@b." } });
        expect(email.value).toBe("a@b.");
    });
    it("Test Profile phoneNumber", () => {
        const { getByTestId } = render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const phoneNumber = getByTestId("phoneNumber");
        fireEvent.change(phoneNumber, { target: { value: "123-123-1234" } });
        expect(phoneNumber.value).toBe("123-123-1234");
        fireEvent.change(phoneNumber, { target: { value: "1111111111111" } });
        expect(phoneNumber.value).toBe("1111111111111");
        fireEvent.change(phoneNumber, { target: { value: "112-122-12" } });
        expect(phoneNumber.value).toBe("112-122-12");
    });
    it("Test Profile zipcode", () => {
        const { getByTestId } = render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const zipcode = getByTestId("zipcode");
        fireEvent.change(zipcode, { target: { value: "77030" } });
        expect(zipcode.value).toBe("77030");
        fireEvent.change(zipcode, { target: { value: "122!" } });
        expect(zipcode.value).toBe("122!");
    });
    it("Test Profile password", () => {
        const { getByTestId } = render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const password = getByTestId("password");
        fireEvent.change(password, { target: { value: "password" } });
        expect(password.value).toBe("password");
    });
    it("Test Profile passwordConfirm", () => {
        const { getByTestId } = render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const passwordConfirm = getByTestId("passwordConfirm");
        fireEvent.change(passwordConfirm, { target: { value: "password" } });
        expect(passwordConfirm.value).toBe("password");
    });
    it("Test Profile Submit Button failed", () => {
        localStorage.removeItem("currentUser");
        const { getByTestId } = render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const displayName = getByTestId("displayName");
        const password = getByTestId("password");
        const passwordConfirm = getByTestId("passwordConfirm");
        const submitButton = getByTestId("submit-button");
        fireEvent.change(displayName, { target: { value: "adas&*@^&" } });
        fireEvent.change(passwordConfirm, { target: { value: "a" } });
        fireEvent.click(submitButton);
        expect(getByTestId("error-message")).toHaveTextContent("Inputs are invalid. Please check inputs again.");
    });
    it("Test Profile Submit Button success", () => {
        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                username: "Moriah.Stanton",
                displayName: "Clementina DuBuque",
                email: "Rey.Padberg@karina.biz",
                phoneNumber: "024-648-3804",
                birthday: "1999-02-21",
                status: "Centralized empowering task-force",
                zipcode: "31428",
                password: "Kattie Turnpike",
                passwordConfirm: "Kattie Turnpike",
            })
        );
        const { getByTestId } = render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const displayName = getByTestId("displayName");
        const email = getByTestId("email");
        const phoneNumber = getByTestId("phoneNumber");
        const zipcode = getByTestId("zipcode");
        const password = getByTestId("password");
        const passwordConfirm = getByTestId("passwordConfirm");
        const submitButton = getByTestId("submit-button");
        fireEvent.change(displayName, { target: { value: "aaron" } });
        fireEvent.change(email, { target: { value: "a@b.co" } });
        fireEvent.change(phoneNumber, { target: { value: "123-123-1234" } });
        fireEvent.change(zipcode, { target: { value: "12345" } });
        fireEvent.change(password, { target: { value: "password" } });
        fireEvent.change(passwordConfirm, { target: { value: "password" } });
        fireEvent.click(submitButton);
        expect(getByTestId("success-message")).toHaveTextContent("You have successfully updated your profile");
        localStorage.removeItem("currentUser");
    });
    it("Test Profile Reset Button", async () => {
        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                username: "Moriah.Stanton",
                displayName: "Clementina DuBuque",
                email: "Rey.Padberg@karina.biz",
                phoneNumber: "024-648-3804",
                birthday: "1999-02-21",
                status: "Centralized empowering task-force",
                zipcode: "31428",
                password: "Kattie Turnpike",
                passwordConfirm: "Kattie Turnpike",
            })
        );
        const { getByTestId } = render(
            <UserProvider>
                <Profile />
            </UserProvider>
        );
        const resetButton = getByTestId("reset-button");
        await fireEvent.click(resetButton);
        expect(getByTestId("displayName").value).toBe("Clementina DuBuque");
        localStorage.removeItem("currentUser");
    });
});
