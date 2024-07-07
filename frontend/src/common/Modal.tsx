import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ModalProps = {
  children: ReactNode;
  show: boolean;
  className: string;
  actionButtonDesc: string;
  actionButtonClassName: string;
  onClickActionButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setShow: Dispatch<SetStateAction<boolean>> | ((show: boolean) => void);
};

const ANIMATE_IN = "animate-[slide-in_0.3s_ease-in-out_forwards]";
const ANIMATE_OUT = "animate-[slide-out_0.3s_ease-in-out_forwards]";

const Modal: FC<ModalProps> = ({
  children,
  className,
  show,
  actionButtonDesc,
  actionButtonClassName,
  onClickActionButton,
  setShow,
}) => {
  const [animation, setAnimation] = useState<string>(ANIMATE_IN);
  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();

    setAnimation(ANIMATE_OUT);
    setTimeout(() => {
      setAnimation(ANIMATE_IN);
      setShow(false);
    }, 300); // Delay setting state so animation can play
  };

  if (!show) {
    return null;
  }

  // TODO: Probably just remove the cancel and action button
  return (
    <div className="fixed bg-slate-900 bg-opacity-80 filter backdrop-blur-[1px] w-full h-full top-0 left-0 z-30">
      <div
        className={`fixed flex flex-col justify-center items-center z-10 left-1/2 top-1/3 rounded-lg shadow-3xl ${animation} ${className}`}
      >
        {children}

        <div className="flex flex-row justify-end w-full mt-auto">
          <button
            className="text-gray-500 mr-5 text-sm md:text-base"
            onClick={(e: React.MouseEvent) => handleCloseModal(e)}
          >
            Cancel
          </button>

          <button
            className={actionButtonClassName}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              onClickActionButton(e)
            }
          >
            {actionButtonDesc}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
