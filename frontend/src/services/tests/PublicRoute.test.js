import { cleanup, render } from "@testing-library/react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "../PublicRoute";

afterEach(cleanup);

const TestComponent = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<PublicRoutePage />} />
            </Route>
        </Routes>
    );
};

const PublicRoutePage = () => {
    return <div data-testid="text">PublicRoutePage</div>;
};

it("Test PublicRoute", () => {
    localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true }));
    const { getByTestId } = render(<TestComponent />, { wrapper: Router });
    expect(getByTestId("text").textContent).toBe("PublicRoutePage");
    localStorage.removeItem("auth");
});
