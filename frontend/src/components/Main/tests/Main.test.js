import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import Main from "../Main";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthProvider";
import { UserProvider } from "../../../context/UserProvider";

afterEach(cleanup);

describe("Test Main", () => {
    it("should add articles when adding a follower (posts state is larger )", async () => {
        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                username: "Moriah.Stanton",
                displayName: "Clementina DuBuque",
                email: "Rey.Padberg@karina.biz",
                phoneNumber: "024-648-3804",
                birthday: "1999-02-21",
                status: "Centralized empowering task-force",
                zipcode: "31428",
                password: "Kattie Turnpike",
                passwordConfirm: "Kattie Turnpike",
            })
        );
        const { getByTestId, getAllByTestId } = await render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <Main />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const followerInput = getByTestId("add-follower");
        const followerButton = getByTestId("follower-button");
        const previous_posts_number = await waitFor(() => getAllByTestId("author-time").length, { timeout: 4000 });
        await fireEvent.change(followerInput, { target: { value: "Chelsey Dietrich" } });
        await fireEvent.click(followerButton);
        const new_posts_number = await waitFor(() => getAllByTestId("author-time").length, { timeout: 4000 });
        expect(previous_posts_number).toBeLessThan(new_posts_number);
        localStorage.removeItem("currentUser");
    });
    it("should remove articles when removing a follower (posts state is smaller)", async () => {
        localStorage.setItem(
            "currentUser",
            JSON.stringify({
                username: "Moriah.Stanton",
                displayName: "Clementina DuBuque",
                email: "Rey.Padberg@karina.biz",
                phoneNumber: "024-648-3804",
                birthday: "1999-02-21",
                status: "Centralized empowering task-force",
                zipcode: "31428",
                password: "Kattie Turnpike",
                passwordConfirm: "Kattie Turnpike",
            })
        );
        const { getAllByTestId } = await render(
            <MemoryRouter>
                <AuthProvider>
                    <UserProvider>
                        <Main />
                    </UserProvider>
                </AuthProvider>
            </MemoryRouter>
        );
        const previous_posts_number = await waitFor(() => getAllByTestId("author-time").length, { timeout: 4000 });
        const removeButton = await waitFor(() => getAllByTestId("remove-follower")[0]);
        await fireEvent.click(removeButton);
        const new_posts_number = await waitFor(() => getAllByTestId("author-time").length, { timeout: 4000 });
        expect(previous_posts_number).toBeGreaterThan(new_posts_number);
        localStorage.removeItem("currentUser");
    });
});
