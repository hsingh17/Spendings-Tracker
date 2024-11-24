import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { ModalState } from "../../hooks/useModal";
import { ModalActionButtonProps, ModalButtons } from "./ModalButtons";

export type ModalProps = ModalActionButtonProps & {
  show: boolean;
  className?: string;
  setModalState: Dispatch<SetStateAction<ModalState>>;
};

type ModalRenderProps = ModalProps & {
  children: ReactNode;
};

const Modal: FC<ModalRenderProps> = ({
  children,
  showModalButtons = true,
  actionButtonClassName,
  actionButtonText,
  className = "",
  show,
  setModalState,
  callbackFn,
}) => {
  if (!show) {
    return <></>;
  }

  return (
    <div className="fixed bg-slate-900 bg-opacity-80 filter backdrop-blur-[1px] w-full h-full top-0 left-0 z-30 flex flex-col md:justify-center md:items-center">
      <div
        className={`fixed flex flex-col justify-center items-center z-10 rounded-lg shadow-3xl ${className}`}
      >
        {children}

        <ModalButtons
          showModalButtons={showModalButtons}
          actionButtonClassName={actionButtonClassName}
          actionButtonText={actionButtonText}
          setModalState={setModalState}
          callbackFn={callbackFn}
        />
      </div>
    </div>
  );
};

export default Modal;
