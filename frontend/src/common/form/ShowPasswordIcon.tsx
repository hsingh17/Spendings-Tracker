import { Dispatch, FC, SetStateAction } from "react";
import { ReactComponent as HideEye } from "../../assets/raw/eye-hide.svg";
import { ReactComponent as ShowEye } from "../../assets/raw/eye-show.svg";

type ShowPasswordIconProps = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

const CLASS_NAME =
  "absolute top-[26px] right-2 w-10 h-10 scale-75 hover:cursor-pointer";

const ShowPasswordIcon: FC<ShowPasswordIconProps> = ({
  showPassword,
  setShowPassword,
}) => {
  return (
    <>
      {showPassword ? (
        <ShowEye
          onClick={() => setShowPassword(false)}
          className={CLASS_NAME}
        />
      ) : (
        <HideEye onClick={() => setShowPassword(true)} className={CLASS_NAME} />
      )}
    </>
  );
};

export default ShowPasswordIcon;
