import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageNotFound from "../PageNotFound";

afterEach(cleanup);

jest.mock("../../components/Header/Navbar.js");
it("Test if PageNotFound renders correctly", () => {
    const { getByRole, getByTestId } = render(<PageNotFound />, { wrapper: MemoryRouter });
    expect(getByRole("img").src).toContain("/images/404.png");
    expect(getByTestId("link-name")).toHaveTextContent("Home Page");
    expect(getByTestId("text")).toHaveTextContent("This Page is Lost in Space");
});
