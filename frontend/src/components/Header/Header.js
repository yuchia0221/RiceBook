import useDocumentTitle from "../../hooks/useDocumentTitle";
import Navbar from "./Navbar";

const Header = ({ title }) => {
    useDocumentTitle(title);
    return <Navbar />;
};

export default Header;
