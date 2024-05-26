import { FC } from "react";
import { FormError } from "../../../utils/types";
import GenericRequirement from "./GenericRequirement";

type PasswordRequirementsProps = {
  showPasswordReq: boolean;
  errs: FormError[];
};

const PasswordRequirements: FC<PasswordRequirementsProps> = ({
  showPasswordReq,
  errs,
}) => {
  if (!showPasswordReq) {
    return <></>;
  }

  return (
    <>
      {errs.map((err, idx: number) => {
        return (
          <GenericRequirement key={idx} msg={err.errMsg} isReqMet={err.valid} />
        );
      })}
    </>
  );
};

export default PasswordRequirements;
