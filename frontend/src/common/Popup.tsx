import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PopupProps } from "../utils/types";

const Popup: FC<PopupProps> = ({ children, time }) => {
  const popupDiv = document.getElementById("popup");
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const timerId: number = setTimeout(() => setOpen(false), time);

    return () => clearTimeout(timerId);
  }, []);

  return popupDiv && open
    ? ReactDOM.createPortal(<>{children}</>, popupDiv)
    : null;
};

export default Popup;
