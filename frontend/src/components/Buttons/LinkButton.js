import { Link } from "react-router-dom";

const LinkButton = ({ path, name }) => {
    return (
        <Link to={path} data-testid="link">
            <span
                className="cursor-pointer text-lightBlue transition duration-200 ease-in-out hover:font-bold hover:text-sky-600 focus:text-sky-700"
                data-testid="link-name"
            >
                {name}
            </span>
        </Link>
    );
};

export default LinkButton;
