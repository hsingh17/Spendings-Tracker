import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import DateFormatter from "../utils/dates-formatter";
import { TableRowProps } from "../utils/types";
import { ReactComponent as EditIcon } from "../assets/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete-icon.svg";
import DeleteModal from "./DeleteModal";

const TableRow: FC<TableRowProps> = ({ spending, parentRefetch }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleEdit = () =>
    navigate(`${Constants.SAVE_SPENDINGS_PAGE}/${spending.date}`);

  const setShowModalWrapper = (show: boolean) => setShowModal(show);

  return (
    <tr className="border-b-2 leading-[3rem]">
      <td className="">{DateFormatter.formatDateUS(spending.date)}</td>

      <td className="text-center">
        <p className="text-right block">{spending.total}</p>
      </td>

      <td className="flex justify-center items-center mt-3">
        <button>
          <EditIcon
            className="h-7 w-fit mr-5"
            stroke={"#40A3E6"}
            onClick={() => handleEdit()}
          />
        </button>

        <button>
          <DeleteIcon
            className="h-7 w-fit"
            stroke={"red"}
            onClick={() => setShowModalWrapper(true)}
          />
        </button>
      </td>

      <DeleteModal
        show={showModal}
        parentRefetch={parentRefetch}
        spendingId={spending.spendingUserAggrId}
        parentSetShow={setShowModalWrapper}
      />
    </tr>
  );
};

export default TableRow;
