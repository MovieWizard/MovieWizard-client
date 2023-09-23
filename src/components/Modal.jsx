import ReactModal from "react-modal";
import React from "react";


ReactModal.setAppElement("#root");

function Modal(props) {

  return (
    <>
      <ReactModal 
      isOpen={props.showModal} 
      onRequestClose={props.handleCloseModal}
    //   className="Modal"
    //   overlayClassName="Overlay"
      >
        {props.children}

        <hr />
        <div>


        <button onClick={props.handleCloseModal}>Cancel</button>
        </div>
      </ReactModal>
    </>
  );
}

export default Modal;
