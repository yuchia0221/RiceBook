import { classNames } from "../../tools/tools";

const FormInput = ({ id, label, inputType, placeholder, value, message, isValid, handleOnChange }) => {
    return (
        <div className="w-full md:w-1/2">
            <label htmlFor={id} className="mb-2 inline-block text-gray-700">
                {label}
            </label>
            <input
                type={inputType}
                className={classNames(
                    !isValid && message?.length !== 0
                        ? "border-red-500 focus:border-red-500"
                        : isValid && value?.length !== 0
                        ? "border-green-500 focus:border-green-500"
                        : "border-gray-300 focus:border-lightBlue",
                    "block w-full rounded border border-solid bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:bg-white focus:text-gray-700 focus:outline-none"
                )}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(event) => handleOnChange(id, event.target.value)}
                data-testid={id}
                autoComplete="off"
                aria-autocomplete="none"
            />
            <div
                className={classNames(isValid || message?.length === 0 ? "invisible" : "", "text-sm text-red-600")}
                role="alert"
            >
                {message === "" ? "&nbsp;" : message}
            </div>
        </div>
    );
};

export default FormInput;
