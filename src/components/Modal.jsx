import ReactModal from "react-modal";
import React from "react";

ReactModal.setAppElement("#root");

function Modal(props) {
  return (
    <div className="modal-container">
      <ReactModal
        isOpen={props.showModal}
        onRequestClose={props.handleCloseModal}
        className="modal"
      >
        {props.children}
        <div className="btn-filterpage-container">
          <button className="btn-form" onClick={props.handleCloseModal}>
            Cancel
          </button>
        </div>
        <br />
      </ReactModal>
    </div>
  );
}

export default Modal;
