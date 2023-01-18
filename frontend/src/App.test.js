import { render } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

jest.mock("./components/Header/Header.js");
jest.mock("./components/Landing/LoginForm.js");
test("renders learn react link", () => {
    render(<App />, { wrapper: AuthProvider });
});
