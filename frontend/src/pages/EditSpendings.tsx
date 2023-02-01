import { useParams } from "react-router-dom";
import AddEditSpendings from "../components/AddEditSpendings";
import { EditSpendingsParams } from "../utils/types";

const EditSpendings = () => {
  const params = useParams<EditSpendingsParams>();
  return  (
    <AddEditSpendings isAdd={ false } spendingDate={ params.spendingDate as String } />
  )
};

export default EditSpendings;