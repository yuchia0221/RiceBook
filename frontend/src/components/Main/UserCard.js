import { useState } from "react";

const UserCard = ({ currentUser, setHeadline }) => {
    const [newHeadline, setNewHeadline] = useState("");

    const handleOnChange = (event) => {
        setNewHeadline(event.target.value);
    };

    const handleButtonClick = () => {
        if (newHeadline.length > 0) {
            setHeadline(newHeadline);
            setNewHeadline("");
        }
    };

    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") handleButtonClick();
    };

    return (
        <div className="flex p-4">
            <div className="flex space-x-3">
                <div className="w-1/5">
                    <img src={currentUser?.avatar} alt="user" className="rounded-full" />
                </div>
                <div className="w-4/5">
                    <div className="font-bold">{currentUser?.displayName}</div>
                    <div className="pt-1 text-sm text-gray-400">{currentUser?.headline}</div>
                    <div className="flex flex-row space-x-2">
                        <input
                            id="headline"
                            type="text"
                            className="w-2/3 border-b text-xs focus:outline-none"
                            placeholder="enter your status"
                            value={newHeadline}
                            onChange={handleOnChange}
                            onKeyDown={handleOnKeyDown}
                        />
                        <button
                            className="inline-flex items-center rounded-lg py-2 px-4 text-center text-xs hover:bg-lightBlue hover:text-white"
                            onClick={handleButtonClick}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
