import { Dispatch, FC, SetStateAction } from "react";
import { REQ_PASSWORD_LENGTH } from "../../../utils/constants";

enum PasswordRequirement {
  LOWER_CASE_REQ,
  UPPER_CASE_REQ,
  LENGTH_REQ,
  SPECIAL_CHAR_REQ,
}

type PasswordRequirementsProps = {
  password: string;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

type GenericRequirementProps = {
  msg?: string;
  isReqMet?: boolean;
};

const PASSWORD_REQ_MSGS = new Map([
  [
    PasswordRequirement.LOWER_CASE_REQ,
    "Password must have a lowercase character",
  ],
  [
    PasswordRequirement.UPPER_CASE_REQ,
    "Password must have an uppercase character",
  ],
  [
    PasswordRequirement.LENGTH_REQ,
    `Password must be ${REQ_PASSWORD_LENGTH} characters long`,
  ],
  [
    PasswordRequirement.SPECIAL_CHAR_REQ,
    "Password must have a special character",
  ],
]);

const GenericRequirement: FC<GenericRequirementProps> = ({ msg, isReqMet }) => {
  if (!msg || !isReqMet) {
    return <></>;
  }

  return (
    <span>
      <span>{isReqMet}</span>
      <p>{msg}</p>
    </span>
  );
};

function validatePassword(req: PasswordRequirement, password: string): boolean {
  switch (req) {
    case PasswordRequirement.LOWER_CASE_REQ:
    case PasswordRequirement.UPPER_CASE_REQ:
    case PasswordRequirement.LENGTH_REQ:
    case PasswordRequirement.SPECIAL_CHAR_REQ:
    default:
      return password !== "";
  }
}
const PasswordRequirements: FC<PasswordRequirementsProps> = ({
  password,
  setIsValid,
}) => {
  const renderReqs = () => {
    const reqsMet = new Map([
      [
        PasswordRequirement.LOWER_CASE_REQ,
        validatePassword(PasswordRequirement.LOWER_CASE_REQ, password),
      ],
      [
        PasswordRequirement.UPPER_CASE_REQ,
        validatePassword(PasswordRequirement.UPPER_CASE_REQ, password),
      ],
      [
        PasswordRequirement.LENGTH_REQ,
        validatePassword(PasswordRequirement.LENGTH_REQ, password),
      ],
      [
        PasswordRequirement.SPECIAL_CHAR_REQ,
        validatePassword(PasswordRequirement.SPECIAL_CHAR_REQ, password),
      ],
    ]);

    const isValidPassword: boolean = Array.from(reqsMet.values()).reduce(
      (prev, cur) => prev && cur,
    );

    setIsValid(isValidPassword);

    return (
      <div>
        {Array.from(reqsMet.keys()).map((req: PasswordRequirement) => {
          return (
            <GenericRequirement
              isReqMet={reqsMet.get(req)}
              msg={PASSWORD_REQ_MSGS.get(req)}
            />
          );
        })}
      </div>
    );
  };

  return <>{renderReqs()}</>;
};

export default PasswordRequirements;
