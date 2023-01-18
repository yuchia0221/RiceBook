import { useEffect, useState } from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import api from "../../../apis/api";
import useUser from "../../../hooks/useUser";
import Post from "../Post";
import { UserProvider } from "../../../context/UserProvider";

afterEach(cleanup);

const userData = {
    1: {
        username: "Bret",
        displayName: "Leanne Graham",
    },
    2: {
        username: "Antonette",
        displayName: "Ervin Howell",
    },
    3: {
        username: "Samantha",
        displayName: "Clementine Bauch",
    },
    4: {
        username: "Karianne",
        displayName: "Patricia Lebsack",
    },
    5: {
        username: "Kamren",
        displayName: "Chelsey Dietrich",
    },
    6: {
        username: "Leopoldo_Corkery",
        displayName: "Mrs. Dennis Schulist",
    },
    7: {
        username: "Elwyn.Skiles",
        displayName: "Kurtis Weissnat",
    },
    8: {
        username: "Maxime_Nienow",
        displayName: "Nicholas Runolfsdottir V",
    },
    9: {
        username: "Delphine",
        displayName: "Glenna Reichert",
    },
    10: {
        username: "Moriah.Stanton",
        displayName: "Clementina DuBuque",
    },
};

const TestComponent = () => {
    const { currentUser } = useUser();
    const [userId, setUserId] = useState();
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState("");
    const [authors, setAuthors] = useState([10, 1, 2, 3]);

    const get_all_posts = async () => {
        await api.get("posts/").then((reponse) => {
            let data = reponse.data;
            for (let i = 0; i < data.length; i++) data[i].time = generateRandomDate();
            data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            setPosts(data);
        });
    };
    const generateRandomDate = () => {
        return new Date(new Date() - Math.random() * 1e9);
    };
    const getUserId = () => {
        for (const [key, value] of Object.entries(userData)) {
            if (value.username === currentUser?.username) {
                setUserId(parseInt(key));
            }
        }
    };
    const checkStatus = (title, id, body) => {
        if (!authors.includes(id)) return true;
        else if (filter.length === 0 || userData[id] === undefined) return false;
        else if (title.includes(filter) || body.includes(filter) || userData[id].displayName.includes(filter))
            return false;
        else return true;
    };

    useEffect(() => {
        get_all_posts();
    }, []);

    useEffect(() => {
        getUserId();
    }, [currentUser]);

    useEffect(() => {}, [userId, posts, filter]);

    return (
        <div>
            <div data-testid="userid">{userId}</div>
            <div data-testid="post">{posts[0]?.title}</div>
            <input data-testid="filter" onChange={(e) => setFilter(e.target.value)}></input>
            {posts.map((element) => {
                return (
                    <div key={element.id}>
                        <Post
                            hidden={checkStatus(element.title, element.userId, element.body)}
                            title={element.title}
                            author={userData[element.userId] ? userData[element.userId].displayName : ""}
                            article={element.body}
                            time={element.time}
                            isTextPost={true}
                        />
                    </div>
                );
            })}
        </div>
    );
};

it("should fetch all articles for current logged in user (posts state is set)", async () => {
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
    const { getByTestId, getAllByTestId } = render(<TestComponent />, { wrapper: UserProvider });
    await waitFor(() => expect(getByTestId("userid")).toHaveTextContent("10"));
    await waitFor(() => expect(getByTestId("post")).toBeTruthy());
    await waitFor(() => expect(getAllByTestId("author-time")).toHaveLength(40));
    await waitFor(() => expect(getAllByTestId("author-time")[0]).not.toContain("Patricia Lebsack"));
    await waitFor(() => expect(getAllByTestId("author-time")[0]).not.toContain("Chelsey Dietrich"));
    await waitFor(() => expect(getAllByTestId("author-time")[0]).not.toContain("Mrs. Dennis Schulist"));
    await waitFor(() => expect(getAllByTestId("author-time")[0]).not.toContain("Kurtis Weissnat"));
    await waitFor(() => expect(getAllByTestId("author-time")[0]).not.toContain("Nicholas Runolfsdottir V"));
    await waitFor(() => expect(getAllByTestId("author-time")[0]).not.toContain("Glenna Reichert"));
    localStorage.removeItem("currentUser");
});

it("should fetch subset of articles for current logged in user given search keyword (posts state is filtered)", async () => {
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
    const { getByTestId, getAllByTestId } = render(<TestComponent />, { wrapper: UserProvider });
    const input = getByTestId("filter");
    fireEvent.change(input, { target: { value: "Leanne Graham" } });
    await waitFor(() => expect(getAllByTestId("author-time")).toHaveLength(10));
    await waitFor(() => expect(getAllByTestId("author-time")[0]).toHaveTextContent("Leanne Graham"));
    localStorage.removeItem("currentUser");
});
