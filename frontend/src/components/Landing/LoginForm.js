import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import GoogleLoginButton from "../Buttons/GoogleLoginButton";
import LinkButton from "../Buttons/LinkButton";
import SubmitButton from "../Buttons/SubmitButton.js";

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { auth, handleAuthLogIn } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmitBtn = async (event) => {
        event.preventDefault();
        const isLoggedIn = await handleAuthLogIn(username, password);
        if (isLoggedIn) {
            setMessage("You have been logged in.");
            navigate(from, { replace: true });
        } else {
            setMessage("Incorrect username or password.");
        }
    };
    const generateMessage = () => {
        if (!auth.isLoggedIn && message.length === 0) {
            return <div className="invisible w-full py-2 px-4 text-sm">Blank</div>;
        } else if (auth.isLoggedIn) {
            return (
                <div
                    className="w-full items-center rounded-lg bg-green-100 py-2 px-4 text-sm text-green-700"
                    role="alert"
                >
                    {message}
                </div>
            );
        } else {
            return (
                <div className="w-full items-center rounded-lg bg-red-100 py-2 px-4 text-sm text-red-700" role="alert">
                    {message}
                </div>
            );
        }
    };

    return (
        <div className="md:mt-18 mt-12 flex flex-col content-center items-center justify-center space-y-3">
            <div className="block w-4/5 content-center items-center justify-center md:w-2/5">{generateMessage()}</div>
            <div className="block w-4/5 rounded-lg bg-white p-6 shadow-xl drop-shadow-md md:w-2/5">
                <div className="py-4 text-center text-lg font-bold" data-testid="title">
                    Sign in your account
                </div>
                <form>
                    <div className="mb-3 md:mb-6">
                        <label htmlFor="username" className="mb-2 inline-block text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            className="m-0 block w-full rounded border border-solid border-gray-300 bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-lightBlue focus:focus:text-gray-700 focus:outline-none"
                            id="username"
                            placeholder="Enter username"
                            data-testid="username"
                            onChange={handleUsername}
                        />
                    </div>
                    <div className="mb-3 md:mb-6">
                        <label htmlFor="password" className="mb-2 inline-block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            className="m-0 block w-full rounded border border-solid border-gray-300 bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-lightBlue focus:focus:text-gray-700 focus:outline-none"
                            id="password"
                            placeholder="Password"
                            data-testid="password"
                            onChange={handlePassword}
                        />
                    </div>
                    <div className="flex justify-center justify-items-center">
                        <SubmitButton
                            buttonName={"Sign in"}
                            handleBtnClick={handleSubmitBtn}
                            data-testid="submit-button"
                        />
                    </div>
                </form>
                <div className="mb-8 inline-flex w-full items-center justify-center md:mt-6">
                    <hr className="h-px w-full border-0 bg-gray-200" />
                    <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-gray-800">or</span>
                </div>
                <GoogleLoginButton />
                <div className="mt-6 text-center text-gray-800">
                    Not a member?&nbsp;&nbsp;&nbsp;
                    <LinkButton path="/sign-up" name="Register" />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
