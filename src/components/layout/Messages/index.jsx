const Message = ({ message, onClose }) => {
	return (
		message && (
			<div
				className="bg-red-100 transition duration-300  font-semibold text-red-500 text-sm px-3 py-2 hover:bg-red-200 cursor-pointer rounded"
				onClick={onClose}
			>
				{message}
			</div>
		)
	);
};

Message.defaultProps = {
	message: '',
};

export default Message;
