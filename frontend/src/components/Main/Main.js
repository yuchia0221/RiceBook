import { useEffect, useState } from "react";
import api from "../../apis/api";
import PostFeed from "./PostFeed";
import SideBar from "./SideBar";
import UserBar from "./UserBar";

const Main = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentFollowing, setCurrentFollowing] = useState([]);

    const handleInitilization = () => {
        api.get("profile").then((response) => {
            const data = response.data;
            const username = data.username;
            const displayName = data.displayname || username;
            const headline = data.headline || "No Status";
            const avatar = data.avatar || "images/default-avatar.png";
            setCurrentUser({ username, displayName, headline, avatar });
        });
    };

    useEffect(() => {
        handleInitilization();
    }, []);

    return (
        <div className="my-6 flex w-full flex-col justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <div className="flex h-full w-4/5 flex-col space-y-4 self-center md:w-1/3 md:space-y-8 md:self-start xl:w-1/4">
                <UserBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
                <SideBar currentUser={currentUser} setCurrentFollowing={setCurrentFollowing} />
            </div>
            <div className="h-full w-4/5 flex-col space-y-4 self-center md:w-2/3 md:space-y-8 md:self-auto lg:w-3/5">
                <PostFeed currentUser={currentUser} currentFollowing={currentFollowing} />
            </div>
        </div>
    );
};

export default Main;
