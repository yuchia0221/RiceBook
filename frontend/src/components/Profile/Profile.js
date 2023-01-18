import { useEffect, useState } from "react";
import api, { apiImage } from "../../apis/api";
import useFormState from "../../hooks/useFormReducer";
import { validateProfileForm } from "../../services/formValidator";
import GoogleLinkButton from "../Buttons/GoogleLinkButton";
import ResetButton from "../Buttons/ResetButton";
import SubmitButton from "../Buttons/SubmitButton";
import DisabledInput from "../Input/DisabledInput";
import FormInput from "../Input/FormInput";

const defaultFormData = {
    username: { value: "", message: "", isValid: false },
    displayName: { value: "", message: "", isValid: false },
    email: { value: "", message: "", isValid: false },
    phoneNumber: { value: "", message: "", isValid: false },
    birthday: { value: "", message: "", isValid: false },
    zipcode: { value: "", message: "", isValid: false },
    password: { value: "", message: "Please enter your password", isValid: false, disabled: false },
    passwordConfirm: { value: "", message: "Please enter your password", isValid: false, disabled: false },
    isFormValid: false,
};
const generateFormState = async () => {
    const { username, displayname, email, phoneNumber, zipcode, dob, isOAuth, avatar, accountLinkWithGoogle } = (
        await api.get("profile")
    ).data;
    let formState = { ...defaultFormData };
    formState.username.value = username;
    formState.displayName.value = displayname || "";
    formState.email.value = email;
    formState.phoneNumber.value = phoneNumber || "";
    formState.zipcode.value = zipcode || "";
    if (dob) formState.birthday.value = new Date(parseInt(dob)).toISOString().split("T")[0];
    if (isOAuth) {
        formState.password.disabled = true;
        formState.passwordConfirm.disabled = true;
    } else {
        formState.password.value = "";
        formState.passwordConfirm.value = "";
    }
    return { formState, avatar, isOAuth, accountLinkWithGoogle };
};

const Profile = () => {
    const [image, setImage] = useState(null);
    const [isInvalid, setIsInvalid] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { state, inputHandler, setFormData } = useFormState();
    const [avatar, setAvatar] = useState("/images/default-avatar.png");
    const [isOAuth, setIsOAuth] = useState(false);
    const [accountLinkWithGoogle, setAccountLinkWithGoogle] = useState(false);

    const handleInitialization = async () => {
        const { formState, avatar, isOAuth, accountLinkWithGoogle } = await generateFormState();
        if (avatar) setAvatar(avatar);
        setFormData(formState);
        setIsOAuth(isOAuth);
        setAccountLinkWithGoogle(accountLinkWithGoogle);
    };
    const hanldeFileSelect = (event) => {
        setImage(event.target.files[0]);
    };
    const handleSubmitBtn = async (event) => {
        event.preventDefault();
        if (!validateProfileForm({ ...state })) {
            setHasSubmitted(true);
            setIsInvalid(true);
        } else {
            setHasSubmitted(true);
            if (image) {
                const formData = new FormData();
                formData.append("image", image);
                apiImage.put("avatar", formData).then((response) => {
                    if (response.data?.avatar) setAvatar(response.data.avatar);
                });
            }
            const status = (await api.put("profile", formDataToJson())).status;
            if (status === 200) setIsInvalid(false);
        }
    };
    const handleResetBtn = async (event) => {
        event.preventDefault();
        const formState = await generateFormState();
        setFormData(formState);
        setIsInvalid(false);
        setHasSubmitted(false);
    };
    const formDataToJson = () => {
        const data = {
            displayname: state.displayName.value,
            email: state.email.value,
            phoneNumber: state.phoneNumber.value,
            zipcode: state.zipcode.value,
        };
        if (!state.password.disabled) data.password = state.password.value;
        return data;
    };
    const generateMessage = () => {
        if (!isInvalid && !hasSubmitted) {
            return <div className="invisible w-full py-2 px-4 text-sm">Blank</div>;
        } else if (!isInvalid && hasSubmitted) {
            return (
                <div
                    className="w-full items-center rounded-lg bg-green-100 py-2 px-4 text-sm text-green-700"
                    role="alert"
                    data-testid="success-message"
                >
                    You have successfully updated your profile
                </div>
            );
        } else {
            return (
                <div
                    className="w-full items-center rounded-lg bg-red-100 py-2 px-4 text-sm text-red-700"
                    role="alert"
                    data-testid="error-message"
                >
                    Inputs are invalid. Please check inputs again.
                </div>
            );
        }
    };

    useEffect(() => {
        handleInitialization();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="mb-8">
            <div className="mx-auto my-2 flex w-5/6 max-w-4xl rounded-3xl">{generateMessage()}</div>
            <form className="mx-auto w-5/6 max-w-4xl space-y-6 rounded-3xl bg-white p-6 shadow-xl drop-shadow-md">
                <div className="mb-6 flex flex-col justify-between space-y-4 md:mb-0 md:flex-row md:space-y-0">
                    <div>
                        <div className="text-xl font-bold text-gray-600 md:text-2xl">Edit Profile</div>
                        <div className="text-sm text-gray-400 md:text-base">
                            Changes you make will be visible to other users
                        </div>
                    </div>
                    <div className="flex">
                        <label htmlFor="file" className="flex w-full">
                            <div className="relative inline-flex hover:opacity-50">
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    className="h-16 w-16 cursor-pointer rounded-full"
                                    title="your avatar"
                                />
                                <span className="absolute bottom-0.5 right-0.5 h-5 w-5 cursor-pointer">
                                    <img src="images/edit.png" alt="edit" />
                                </span>
                            </div>
                        </label>
                        <div className="hidden">
                            <input
                                className="cursor-pointer rounded-br-md rounded-bl-sm rounded-tl-sm rounded-tr-md border bg-gray-50 text-sm"
                                id="file"
                                type="file"
                                accept="image/*"
                                onChange={hanldeFileSelect}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <DisabledInput
                        id="username"
                        label="Username"
                        inputType="text"
                        placeholder="Enter username"
                        value={state.username === undefined ? "" : state.username.value}
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
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
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
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <DisabledInput
                        id="birthday"
                        label="Date of Birth"
                        inputType="date"
                        placeholder="MM/dd/yyyy"
                        value={state.birthday === undefined ? "" : state.birthday.value}
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

                {state.password?.disabled ? (
                    <></>
                ) : (
                    <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
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
                )}
                {isOAuth ? (
                    <div className="flex flex-row place-items-center justify-center md:justify-end md:space-x-2">
                        <ResetButton buttonName={"Reset"} handleBtnClick={handleResetBtn} data-testid="reset-button" />
                        <SubmitButton
                            buttonName={"Update"}
                            handleBtnClick={handleSubmitBtn}
                            data-testid="submit-button"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col place-items-center md:flex-row md:justify-between md:space-x-2">
                        <GoogleLinkButton accountLinkWithGoogle={accountLinkWithGoogle} />
                        <div className="flex flex-row">
                            <ResetButton
                                buttonName={"Reset"}
                                handleBtnClick={handleResetBtn}
                                data-testid="reset-button"
                            />
                            <SubmitButton
                                buttonName={"Update"}
                                handleBtnClick={handleSubmitBtn}
                                data-testid="submit-button"
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;
