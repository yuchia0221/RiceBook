const SubmitButton = ({ buttonName, handleBtnClick }) => {
    return (
        <button
            type="submit"
            data-testid="submit-button"
            className="inline-flex items-center rounded-lg py-2.5 px-5 text-center text-xs font-medium uppercase hover:bg-lightBlue hover:text-white"
            onClick={handleBtnClick}
        >
            {buttonName}
        </button>
    );
};

export default SubmitButton;
