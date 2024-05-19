import { Dispatch, FC, SetStateAction } from "react";
import CheckmarkIcon from "../../../assets/components/CheckmarkIcon";
import FailIcon from "../../../assets/components/FailIcon";
import HorizontalDotsIcon from "../../../assets/components/HorizontalDots";
import { REQ_PASSWORD_LENGTH } from "../../../utils/constants";

type PasswordValidator = {
  msg: string;
  validationFunc: (password: string) => boolean;
};

const PASSWORD_VALIDATORS: PasswordValidator[] = [
  {
    msg: "A lowercase character",
    validationFunc: (password): boolean => /[a-z]/.test(password),
  },
  {
    msg: "An uppercase character",
    validationFunc: (password): boolean => /[A-Z]/.test(password),
  },
  {
    msg: "A number",
    validationFunc: (password): boolean => /[0-9]/.test(password),
  },
  {
    msg: `${REQ_PASSWORD_LENGTH} characters long`,
    validationFunc: (password): boolean =>
      password.length >= REQ_PASSWORD_LENGTH,
  },
  {
    msg: "A special character",
    validationFunc: (password): boolean =>
      /[~`! @#$%^&*()_\-+={[}]|\\:;"'<,>.?]/.test(password),
  },
];

type GenericRequirementProps = {
  msg?: string;
  isReqMet?: boolean;
};

const GenericRequirement: FC<GenericRequirementProps> = ({ msg, isReqMet }) => {
  const getColorStyle = () => {
    if (isReqMet === null || isReqMet === undefined) {
      return "gray-600";
    }
    return isReqMet ? "green-600" : "red-600";
  };

  const renderIcon = () => {
    const className = `w-5 h-5 fill-${getColorStyle()}`;
    if (isReqMet === null || isReqMet === undefined) {
      return <HorizontalDotsIcon className={`${className} scale-125`} />;
    }

    return isReqMet ? (
      <CheckmarkIcon className={className} />
    ) : (
      <FailIcon className={className} />
    );
  };

  return (
    <div className="flex flex-row items-center">
      {renderIcon()}
      <p className={`ml-2 text-${getColorStyle()}`}>{msg}</p>
    </div>
  );
};

type PasswordRequirementsProps = {
  password: string;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

const PasswordRequirements: FC<PasswordRequirementsProps> = ({
  password,
  setIsValid,
}) => {
  const renderReqs = () => {
    let validationsPassed = 0;

    const ret = (
      <div>
        <p className="font-semibold">Password requirements:</p>
        {PASSWORD_VALIDATORS.map((validator, idx) => {
          let isReqMet = undefined;
          // Only run validation function is password is populated.
          // This is so that GenericRequirement component knows to show the
          // three horizontal dots when nothing has been input
          if (password) {
            isReqMet = validator.validationFunc(password);
          }

          validationsPassed += isReqMet ? 1 : 0;

          return (
            <GenericRequirement
              key={idx}
              msg={validator.msg}
              isReqMet={isReqMet}
            />
          );
        })}
      </div>
    );

    setIsValid(validationsPassed === PASSWORD_VALIDATORS.length);
    return ret;
  };

  return renderReqs();
};

export default PasswordRequirements;
