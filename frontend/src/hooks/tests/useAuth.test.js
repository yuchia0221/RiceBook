import { cleanup, renderHook } from "@testing-library/react";
import useAuth from "../useAuth";

afterEach(cleanup);

it("Test useAuth", () => {
    renderHook(() => useAuth());
});
