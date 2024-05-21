import { FC } from "react";
import CheckmarkIcon from "../../../assets/components/CheckmarkIcon";
import FailIcon from "../../../assets/components/FailIcon";
import HorizontalDotsIcon from "../../../assets/components/HorizontalDots";

type GenericRequirementProps = {
  msg?: string;
  isReqMet?: boolean;
};

const GenericRequirement: FC<GenericRequirementProps> = ({ msg, isReqMet }) => {
  // https://stackoverflow.com/a/75565360
  // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  const getColorStyle = (isFill: boolean) => {
    if (isReqMet === null || isReqMet === undefined) {
      return isFill ? "fill-gray-600" : "text-gray-600";
    }

    return isReqMet
      ? isFill
        ? "fill-green-600"
        : "text-green-600"
      : isFill
        ? "fill-red-600"
        : "text-red-600";
  };

  const renderIcon = () => {
    const className = `w-5 h-5 ${getColorStyle(true)}`;

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
      <p className={`ml-2 ${getColorStyle(false)}`}>{msg}</p>
    </div>
  );
};

export default GenericRequirement;
