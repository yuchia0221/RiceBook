import { useEffect, useState } from "react";
import { MdEdit, MdSaveAlt } from "react-icons/md";
import api from "../../apis/api";

const Comment = ({ commentId, currentUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [commentData, setCommentData] = useState({});

    const handleInitialization = async () => {
        const { author, text } = await api.get(`comments/${commentId}`).then((response) => {
            return response.data;
        });
        await api.get(`profile/${author}`).then((response) => {
            const data = response.data;
            const username = data.username;
            const name = data.displayname || author;
            const image = data.avatar || "/images/default-avatar.png";
            const editable = currentUser.username === author;
            setCommentData({ username: username, author: name, image: image, editable, text: text, id: commentId });
        });
    };
    const handleEditButtonClick = () => {
        setIsEditing((prev) => !prev);
    };
    const handleSaveButtonClick = async () => {
        await api.put(`comments/${commentId}`, { text: commentData.text }).then((response) => {
            if (response.status === 200) {
                setIsEditing((prev) => !prev);
            }
        });
    };
    const handleCommentChange = (event) => {
        setCommentData((prev) => {
            return { ...prev, text: event.target.value };
        });
    };

    useEffect(() => {
        handleInitialization();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex w-full space-x-3">
            <div className="w-9 md:w-12">
                <img src={commentData.image} alt="user" className="rounded-full" />
            </div>
            <div className="flex w-11/12 justify-between self-center">
                {isEditing ? (
                    <>
                        <div className="flex w-4/5 flex-col">
                            <div className="flex text-xs text-gray-400 md:text-sm">{commentData.author}</div>
                            <input
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                data-testid="commnet"
                                placeholder="Edit the commnet"
                                value={commentData.text}
                                onChange={handleCommentChange}
                            />
                        </div>
                        {commentData.username === currentUser.username ? (
                            <div
                                className="flex cursor-pointer self-center rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                                onClick={handleSaveButtonClick}
                            >
                                <MdSaveAlt />
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <>
                        <div>
                            <div className="flex text-xs text-gray-400 md:text-sm">{commentData.author}</div>
                            <div className="flex text-xs md:text-sm">{commentData.text}</div>
                        </div>
                        {commentData.username === currentUser.username ? (
                            <div
                                className="flex cursor-pointer self-center rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                                onClick={handleEditButtonClick}
                            >
                                <MdEdit />
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Comment;
