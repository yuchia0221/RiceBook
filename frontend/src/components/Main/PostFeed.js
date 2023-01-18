import { useEffect, useState } from "react";
import api from "../../apis/api";
import { classNames } from "../../tools/tools";
import Post from "./Post";
import UserPost from "./UserPost";

const PostFeed = ({ currentUser, currentFollowing }) => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState("");
    const [profiles, setProfiles] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    const handleFilterChange = (event) => {
        event.preventDefault();
        setFilter(event.target.value);
        if (event.target.value.length === 0) setIsSearching(false);
    };
    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") handleSearchButton();
    };
    const handleInitialization = async () => {
        await api.get("v2/articles").then((response) => {
            const { articles, profiles, numberOfPages } = response.data;
            setPosts(articles);
            setProfiles(profiles);
            setNumberOfPages(numberOfPages);
        });
    };
    const handleSearchButton = async () => {
        if (filter.length !== 0) setIsSearching(true);
        api.get(`v2/articles/1&${filter}`).then((response) => {
            const { articles, numberOfPages } = response.data;
            setPosts(articles);
            setCurrentPage(1);
            setNumberOfPages(numberOfPages);
        });
    };
    const handlePreviousPageButton = async () => {
        if (isSearching) {
            setCurrentPage((prev) => {
                api.get(`v2/articles/${prev - 1}&${filter}`).then((response) => {
                    setPosts(response.data.articles);
                });
                return prev - 1;
            });
        } else if (currentPage > 1) {
            setCurrentPage((prev) => {
                api.get(`v2/articles/${prev - 1}`).then((response) => {
                    setPosts(response.data.articles);
                });
                return prev - 1;
            });
        }
    };
    const handleNextPageButton = async () => {
        if (isSearching) {
            setCurrentPage((prev) => {
                api.get(`v2/articles/${prev + 1}&${filter}`).then((response) => {
                    setPosts(response.data.articles);
                });
                return prev + 1;
            });
        } else if (currentPage < numberOfPages) {
            setCurrentPage((prev) => {
                api.get(`v2/articles/${prev + 1}`).then((response) => {
                    setPosts(response.data.articles);
                });
                return prev + 1;
            });
        }
    };

    useEffect(() => {
        handleInitialization();
        // eslint-disable-next-line
    }, [currentUser, currentFollowing]);

    return (
        <div className="flex-col space-y-4 md:space-y-8">
            <div>
                <label htmlFor="search-bar" className="text-sm font-medium text-gray-900"></label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="search-bar"
                        autoComplete="off"
                        className="block w-full rounded-lg border border-gray-300 p-4 pl-10 text-sm text-gray-900 focus:outline-lightBlue"
                        placeholder="Search Author Username, Text..."
                        value={filter}
                        onKeyDown={handleOnKeyDown}
                        onChange={handleFilterChange}
                    />
                    <button
                        className="absolute right-2.5 bottom-2.5 rounded-lg px-4 py-2 text-sm font-medium hover:text-lightBlue"
                        onClick={handleSearchButton}
                    >
                        Search
                    </button>
                </div>
            </div>
            <UserPost setPosts={setPosts} />
            {posts.map((post) => {
                return (
                    <div key={post._id}>
                        <Post
                            id={post._id}
                            title={post.title}
                            author={profiles[post.author]?.displayname || post.author}
                            avatar={profiles[post.author].avatar || "/images/default-avatar.png"}
                            article={post.text}
                            time={new Date(post.date)}
                            isTextPost={post.image === undefined}
                            imagePath={post.image}
                            editable={currentUser?.username === post.author}
                            userComments={post.comments}
                            currentUser={currentUser}
                        />
                    </div>
                );
            })}
            <div className="flex flex-row justify-center space-x-2 self-center">
                <div
                    className={classNames(
                        currentPage > 1 ? "cursor-pointer hover:bg-gray-100 hover:text-gray-700" : "cursor-not-allowed",
                        "inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500"
                    )}
                    onClick={currentPage > 1 ? handlePreviousPageButton : () => {}}
                >
                    <svg
                        aria-hidden="true"
                        className="mr-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    Previous
                </div>
                <div
                    className={classNames(
                        currentPage < numberOfPages
                            ? "cursor-pointer hover:bg-gray-100 hover:text-gray-700"
                            : "cursor-not-allowed",
                        "inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-500"
                    )}
                    onClick={currentPage < numberOfPages ? handleNextPageButton : () => {}}
                >
                    Next
                    <svg
                        aria-hidden="true"
                        className="ml-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PostFeed;
