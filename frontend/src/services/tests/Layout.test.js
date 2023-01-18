import { cleanup, render } from "@testing-library/react";
import Layout from "../Layout";

afterEach(cleanup);

it("Test if Layout renders correctly", () => {
    render(<Layout />);
});
