import { isoCalculateTime } from '../../helpers/datetime';

const JourneyTransfer = ({ leg, nextLeg }) => {
	const currentLegDatetime = leg.arrival ? leg.arrival : leg.plannedArrival;
	const nextLegDatetime = nextLeg.departure ? nextLeg.departure : nextLeg.plannedDeparture;

	return (
		<>
			<div className="flex bg-gray-100 text-gray-500 text-base px-6">
				<div className="flex-none w-20 text-right">
					<div className="flex items-center justify-end h-full">
						<div>{isoCalculateTime(nextLegDatetime, currentLegDatetime)}</div>
					</div>
				</div>
				<div className="flex-none w-4 mx-4">
					<div className="flex flex-col items-center h-full">
						<div className="grow w-0.5 border-r-2 border-dotted border-gray-400"></div>
					</div>
				</div>
				<div className="grow mb-5 mt-5">Transfer</div>
			</div>

			<div className="flex px-6">
				<div className="flex-none w-20 text-right text-base"></div>
				<div className="flex-none w-4 mx-4">
					<div className="flex flex-col items-center h-full">
						<div className="grow w-0.5 border-r-2 border-dotted border-gray-400"></div>
					</div>
				</div>
				<div className="grow mb-3 mt-3"></div>
			</div>
		</>
	);
};

JourneyTransfer.defaultProps = {
	leg: {},
	nextLeg: {},
};

export default JourneyTransfer;
