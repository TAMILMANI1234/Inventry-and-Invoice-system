import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 w-[400px] text-white px-4 py-2 rounded shadow-md">
      <p>{message}</p>
       
    </div>
  );
};

export default Toast;