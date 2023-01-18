import { cleanup, render } from "@testing-library/react";
import LinkButton from "../LinkButton";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

it("Test if LinkButton renders correctly", () => {
    const { getByTestId } = render(<LinkButton path="/sign-in" name="Log In" />, { wrapper: MemoryRouter });
    expect(getByTestId("link-name")).toHaveTextContent("Log In");
});
