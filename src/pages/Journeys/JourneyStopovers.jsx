import { isoFormatDateTime } from '../../helpers/datetime';

const JourneyStopovers = ({ stopovers }) => {
	const removeStop = (array, n) => {
		return array.filter((elem, i) => i !== n);
	};

	/* Remove the first and last stops from the list, since it will be rendered seperately */
	const _stopoversArray = removeStop(stopovers, 0);
	const stopoversArray = removeStop(_stopoversArray, _stopoversArray.length - 1);

	const Stop = ({ stop }) => {
		const { name } = stop.stop;
		const departurePlatform = stop.departurePlatform ? 'PL ' + stop.departurePlatform : '--';
		const { arrival } = stop;
		return (
			<div className="flex px-6">
				<div className="flex-none w-20 text-right text-base -top-1 relative">{arrival ? isoFormatDateTime(arrival) : '--:--'}</div>
				<div className="flex-none w-4 mx-4">
					<div className="flex flex-col items-center h-full">
						<div className="flex-none w-3 h-3 rounded-full border-gray-600 border-2 bg-white"></div>
						<div className="grow w-0.5 border-r-2 border-gray-600"></div>
					</div>
				</div>
				<div className="grow mb-px">
					<div className="text-base -top-1 relative">{name}</div>
					<div className="text-sm text-gray-500 font-normal mt-1 max-w-md"></div>
				</div>
				<div className="flex-none w-20 text-right ">
					<span className="text-gray-400 px-2 font-normal text-sm -top-2 relative">{departurePlatform}</span>
				</div>
			</div>
		);
	};

	return (
		<>
			{stopoversArray.map((stop, index) => (
				<Stop key={index} stop={stop} />
			))}
		</>
	);
};
JourneyStopovers.defaultProps = {
	stopovers: [],
};

export default JourneyStopovers;
