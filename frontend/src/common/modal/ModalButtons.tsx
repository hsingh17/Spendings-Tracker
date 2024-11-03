import React, { Dispatch, FC, SetStateAction } from "react";
import { ModalState } from "../../hooks/useModal";
import { Nullable } from "../../utils/types";

export type CallbackFn = {
  (): void;
};

export type ModalActionButtonProps = {
  actionButtonClassName: string;
  actionButtonText: string;
  callbackFn: Nullable<CallbackFn>;
};

type ModalButtonsProps = ModalActionButtonProps & {
  setModalState: Dispatch<SetStateAction<ModalState>>;
};

export const ModalButtons: FC<ModalButtonsProps> = ({
  actionButtonClassName,
  actionButtonText,
  callbackFn,
  setModalState,
}) => {
  const onCancelButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalState({
      show: false,
      callbackFn: null,
    });
  };

  const onActionButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    callbackFn?.();
    setModalState({
      show: false,
      callbackFn: null,
    });
  };

  return (
    <div className="flex flex-row justify-end w-full mt-auto">
      <button
        className="text-gray-500 mr-5 text-sm md:text-base"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          onCancelButtonClick(e)
        }
      >
        Cancel
      </button>

      <button
        className={actionButtonClassName}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          onActionButtonClick(e)
        }
      >
        {actionButtonText}
      </button>
    </div>
  );
};
