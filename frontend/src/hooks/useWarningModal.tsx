import WarningIcon from "../assets/components/WarningIcon";
import { CallbackFn } from "../common/modal/ModalButtons";
import { useModal, UseModalReturnType } from "./useModal";

export default function useWarningModal(
  title: string,
  description: string,
  actionButtonText: string,
  subDescription?: string,
  callbackFn?: CallbackFn,
  actionButtonClassName: string = "bg-red-500 text-white text-center font-semibold rounded py-1 px-2",
  className: string = "top-20 left-1/2 translate-x-[-50%] bg-theme-neutral w-11/12 md:w-2/3 lg:w-1/3 h-1/2 border-2 border-gray-300 p-3"
): UseModalReturnType {
  const { modal, setModalState } = useModal(
    <>
      <WarningIcon className="w-64 h-64 animate-pulse" />
      <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      <p className="text-sm md:text-base text-gray-500 text-center mt-3">
        {description}
      </p>
      <p className="text-sm md:text-base text-gray-500 break-words text-center mb-5 md:mb-3">
        {subDescription}
      </p>
    </>,
    actionButtonClassName,
    actionButtonText,
    className,
    callbackFn
  );

  return {
    modal: modal,
    setModalState: setModalState,
  };
}
