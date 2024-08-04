import { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  className: string;
};

const Modal: FC<ModalProps> = ({ children, className }) => {
  return (
    <div className="fixed bg-slate-900 bg-opacity-80 filter backdrop-blur-[1px] w-full h-full top-0 left-0 z-30 flex flex-col md:justify-center md:items-center">
      <div
        className={`fixed flex flex-col justify-center items-center z-10 rounded-lg shadow-3xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
