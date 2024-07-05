import React, { Dispatch, FC, SetStateAction } from "react";
import Modal from "../../../common/Modal";

type SaveSpendingsModalProps = {
  show: boolean;
  addNewRow: (e: React.MouseEvent) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const SaveSpendingsModal: FC<SaveSpendingsModalProps> = ({
  show,
  addNewRow,
  setShow,
}) => {
  return (
    <Modal
      show={show}
      actionButtonDesc="Add"
      className="bg-red-500"
      actionButtonClassName="bg-blue-500"
      setShow={setShow}
      onClickActionButton={addNewRow}
    >
      <p>hello</p>
    </Modal>
  );
};

export default SaveSpendingsModal;
4;
