import React from 'react';

const ButtonComponent = ({ onSaveLocation }) => {
  return (
    <button
      onClick={onSaveLocation}
      style={{
        padding: "10px 70px",
        background: 'blue',
        color: 'white',
        border: 'none',
        marginTop: '30px',
        borderRadius: '10px',
        marginBottom: '50px'
      }}
    >
      Next
    </button>
  );
};

export default ButtonComponent;
