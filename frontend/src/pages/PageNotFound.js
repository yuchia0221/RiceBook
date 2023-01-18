import { NavLink } from "react-router-dom";
import Header from "../components/Header/Header";

const PageNotFound = () => {
    return (
        <>
            <Header title="RiceBook | Page Not Found" />
            <div className="mt-16 flex h-full w-full flex-col items-center space-y-4 lg:mt-32 xl:mt-8">
                <div className="relative h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72">
                    <img src="/images/404.png" alt="404" layout="fill" />
                </div>
                <div className="text-2xl font-bold" data-testid="text">
                    This Page is Lost in Space
                </div>
                <NavLink
                    to="/"
                    className="inline-flex items-center rounded-lg bg-lightBlue py-2.5 px-5 text-center text-xs font-medium uppercase hover:text-white hover:ring-2 hover:ring-lightBlue"
                    data-testid="link-name"
                >
                    Home Page
                </NavLink>
            </div>
            <div className="my-12 flex h-full w-full flex-col items-center space-y-4">
                <div className="flex w-2/3 justify-center text-justify text-xs font-light text-gray-400 lg:text-base">
                    You thought this mission to the moon would be a quick six month thing. Your neighbor offered to look
                    after your dog. Your high school math teacher was impressed. He once said you wouldn&lsquo;t amount
                    to anything. You sure showed him. But now here you are, fifty feet from your spaceship with no way
                    to get back. Your dog will be so sad. Your math teacher will be so smug. Pretty devastating.
                </div>
                <div className="text-xs font-light text-gray-400 lg:text-base">
                    Special Thanks to{" "}
                    <a
                        href="https://www.kapwing.com"
                        className="text-lightBlue hover:text-cyan-500"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Kapwing
                    </a>{" "}
                    for 404 images.
                </div>
            </div>
        </>
    );
};

export default PageNotFound;
