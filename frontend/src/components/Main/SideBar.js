import { useEffect, useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import api from "../../apis/api";
import Follower from "./Follower";

const SideBar = ({ currentUser, setCurrentFollowing }) => {
    const [hasError, setHasError] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const [followingName, setFollowingName] = useState("");

    const addFollower = async (event) => {
        event.preventDefault();
        if (!/^[A-Za-z0-9 ._-]+$/.test(followingName)) {
            setHasError(true);
            return;
        } else {
            api.put(`following/${followingName}`).then((response) => {
                if (response.status === 200) {
                    const newFollowing = response.data.newFollowing;
                    const { _id, username, displayname, avatar, headline } = newFollowing;
                    const name = displayname || username;
                    const imagePath = avatar || "/images/default-avatar.png";
                    const status = headline || "No Status";
                    setFollowingList((prev) => [
                        ...prev,
                        { id: _id, username, displayname: name, imagePath, status: status },
                    ]);
                    setCurrentFollowing([...followingList]);
                    setHasError(false);
                    setFollowingName("");
                } else if (response.status === 204 || response.status === 205) {
                    setHasError(true);
                }
            });
        }
    };
    const removeFollower = async (username) => {
        await api.delete(`following/${username}`);
        setFollowingList((prev) => {
            const newFollowingList = prev.filter((user) => user.username !== username);
            return newFollowingList;
        });
        setCurrentFollowing([...followingList]);
    };
    const handleInitialization = async () => {
        if (currentUser?.username) {
            const data = await api.get("following").then((response) => {
                return response.data.following;
            });
            const following = data.filter((user) => user !== currentUser.username);
            const result = await getFollowing(following);
            setFollowingList([...result]);
        }
    };
    const getFollowing = async (following) => {
        return await Promise.all(
            following.map(async (username) => {
                return await api.get(`profile/${username}`).then((response) => {
                    const { _id, username, displayname, avatar, headline } = response.data;
                    const name = displayname || username;
                    const imagePath = avatar || "/images/default-avatar.png";
                    const status = headline || "No Status";
                    return { id: _id, username, displayname: name, imagePath, status: status };
                });
            })
        );
    };

    const handleOnChange = (event) => {
        event.preventDefault();
        setFollowingName(event.target.value);
    };
    const handleOnKeyDown = (event) => {
        if (event.key === "Enter") addFollower(event);
    };

    useEffect(() => {
        handleInitialization();
        // eslint-disable-next-line
    }, [currentUser]);

    return (
        <div className="flex flex-col gap-y-2 rounded-md bg-white pb-4 shadow-md md:w-full md:self-auto">
            <div className="px-4 pt-4 font-bold">Followers</div>
            {hasError ? (
                <div
                    className="flex w-11/12 self-center rounded-lg bg-red-100 py-2 px-4 text-sm text-red-700"
                    role="alert"
                >
                    Please enter a valid name
                </div>
            ) : (
                <></>
            )}
            <div className="flex space-x-3 px-4">
                <div className="flex w-full justify-center">
                    <label htmlFor="followingName" className="mb-2 inline-block text-gray-700"></label>
                    <input
                        type="text"
                        className="block w-full rounded border border-solid border-gray-300 bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-lightBlue focus:bg-white focus:text-gray-700 focus:outline-none"
                        id="followingName"
                        placeholder="Enter Follower Name"
                        value={followingName}
                        onChange={handleOnChange}
                        onKeyDown={handleOnKeyDown}
                        data-testid="add-follower"
                        required
                    />
                </div>
                <div
                    className="relative flex w-4 cursor-pointer content-center self-center"
                    onClick={addFollower}
                    data-testid="follower-button"
                >
                    <IoPersonAddOutline className="hover:stroke-blue-400" />
                </div>
            </div>
            {followingList.map(({ id, username, displayname, status, imagePath }) => {
                return (
                    <div key={id}>
                        <Follower
                            displayname={displayname}
                            status={status}
                            imagePath={imagePath}
                            removeFollower={() => removeFollower(username)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default SideBar;
