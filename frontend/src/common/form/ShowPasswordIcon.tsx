import { Dispatch, FC, SetStateAction } from "react";
import { ReactComponent as HideEye } from "../../assets/raw/eye-hide.svg";
import { ReactComponent as ShowEye } from "../../assets/raw/eye-show.svg";

type ShowPasswordIconProps = {
  withIcon: boolean;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

const CLASS_NAME_NO_ICON =
  "absolute top-[26px] right-2 w-10 h-10 scale-75 hover:cursor-pointer";

const CLASS_NAME_ICON =
  "absolute top-[35px] right-3 w-10 h-10 scale-75 hover:cursor-pointer";

const ShowPasswordIcon: FC<ShowPasswordIconProps> = ({
  withIcon,
  showPassword,
  setShowPassword,
}) => {
  const getClassName = () => {
    return withIcon ? CLASS_NAME_ICON : CLASS_NAME_NO_ICON;
  };

  return (
    <>
      {showPassword ? (
        <ShowEye
          onClick={() => setShowPassword(false)}
          className={getClassName()}
        />
      ) : (
        <HideEye
          onClick={() => setShowPassword(true)}
          className={getClassName()}
        />
      )}
    </>
  );
};

export default ShowPasswordIcon;
