import { cleanup, render } from "@testing-library/react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "../RequireAuth";

afterEach(cleanup);

const TestComponent = () => {
    return (
        <Routes>
            <Route element={<RequireAuth />}>
                <Route path="/" element={<PrivateRoutePage />} />
            </Route>
            <Route path="/sign-in" element={<PublicRoutePage />} />
        </Routes>
    );
};

const PublicRoutePage = () => {
    return <div data-testid="text">PublicRoutePage</div>;
};

const PrivateRoutePage = () => {
    return <div data-testid="text">PrivateRoutePage</div>;
};

describe("Test RequireAuth", () => {
    it("Not Logged In", () => {
        const { getByTestId } = render(<TestComponent />, { wrapper: Router });
        expect(getByTestId("text").textContent).toBe("PublicRoutePage");
    });
});
