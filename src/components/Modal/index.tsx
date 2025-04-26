import React from "react";
import QrCode from "../../../public/qr_code.png";

interface ModalProps {
  showModal: boolean;
  handleClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ showModal, handleClose }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-xl text-gray-600"
        >
          &times;
        </button>
        <div className="flex flex-col justify-center items-center">
          <img src={QrCode} alt="QrCode" className="w-" />
          <p className="text-gray-600 mt-4">Leia o Qr Code para seguir com aplicativo</p>
          <button
            onClick={handleClose}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
