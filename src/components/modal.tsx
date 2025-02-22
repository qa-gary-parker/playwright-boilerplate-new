import React from "react";
import Button from "./button"; // This dependency will be tracked

type ModalProps = {
    title: string;
    onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, onClose }) => {
    return (
        <div>
            <h2>{title}</h2>
            <Button label="Close" onClick={onClose} />
        </div>
    );
};

export default Modal;
