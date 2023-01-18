const validateData = (id, value, previousState) => {
    switch (id) {
        case "username":
            return validateUsername(value);
        case "displayName":
            return validateDisplayName(value);
        case "email":
            return validateEmail(value);
        case "phoneNumber":
            return validatePhoneNumber(value);
        case "birthday":
            return validateBirthday(value);
        case "zipcode":
            return validateZipcode(value);
        case "password":
            return validatePassword(value, previousState);
        case "passwordConfirm":
            return validatePasswordConfirm(value, previousState);
        default:
            break;
    }
};
const validateUsername = (value) => {
    if (value.length === 0) {
        return "Length of username must be at least 1";
    } else if (!/^[A-Za-z]/.test(value)) {
        return "Username must start with letters";
    } else if (!/^[A-Za-z0-9]+$/.test(value)) {
        return "Input must be letters or numbers";
    } else return "";
};
const validateDisplayName = (value) => {
    if (value.length !== 0 && !/^[A-Za-z0-9 ._-]+$/.test(value)) {
        return "Display Name should not contain special characters (!+-?-)";
    } else return "";
};
const validateEmail = (value) => {
    if (!/^[A-Za-z0-9][A-Za-z0-9_.]*@[A-Za-z0-9]+.[A-Za-z0-9]+$/.test(value)) {
        return "Email must be in this format example@domain.com";
    } else return "";
};
const validatePhoneNumber = (value) => {
    if (value.length > 12) {
        return "Phone Number should not be longer than 12";
    } else if (!/^[1-9]{1}[0-9]{2}-[0-9]{3}-[0-9]{4}/.test(value)) {
        return "Phone Number be like this format: 123-123-1234";
    } else return "";
};
const validateBirthday = (value) => {
    const isOlderThan18 = (value) => {
        const birthdate = new Date(value);
        const time_diff = new Date(new Date().getTime() - birthdate.getTime());
        const age_diff = Math.abs(time_diff.getUTCFullYear() - 1970);
        return age_diff >= 18 ? true : false;
    };
    if (!isOlderThan18(value)) {
        return "You have to be at least 18 years old to sign up";
    } else return "";
};
const validateZipcode = (value) => {
    if (!/^[1-9]{1}[0-9]{4}$/.test(value)) {
        return "Zipcode must be like this format: 77005";
    } else return "";
};
const validatePassword = (value, state) => {
    if (state.password.disabled) return "";
    else if ((state.password.disabled === false || state.password.disabled === undefined) && value.length < 8)
        return "Password length should be eqaul to or more than 8";
    else if (state.passwordConfirm.value.length >= 8 && value !== state.passwordConfirm.value)
        return "Password does not match";
    else return "";
};
const validatePasswordConfirm = (value, state) => {
    if (
        (state.passwordConfirm.disabled === false || state.passwordConfirm.disabled === undefined) &&
        state.password.value !== value
    ) {
        return "Password does not match";
    } else return "";
};
export const validateRegisterForm = (state) => {
    const isFormValid =
        validateUsername(state.username.value) === "" &&
        validateDisplayName(state.displayName.value) === "" &&
        validateEmail(state.email.value) === "" &&
        validatePhoneNumber(state.phoneNumber.value) === "" &&
        validateBirthday(state.birthday.value) === "" &&
        validateZipcode(state.zipcode.value) === "" &&
        validatePassword(state.password.value, state) === "" &&
        validatePasswordConfirm(state.passwordConfirm.value, state) === "";
    return isFormValid;
};
export const validateProfileForm = (state) => {
    const isFormValid =
        validateDisplayName(state.displayName.value) === "" &&
        validateEmail(state.email.value) === "" &&
        validatePhoneNumber(state.phoneNumber.value) === "" &&
        validateZipcode(state.zipcode.value) === "" &&
        validatePassword(state.password.value, state) === "" &&
        validatePasswordConfirm(state.passwordConfirm.value, state) === "";
    return isFormValid;
};

export default validateData;
