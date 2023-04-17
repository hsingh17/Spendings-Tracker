import { FC } from "react";
import { SpendingsFormInputProps } from "../utils/types";

const SpendingFormInput: FC<SpendingsFormInputProps> = ({ labelText, value, parentHandleChange }) =>{ 
  return (
    <>
      <label>{labelText}:</label>
      <input 
        type="text" 
        name={ labelText } 
        value={ value || "" } 
        onChange={ (e:React.ChangeEvent) => parentHandleChange(e, labelText) } />
    </>
  );
};

export default SpendingFormInput;