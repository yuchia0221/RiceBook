import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { auth, handleAuthLogout } = useAuth();
    const navigate = useNavigate();
    const [isClick, setIsClick] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const handleLogOutBtn = () => {
        handleAuthLogout();
        navigate("/sign-in");
    };

    const handleIsClick = () => {
        setIsClick((isClick) => !isClick);
    };
    useEffect(() => {
        if (isClick) setVisibility(true);
        else setVisibility(false);
    }, [isClick]);

    return (
        <nav className="relative w-full pt-6">
            <div className="flex">
                <div className="flex w-full items-center justify-between pl-20 pr-12">
                    <div className="flex items-center gap-x-3">
                        <img src="images/logo.svg" className="h-8 w-8" alt="logo" />
                        <NavLink to="/" className="text-xl font-bold">
                            Rice<span className="text-lightBlue ">Book</span>
                        </NavLink>
                    </div>

                    <div className="hidden md:flex">
                        <div className="mx-20 flex items-baseline space-x-4">
                            {auth?.isLoggedIn ? (
                                <>
                                    <NavLink
                                        to="/"
                                        className="px-6 py-2 hover:rounded-md hover:bg-lightBlue hover:text-white"
                                    >
                                        Main
                                    </NavLink>
                                    <NavLink
                                        to="/profile"
                                        className="px-4 py-2 hover:rounded-md hover:bg-lightBlue hover:text-white"
                                    >
                                        Profile
                                    </NavLink>
                                    <button
                                        onClick={handleLogOutBtn}
                                        className="px-4 py-2 hover:rounded-md hover:bg-lightBlue hover:text-white"
                                    >
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to="/sign-in"
                                        className="px-4 py-2 hover:rounded-md hover:bg-lightBlue hover:text-white"
                                    >
                                        Sign In
                                    </NavLink>
                                    <NavLink
                                        to="/sign-up"
                                        className="px-4 py-2 hover:rounded-md hover:bg-lightBlue hover:text-white"
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex h-10 w-10 md:hidden" onClick={handleIsClick}>
                        <img src="/images/menu.svg" alt="menu"></img>
                    </div>
                </div>
            </div>

            <Transition
                show={visibility}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3 text-center">
                        {auth.isLoggedIn ? (
                            <>
                                <NavLink
                                    to="/"
                                    className="block cursor-pointer rounded-md px-3 py-2 hover:bg-lightBlue hover:text-white"
                                >
                                    Main
                                </NavLink>
                                <NavLink
                                    to="/profile"
                                    className="block cursor-pointer rounded-md px-3 py-2 hover:bg-lightBlue hover:text-white"
                                >
                                    Profile
                                </NavLink>
                                <NavLink
                                    to="/sign-in"
                                    onClick={handleLogOutBtn}
                                    className="block cursor-pointer rounded-md px-3 py-2 hover:bg-lightBlue hover:text-white"
                                >
                                    Log out
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/sign-in"
                                    className="block cursor-pointer rounded-md px-3 py-2 hover:bg-lightBlue hover:text-white"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/sign-up"
                                    className="block cursor-pointer rounded-md px-3 py-2 hover:bg-lightBlue hover:text-white"
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </Transition>
        </nav>
    );
};

export default Navbar;
