import { IoPersonRemoveOutline } from "react-icons/io5";

const Follower = ({ displayname, status, imagePath, removeFollower }) => {
    return (
        <div className="p-4">
            <div className="flex space-x-3">
                <div className="w-12">
                    <img src={imagePath} alt="follower" />
                </div>
                <div className="w-4/5">
                    <div className="font-bold" data-testid="displayname">
                        {displayname}
                    </div>
                    <div className="pt-1 text-sm text-gray-400" data-testid="status">
                        {status}
                    </div>
                </div>
                <div
                    className="relative flex w-4 cursor-pointer content-center self-center"
                    onClick={removeFollower}
                    data-testid="remove-follower"
                >
                    <IoPersonRemoveOutline className="hover:stroke-red-600" />
                </div>
            </div>
        </div>
    );
};

export default Follower;
