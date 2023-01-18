import { useCallback, useReducer } from "react";
import validateData from "../services/formValidator";

const formStateReducer = (state, action) => {
    switch (action.type) {
        case "INPUT":
            const errorMessage = validateData(action.id, action.payload, state);
            const isDisabled = state[action.id].disabled;
            return {
                ...state,
                [action.id]: {
                    value: action.payload,
                    message: errorMessage,
                    isValid: errorMessage === "",
                    disabled: isDisabled,
                },
            };
        case "SET_CUSTOM_ERROR":
            return {
                ...state,
                [action.id]: { value: state[action.id].value, message: action.message, isValid: false },
            };
        case "INITIALIZE":
            return { ...action.payload };
        default:
            break;
    }
};

const useFormState = (initialValue) => {
    const [state, dispatch] = useReducer(formStateReducer, { ...initialValue });
    const inputHandler = useCallback((id, payload) => {
        dispatch({ type: "INPUT", id: id, payload: payload });
    }, []);
    const setFormData = useCallback((payload) => {
        dispatch({ type: "INITIALIZE", payload: payload });
    }, []);
    const setCustomErrorMessage = useCallback((id, message) => {
        dispatch({ type: "SET_CUSTOM_ERROR", id: id, message: message });
    }, []);

    return { state, inputHandler, setFormData, setCustomErrorMessage };
};

export default useFormState;
