import { isoCalculateTime, isoFormatDateTime } from '../../helpers/datetime';
import TransportIcon from '../../helpers/TransportIcon';

const JourneyFrom = ({ leg }) => {
	const stopName = leg.origin.name;
	const stopDepature = leg.departure ? leg.departure : leg.plannedDeparture;
	const stopDepaturePlatform = leg.departurePlatform ? 'PL ' + leg.departurePlatform : '--';
	const stopArrival = leg.arrival ? leg.arrival : leg.plannedArrival;

	const journeyDuration = isoCalculateTime(stopArrival, stopDepature);
	const journeyLineMode = leg.line ? leg.line.mode : '';
	const journeyLineName = leg.line ? leg.line.name : '';

	return (
		<div className="flex px-6">
			<div className="flex-none w-20 text-right font-bold text-xl">
				<div className="flex flex-col h-full">
					<div className="flex-none">{isoFormatDateTime(stopDepature)}</div>
					<div className="grow">
						<div className="flex items-center justify-end h-full">
							<div className="text-sm font-normal text-gray-500">{journeyDuration}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex-none w-4 mx-4">
				<div className="flex flex-col items-center h-full">
					<div className="flex-none w-7 h-7 rounded-full bg-indigo-600 text-white text-center pt-0.5">{<TransportIcon mode={journeyLineMode} />}</div>
					<div className="grow w-0.5 border-r-2 border-gray-600"></div>
				</div>
			</div>
			<div className="grow">
				<div className="font-bold text-xl">{stopName}</div>
				<div className="font-semibold text-indigo-600 text-sm mt-px mb-2">{journeyLineName}</div>
				<div className="mb-14">
					{leg.remarks &&
						leg.remarks.map((remark, index) => {
							return (
								<div key={index} className=" text-gray-600 text-sm mt-px mb-px">
									{remark.text}
								</div>
							);
						})}
				</div>
			</div>
			<div className="flex-none w-20 text-right">
				<span className="flex-none rounded bg-indigo-100 text-indigo-600 text-center p-2 text-sm font-bold">{stopDepaturePlatform}</span>
			</div>
		</div>
	);
};

JourneyFrom.defaultProps = {
	leg: [],
};

export default JourneyFrom;
