import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api.js";
import useAuth from "../../hooks/useAuth.js";
import useFormState from "../../hooks/useFormReducer";
import { validateRegisterForm } from "../../services/formValidator.js";
import { classNames } from "../../tools/tools";
import LinkButton from "../Buttons/LinkButton";
import SubmitButton from "../Buttons/SubmitButton.js";
import FormInput from "../Input/FormInput";

const defaultFormData = {
    username: { value: "", message: "", isValid: false },
    displayName: { value: "", message: "", isValid: true },
    email: { value: "", message: "", isValid: false },
    phoneNumber: { value: "", message: "", isValid: false },
    birthday: { value: "", message: "", isValid: false },
    zipcode: { value: "", message: "", isValid: false },
    password: { value: "", message: "", isValid: false },
    passwordConfirm: { value: "", message: "", isValid: false },
    isFormValid: false,
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isInvalid, setisInvalid] = useState(false);
    const { setAuth } = useAuth();
    const { state, inputHandler, setCustomErrorMessage } = useFormState(defaultFormData);

    const formDataToJson = () => {
        return {
            username: state.username.value,
            displayname: state.displayName.value,
            email: state.email.value,
            phoneNumber: state.phoneNumber.value,
            zipcode: state.zipcode.value,
            dob: new Date(state.birthday.value).getTime(),
            password: state.password.value,
        };
    };
    const handleSubmitBtn = async (event) => {
        event.preventDefault();
        const isFormValid = await validateRegisterForm({ ...state });
        if (isFormValid) {
            await api
                .post("register", formDataToJson())
                .then((response) => {
                    if (response.status === 201) {
                        setAuth({ isLoggedIn: true });
                        setisInvalid(false);
                        navigate("/");
                    }
                })
                .catch((error) => {
                    if (error.response.status === 409)
                        setCustomErrorMessage("username", "Username is used. Use another one");
                    setisInvalid(true);
                });
        }
    };

    return (
        <div>
            <div className="my-2 flex justify-center">
                <div
                    className={classNames(
                        isInvalid ? "" : "invisible",
                        "w-5/6 items-center rounded-lg bg-red-100 px-2 py-1 text-xs text-red-700 md:w-3/4 md:text-sm"
                    )}
                    role="alert"
                >
                    <span className="px-1 font-medium">Alert!&nbsp;</span>
                    Inputs are invalid. Please check inputs again.
                </div>
            </div>
            <div className="mb-4 flex content-center items-center justify-center">
                <div className="block w-5/6 rounded-3xl bg-white p-6 shadow-xl drop-shadow-md md:w-3/4">
                    <div className="py-4 text-center text-lg font-bold shadow-none">Create a new account</div>
                    <form>
                        <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                            <FormInput
                                id="username"
                                label="Username"
                                inputType="text"
                                placeholder="Enter username"
                                value={state.username === undefined ? "" : state.username.value}
                                message={state.username === undefined ? "" : state.username.message}
                                isValid={state.username === undefined ? false : state.username.isValid}
                                handleOnChange={inputHandler}
                            />
                            <FormInput
                                id="displayName"
                                label="Display Name (Opitional)"
                                inputType="text"
                                placeholder="Enter display name"
                                value={state.displayName === undefined ? "" : state.displayName.value}
                                message={state.displayName === undefined ? "" : state.displayName.message}
                                isValid={state.displayName === undefined ? false : state.displayName.isValid}
                                handleOnChange={inputHandler}
                            />
                        </div>
                        <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                            <FormInput
                                id="email"
                                label="Email"
                                inputType="email"
                                placeholder="example@domain.com"
                                value={state.email === undefined ? "" : state.email.value}
                                message={state.email === undefined ? "" : state.email.message}
                                isValid={state.email === undefined ? false : state.email.isValid}
                                handleOnChange={inputHandler}
                            />
                            <FormInput
                                id="phoneNumber"
                                label="Phone Number"
                                inputType="tel"
                                placeholder="123-123-1234"
                                value={state.phoneNumber === undefined ? "" : state.phoneNumber.value}
                                message={state.phoneNumber === undefined ? "" : state.phoneNumber.message}
                                isValid={state.phoneNumber === undefined ? false : state.phoneNumber.isValid}
                                handleOnChange={inputHandler}
                            />
                        </div>
                        <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                            <FormInput
                                id="birthday"
                                label="Date of Birth"
                                inputType="date"
                                placeholder="MM/dd/yyyy"
                                value={state.birthday === undefined ? "" : state.birthday.value}
                                message={state.birthday === undefined ? "" : state.birthday.message}
                                isValid={state.birthday === undefined ? false : state.birthday.isValid}
                                handleOnChange={inputHandler}
                            />
                            <FormInput
                                id="zipcode"
                                label="Zip Code"
                                inputType="text"
                                placeholder="77030"
                                value={state.zipcode === undefined ? "" : state.zipcode.value}
                                message={state.zipcode === undefined ? "" : state.zipcode.message}
                                isValid={state.zipcode === undefined ? false : state.zipcode.isValid}
                                handleOnChange={inputHandler}
                            />
                        </div>
                        <div className="mb-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                            <FormInput
                                id="password"
                                label="Password"
                                inputType="password"
                                placeholder="Your password"
                                value={state.password === undefined ? "" : state.password.value}
                                message={state.password === undefined ? "" : state.password.message}
                                isValid={state.password === undefined ? false : state.password.isValid}
                                handleOnChange={inputHandler}
                            />
                            <FormInput
                                id="passwordConfirm"
                                label="Confirm your Password"
                                inputType="password"
                                placeholder="Your password"
                                value={state.passwordConfirm === undefined ? "" : state.passwordConfirm.value}
                                message={state.passwordConfirm === undefined ? "" : state.passwordConfirm.message}
                                isValid={state.passwordConfirm === undefined ? false : state.passwordConfirm.isValid}
                                handleOnChange={inputHandler}
                            />
                        </div>
                        <div className="flex justify-center">
                            <SubmitButton
                                buttonName={"Sign up"}
                                handleBtnClick={handleSubmitBtn}
                                data-tesid="submit-button"
                            />
                        </div>
                        <div className="mt-2 text-center text-sm text-gray-800 md:text-base">
                            Already have an account?&nbsp;&nbsp;&nbsp;
                            <LinkButton path="/sign-in" name="Sign in here" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
