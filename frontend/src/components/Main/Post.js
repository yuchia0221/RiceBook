import { useState } from "react";
import { MdEdit, MdOutlineCancel, MdSaveAlt } from "react-icons/md";
import api from "../../apis/api";
import { classNames } from "../../tools/tools";
import Comment from "./Comment";

const Post = ({
    id,
    title,
    author,
    article,
    avatar,
    time,
    imagePath,
    isTextPost,
    editable,
    userComments,
    currentUser,
}) => {
    const [newComment, setnewComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [postTitle, setPostTitle] = useState(title);
    const [postBody, setPostBody] = useState(article);
    const [comments, setComments] = useState(userComments);

    const handleCommentButtonClick = async (event) => {
        event.preventDefault();
        api.put(`articles/${id}`, { commentId: -1, text: newComment }).then((response) => {
            if (response.status === 201) {
                setComments((prev) => [...prev, response.data._id]);
                setnewComment("");
            }
        });
    };
    const handleSaveButtonClick = async () => {
        setIsEditing(false);
        await api.put(`articles/${id}`, { title: postTitle, text: postBody });
    };
    const handleCancelButtonClick = async () => {
        api.get(`articles/${id}`).then((response) => {
            if (response.status === 200) {
                const article = response.data.articles[0];
                setPostTitle(article.title);
                setPostBody(article.text);
            }
        });
        setIsEditing(false);
    };
    const handleCommentOnChange = (event) => {
        setnewComment(event.target.value);
    };
    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") handleCommentButtonClick(event);
    };
    const handleShowCommentClick = () => {
        setShowComment((prev) => !prev);
    };
    const formatTime = (datetime) => {
        let year = datetime.getFullYear();
        let month = datetime.getMonth() + 1;
        let day = datetime.getDate();
        let hour = datetime.getHours();
        let minute = datetime.getMinutes();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        return `${year}-${month}-${day} ${hour}:${minute}`;
    };

    return (
        <div className="border-1 flex flex-col justify-center space-y-2 rounded-xl bg-white pb-4 shadow-md">
            <div className="mx-4 flex justify-between py-2 pt-4">
                <div className="flex space-x-2">
                    <div className="relative w-9 md:w-12">
                        <img src={avatar} alt="user" className="rounded-full" />
                    </div>
                    <div className="flex flex-col space-y-1 self-center text-xs text-gray-400 md:text-sm">
                        <div data-testid="author-time">{author}</div>
                        <div>{formatTime(time)}</div>
                    </div>
                </div>
                {editable ? (
                    isEditing ? (
                        <div className="flex flex-row space-x-2">
                            <div
                                className="flex cursor-pointer self-center rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                                onClick={handleCancelButtonClick}
                            >
                                <MdOutlineCancel />
                            </div>
                            <div
                                className="flex cursor-pointer self-center rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                                onClick={handleSaveButtonClick}
                            >
                                <MdSaveAlt />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="flex cursor-pointer self-center rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                            onClick={() => setIsEditing((prev) => !prev)}
                        >
                            <MdEdit />
                        </div>
                    )
                ) : (
                    <></>
                )}
            </div>
            <div className="mx-4 flex flex-col justify-start space-y-2">
                {isEditing ? (
                    <>
                        <input
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            data-testid="title"
                            placeholder="Edit the title"
                            value={postTitle}
                            onChange={(event) => setPostTitle(event.target.value)}
                        />
                        <input
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            data-testid="article"
                            placeholder="Edit the post"
                            value={postBody}
                            onChange={(event) => setPostBody(event.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <div className="text-xs font-bold md:text-base" data-testid="title">
                            {postTitle}
                        </div>
                        <div className="text-xs md:text-base" data-testid="article">
                            {postBody}
                        </div>
                    </>
                )}
            </div>
            <img
                className={classNames(
                    isTextPost ? "hidden" : "",
                    "flex w-full justify-center self-center rounded-md md:w-3/4"
                )}
                src={imagePath}
                alt="post"
            />
            <div className="flex w-full justify-center space-x-2 px-4">
                <input
                    type="text"
                    className="flex w-full justify-center rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-xs font-normal text-gray-500 transition ease-in-out focus:border-lightBlue focus:bg-white focus:text-gray-700 focus:outline-none md:text-base"
                    id="username"
                    placeholder="Enter newComment"
                    value={newComment}
                    onKeyDown={handleOnKeyDown}
                    onChange={handleCommentOnChange}
                    data-testid="input"
                />
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight transition duration-150 ease-in-out hover:bg-lightBlue hover:text-white hover:shadow-md"
                        onClick={handleCommentButtonClick}
                        data-testid="buttton"
                    >
                        Comment
                    </button>
                </div>
            </div>
            {comments.length > 0 ? (
                showComment ? (
                    <>
                        <div className="flex w-full flex-col space-y-4 px-4">
                            {comments.map((commentid) => {
                                return <Comment commentId={commentid} currentUser={currentUser} key={commentid} />;
                            })}
                        </div>
                        <div
                            className="flex w-full cursor-pointer px-4 hover:text-lightBlue"
                            onClick={handleShowCommentClick}
                        >
                            Show Less
                        </div>
                    </>
                ) : (
                    <div
                        className="flex w-full cursor-pointer px-4 hover:text-lightBlue"
                        onClick={handleShowCommentClick}
                    >
                        Show {comments.length} replies
                    </div>
                )
            ) : (
                <></>
            )}
        </div>
    );
};

export default Post;
