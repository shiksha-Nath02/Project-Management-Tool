import React from 'react';

// Inline CSS styles
const loaderStyle = {
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: '20px auto'
};

const keyframesStyle = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Loader component
const Loader = () => {
    return (
        <>
            <style>{keyframesStyle}</style>
            <div style={loaderStyle}></div>
        </>
    );
};

export default Loader;
