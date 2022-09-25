import React from "react";

const Modal = (props) => {
  const { onCancel, onConfirm, title, question } = props;
  return (
    <div
      onClick={onCancel}
      style={{
        height: "100vh",
        width: "100vw",
        border: "solid 1px red",
        left: "0",
        top: "0",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8895",
      }}
    >
      <div className="modaldiv"
        style={{
         
          padding: "50px",
        }}
      >
        <h2 style={{color:"#90e2e5"}}>{title}</h2>
        <h5 className="text-center">{question}</h5>
        <div
          className="mt-5 mb-3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            <button onClick={onConfirm} className="btn btn-outline-success mx-2">
              CONFIRM
            </button>
          </div>
          <div>
            <button
              onClick={() => onCancel(false)}
              className="btn btn-outline-warning mx-2"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
