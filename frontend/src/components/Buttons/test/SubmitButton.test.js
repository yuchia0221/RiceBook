import { cleanup, render } from "@testing-library/react";
import SubmitButton from "../SubmitButton";

afterEach(cleanup);

it("Test if SubmitButton renders correctly", () => {
    const { getByTestId } = render(<SubmitButton buttonName="Submit" handleBtnClick={() => {}} />);
    expect(getByTestId("submit-button")).toHaveTextContent("Submit");
});
