import React, { useEffect, useState } from "react";
import {sleep} from "../utils/sleep";

function ModalV2({ isOpen, onClose, children}) {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    
    useEffect (() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);


    const handleClose = async () => {
        if (onClose) {
            setIsModalOpen(false);
            await sleep(0.2);
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className={`modal-overlay ${isModalOpen ? "open" : ""}`}
                onClick={handleClose} />
            
            <div className={`modal-content ${isModalOpen? "open" : ""}`}>
                <div className="modal-close-button" onClick={handleClose}>
                    X
                </div>
                {children}    
            </div> 
        </>
    );
};

export { ModalV2 };