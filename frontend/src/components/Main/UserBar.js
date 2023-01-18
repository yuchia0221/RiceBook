import api from "../../apis/api";
import UserCard from "./UserCard";

const UserBar = ({ currentUser, setCurrentUser }) => {
    const setHeadline = async (value) => {
        api.put("headline", { headline: value });
        setCurrentUser((prev) => {
            return { ...prev, headline: value };
        });
    };

    return (
        <div className="rounded-md bg-white shadow-md">
            <UserCard
                currentUser={currentUser}
                setHeadline={setHeadline}
            />
        </div>
    );
};

export default UserBar;
