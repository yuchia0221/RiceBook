import { cleanup, renderHook } from "@testing-library/react";
import useDocumentTitle from "../useDocumentTitle";

afterEach(cleanup);

it("Test useAuth", () => {
    renderHook(() => useDocumentTitle());
});
