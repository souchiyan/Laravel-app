import React from "react";

export default function Modal({ onClose, children }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <button className="float-right" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}
