const DisabledInput = ({ id, label, inputType, placeholder, value }) => {
    return (
        <div className="w-full md:w-1/2">
            <label htmlFor={id} className="mb-2 inline-block text-gray-700">
                {label}
            </label>
            <input
                type={inputType}
                className="block w-full cursor-not-allowed rounded border border-solid bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-400 transition ease-in-out focus:bg-white focus:outline-none"
                id={id}
                placeholder={placeholder}
                value={value}
                data-testid={id}
                readOnly
            />
            <div className="invisible" role="alert">
                &nbsp;
            </div>
        </div>
    );
};

export default DisabledInput;
