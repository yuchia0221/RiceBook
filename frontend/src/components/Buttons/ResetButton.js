const ResetButton = ({ buttonName, handleBtnClick }) => {
    return (
        <button
            type="reset"
            data-testid="reset-button"
            className="inline-flex items-center rounded-lg py-2.5 px-4 text-center text-xs font-medium uppercase hover:bg-red-600 hover:text-white"
            onClick={handleBtnClick}
        >
            {buttonName}
        </button>
    );
};

export default ResetButton;
