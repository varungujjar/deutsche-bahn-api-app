import { isoFormatDateTime } from '../../helpers/datetime';

const JourneyTo = ({ leg, isTransfer }) => {
	const stopName = leg.destination.name;
	const stopArrival = leg.arrival ? leg.arrival : leg.plannedArrival;
	const stopArrivalPlatform = leg.arrivalPlatform ? 'PL ' + leg.arrivalPlatform : '--';
	return (
		<div className="flex px-6">
			<div className="flex-none w-20 text-right font-bold text-xl">{isoFormatDateTime(stopArrival)}</div>
			<div className="flex-none w-4 mx-4">
				<div className="flex flex-col items-center h-full">
					<div className="flex-none w-4 h-4 rounded-full border-indigo-600 border-2 bg-white"></div>
					<div className={`${isTransfer && 'border-r-2 border-dotted border-gray-400'} grow w-0.5 `}></div>
				</div>
			</div>
			<div className="grow mb-4">
				<div className="font-bold text-xl">{stopName}</div>
			</div>
			<div className="flex-none w-20 text-right">
				<span className="rounded bg-indigo-100 text-indigo-600 text-center p-2 text-sm font-bold">{stopArrivalPlatform}</span>
			</div>
		</div>
	);
};

JourneyTo.defaultProps = {
	leg: {},
	isTransfer: false,
};

export default JourneyTo;
