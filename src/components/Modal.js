import React from "react";

const Modal = (props) => {
  return (
    <div className="h-screen w-screen bg-black opacity-90 z-20 fixed flex justify-center items-center">
      <div className="bg-white mix-blend-difference"> 
      {props.children}</div>
    </div>
  );
};

export default Modal;
