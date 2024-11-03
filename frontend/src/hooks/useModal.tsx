import { useState } from "react";
import Modal from "../common/modal/Modal";
import { CallbackFn } from "../common/modal/ModalButtons";
import { Nullable } from "../utils/types";

export type ModalState = {
  show: boolean;
  callbackFn?: Nullable<CallbackFn>;
};

export type UseModalReturnType = {
  modal: React.ReactNode;
  setModalState: (newState: ModalState) => void;
};

export function useModal(
  children: React.ReactNode,
  actionButtonClassName: string,
  actionButtonText: string,
  className: string = "",
  callbackFnArg?: CallbackFn
): UseModalReturnType {
  const [modalState, setModalState] = useState<ModalState>({
    show: false,
    callbackFn: callbackFnArg,
  });

  const modal = (
    <Modal
      className={className}
      actionButtonClassName={actionButtonClassName}
      actionButtonText={actionButtonText}
      show={modalState.show}
      setModalState={setModalState}
      callbackFn={modalState.callbackFn}
    >
      {children}
    </Modal>
  );

  const setModalStateWrapper = (newState: ModalState) => {
    // TODO: better way?
    setModalState({
      show: modalState.show || newState.show,
      callbackFn: modalState.callbackFn || newState.callbackFn,
    });
  };

  return {
    modal: modal,
    setModalState: setModalStateWrapper,
  };
}
