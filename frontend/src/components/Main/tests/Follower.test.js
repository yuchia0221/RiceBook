import { cleanup, render } from "@testing-library/react";
import Follower from "../Follower";

afterEach(cleanup);

it("Test if Follower renders correctly", () => {
    const { getByTestId } = render(
        <Follower displayName="hello" status="my status" imagePath="fake" removeFollower={() => {}} />
    );
    expect(getByTestId("displayname")).toHaveTextContent("hello");
    expect(getByTestId("status")).toHaveTextContent("my status");
});
