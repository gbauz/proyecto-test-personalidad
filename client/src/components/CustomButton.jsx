const CustomButton = ({ type = 'button', onClick, children, className = '' }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ${className}`}
      >
        {children}
      </button>
    )
  }
  
  export default CustomButton
  