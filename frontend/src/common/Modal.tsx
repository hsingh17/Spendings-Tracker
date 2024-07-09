import { Dispatch, FC, ReactNode, SetStateAction } from "react";

type ModalProps = {
  children: ReactNode;
  show: boolean;
  className: string;
  setShow: Dispatch<SetStateAction<boolean>> | ((show: boolean) => void);
};

// const ANIMATE_IN = "animate-[slide-in_0.3s_ease-in-out_forwards]";
// const ANIMATE_OUT = "animate-[slide-out_0.3s_ease-in-out_forwards]";

const Modal: FC<ModalProps> = ({ children, className, show /*setShow*/ }) => {
  // const [animation, setAnimation] = useState<string>(ANIMATE_IN);
  // const handleCloseModal = (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   setAnimation(ANIMATE_OUT);
  //   setTimeout(() => {
  //     setAnimation(ANIMATE_IN);
  //     setShow(false);
  //   }, 300); // Delay setting state so animation can play
  // };

  if (!show) {
    return null;
  }

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
