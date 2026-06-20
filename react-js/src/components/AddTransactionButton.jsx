const AddTransactionButton = ({ onClickOpen }) => {
  return (
    <div className="flex w-full justify-center  px-5">
      <div className="w-full flex max-w-300 mx-auto items-center my-3">
        <button
          id="open_form_modal_btn"
          onClick={onClickOpen}
          className="py-2 px-5 bg-blue-600 text-white cursor-pointer rounded-sm duration-500 hover:bg-blue-500"
        >
          Nova transação
        </button>
      </div>
    </div>
  );
};

export default AddTransactionButton;
