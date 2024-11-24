import useDeleteAccount from "../../../hooks/useDeleteAccount";
import useWarningModal from "../../../hooks/useWarningModal";

const DeleteAccount = () => {
  const { mutate: deleteAccount } = useDeleteAccount();
  const { modal, setModalState } = useWarningModal(
    "Delete Account",
    "Are you sure you want to delete your account?",
    "Delete Account",
    "This action is not recoverable!",
    deleteAccount
  );

  return (
    <>
      <button
        onClick={() => setModalState({ show: true })}
        className="mt-3 w-fit p-2 border-2 border-red-500 rounded-2xl  text-red-500 font-semibold hover:bg-red-500 hover:text-white"
      >
        Delete Account
      </button>
      {modal}
    </>
  );
};

export default DeleteAccount;
