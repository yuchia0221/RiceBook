import { useState } from "react";
import { apiImage } from "../../apis/api";
import { classNames } from "../../tools/tools";
import ResetButton from "../Buttons/ResetButton";
import SubmitButton from "../Buttons/SubmitButton";

const UserPost = ({ setPosts }) => {
    const [title, setTitle] = useState("");
    const [article, setArticle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [image, setImage] = useState(null);
    const [isCheck, setIsCheck] = useState(false);

    const handleTitleChange = (event) => {
        event.preventDefault();
        setErrorMessage("");
        setTitle(event.target.value);
    };
    const handleArticleChange = (event) => {
        event.preventDefault();
        setErrorMessage("");
        setArticle(event.target.value);
    };
    const handleSubmitBtn = async (event) => {
        event.preventDefault();
        if (title.length === 0 || article.length === 0) {
            setErrorMessage("Inputs should not be empty");
            return;
        }
        const formData = new FormData();
        if (!isCheck && image) formData.append("image", image);
        formData.append("title", title);
        formData.append("body", article);
        const newArticle = await apiImage.post("article", formData).then((response) => {
            if (response.status === 201) return response.data.articles[0];
        });

        setPosts((prev) => {
            const newArticles = [...prev];
            newArticles.unshift(newArticle);
            return newArticles;
        });
        setErrorMessage("");
        handleResetBtn();
    };
    const handleResetBtn = () => {
        setTitle("");
        setArticle("");
    };
    const hanldeFileSelect = (event) => {
        setImage(event.target.files[0]);
    };
    const handleCheckbox = () => {
        setIsCheck((prev) => !prev);
    };

    return (
        <div className="flex-col space-y-2">
            {errorMessage.length === 0 ? (
                <></>
            ) : (
                <div
                    className="w-full items-center rounded-lg bg-red-100 py-2 px-4 text-sm text-red-700"
                    role="alert"
                    data-testid="error-message"
                >
                    {errorMessage}
                </div>
            )}

            <div className="border-1 justify-center space-y-1 rounded-xl bg-white shadow-md">
                <form>
                    <div className="w-full rounded-lg border border-gray-200 p-2">
                        <div className="rounded-t-lg p-2">
                            <label htmlFor="title" />
                            <input
                                id="title"
                                type="text"
                                autoComplete="off"
                                className="w-full border-0 p-3 text-sm text-gray-900 focus:outline-lightBlue"
                                placeholder="Title"
                                value={title}
                                onChange={handleTitleChange}
                                data-testid="title"
                                required
                            />
                        </div>
                        <div className="rounded-t-lg p-2">
                            <label htmlFor="post" />
                            <textarea
                                id="post"
                                rows={2}
                                className="w-full border-0 p-3 text-sm text-gray-900 focus:outline-lightBlue"
                                placeholder="Write a new post..."
                                value={article}
                                onChange={handleArticleChange}
                                data-testid="article"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between border-t px-3 py-3">
                            <div className="flex justify-center space-x-3">
                                <SubmitButton
                                    buttonName={"Post"}
                                    handleBtnClick={handleSubmitBtn}
                                    data-testid="submit-button"
                                />
                                <ResetButton
                                    buttonName={"Reset"}
                                    handleBtnClick={handleResetBtn}
                                    data-testid="reset-button"
                                />
                            </div>
                            <div className="flex space-x-4 pl-0 sm:pl-2">
                                <label
                                    htmlFor="file"
                                    className={classNames(isCheck ? "invisible" : "", "cursor-pointer")}
                                >
                                    <input
                                        id="file"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={hanldeFileSelect}
                                    />
                                    <svg
                                        aria-hidden="true"
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </label>
                                <div className="flex items-center">
                                    <input
                                        id="checkbox"
                                        type="checkbox"
                                        value={isCheck}
                                        className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100"
                                        onChange={handleCheckbox}
                                        data-testid="checkbox"
                                    />
                                    <label htmlFor="checkbox" className="ml-2 cursor-pointer text-xs">
                                        Text Only
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserPost;
