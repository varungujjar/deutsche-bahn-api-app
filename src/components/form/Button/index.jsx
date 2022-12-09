const Button = ({ children, type, onClick }) => {
	return (
		<button
			type={type}
			className="w-full h-14 py-4 rounded text-base font-bold bg-indigo-500 text-center text-white transition duration-300 focus:outline-none hover:bg-indigo-700 hover:text-white "
			onClick={onClick}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
	children: '',
	type: 'button',
};

export default Button;
