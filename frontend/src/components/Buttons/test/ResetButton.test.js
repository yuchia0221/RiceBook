import { cleanup, render } from "@testing-library/react";
import ResetButton from "../ResetButton";

afterEach(cleanup);

it("Test if ResetButton renders correctly", () => {
    const { getByTestId } = render(<ResetButton buttonName="Reset" handleBtnClick={() => {}} />);
    expect(getByTestId("reset-button")).toHaveTextContent("Reset");
});
