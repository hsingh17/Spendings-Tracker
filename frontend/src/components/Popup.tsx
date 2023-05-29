import { FC, useEffect, useState } from "react";
import { PopupProps } from "../utils/types";
import ReactDOM from "react-dom";
import React from "react";

const Popup: FC<PopupProps> = ({ children, type, time }) => {
  const popupDiv = document.getElementById("popup");
  const [ open, setOpen ] = useState<boolean>(true);

  useEffect(() => {
    const timerId: number = setTimeout(() => setOpen(false), time);

    return () => clearTimeout(timerId);
  }, []);

  return popupDiv && open ? ReactDOM.createPortal(
    <>
      {children}
    </>,
    popupDiv
  ) 
  : null;
};

export default Popup;