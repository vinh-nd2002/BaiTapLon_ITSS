import React from "react";

const Modal = (props) => {
  return (
    <div className="h-screen w-screen bg-black opacity-30 z-50 fixed flex justify-center items-center">
      {props.children}
    </div>
  );
};

export default Modal;
