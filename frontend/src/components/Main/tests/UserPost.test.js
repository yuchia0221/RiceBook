import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { useState } from "react";
import { UserProvider } from "../../../context/UserProvider";
import UserPost from "../UserPost";

afterEach(cleanup);

const TestComponent = () => {
    const [posts, setPosts] = useState([]);
    return (
        <UserProvider>
            <UserPost posts={posts} setPosts={setPosts} />
        </UserProvider>
    );
};

describe("Test UserPost", () => {
    it("Test if render successfully", () => {
        render(
            <UserProvider>
                <UserPost />
            </UserProvider>
        );
    });
    it("Test handleTitleChange", async () => {
        const { getByTestId } = render(
            <UserProvider>
                <UserPost />
            </UserProvider>
        );
        const titleInput = getByTestId("title");
        fireEvent.change(titleInput, { target: { value: "title" } });
        await waitFor(() => expect(titleInput.value).toBe("title"));
    });
    it("Test handleArticleChange", async () => {
        const { getByTestId } = render(
            <UserProvider>
                <UserPost />
            </UserProvider>
        );
        const articleInput = getByTestId("article");
        fireEvent.change(articleInput, { target: { value: "article" } });
        await waitFor(() => expect(articleInput.value).toBe("article"));
    });
    it("Test handleBtnClick", async () => {
        const { getByTestId } = render(<TestComponent />);
        const title = getByTestId("title");
        const article = getByTestId("article");
        const submitButton = getByTestId("submit-button");
        fireEvent.change(title, { target: { value: "test" } });
        fireEvent.change(article, { target: { value: "test" } });
        fireEvent.click(submitButton);
    });
    it("Test handleResetBtn", async () => {
        const { getByTestId } = render(
            <UserProvider>
                <UserPost />
            </UserProvider>
        );
        const titleInput = getByTestId("title");
        const articleInput = getByTestId("article");
        const resetButton = getByTestId("reset-button");
        fireEvent.change(titleInput, { target: { value: "title" } });
        fireEvent.change(articleInput, { target: { value: "article" } });
        await waitFor(() => expect(titleInput.value).toBe("title"));
        await waitFor(() => expect(articleInput.value).toBe("article"));
        fireEvent.click(resetButton);
        await waitFor(() => expect(titleInput.value).toBe(""));
        await waitFor(() => expect(articleInput.value).toBe(""));
    });
});
