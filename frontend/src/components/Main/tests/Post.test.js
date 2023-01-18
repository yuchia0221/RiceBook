import { cleanup, render } from "@testing-library/react";
import Post from "../Post";

afterEach(cleanup);

it("Test if Post renders correctly", () => {
    const { getByTestId } = render(
        <Post
            hidden={false}
            title="title"
            author="author"
            article="article"
            time={new Date()}
            imagePath="image"
            isTextPost={false}
        />
    );
    expect(getByTestId("title")).toHaveTextContent("title");
    expect(getByTestId("author-time")).toBeTruthy();
    expect(getByTestId("article")).toHaveTextContent("article");
});
