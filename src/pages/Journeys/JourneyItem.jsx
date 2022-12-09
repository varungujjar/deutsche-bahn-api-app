import { useEffect, useState } from 'react';
import { isoCalculateTime, isoFormatDateTime } from '../../helpers/datetime';
import CONFIG from '../../config';
import JourneyFrom from './JourneyFrom';
import JourneyTo from './JourneyTo';
import JourneyStopovers from './JourneyStopovers';
import JourneyTransfer from './JourneyTransfer';

const JourneyItem = ({ journey }) => {
	const [toggleDetails, setToggleDetails] = useState(false);

	const startIndex = 0;
	const endIndex = journey.legs.length - 1;

	const originName = journey.legs[startIndex].origin.name;
	const originDepatureTime = journey.legs[startIndex].departure;
	const destinationName = journey.legs[endIndex].destination.name;
	const destinationArrivalTime = journey.legs[endIndex].arrival;

	const journeyDuration = isoCalculateTime(destinationArrivalTime, originDepatureTime);
	const journeyChanges = journey.legs.length === 1 ? '' : journey.legs.length + ' changes';
	const price = journey.price ? CONFIG.currency[journey.price.currency] + ' ' + journey.price.amount : null;

	useEffect(() => {}, []);

	return (
		<div className="bg-white rounded shadow-sm mb-3">
			<div className=" border-l-4 border-indigo-600">
				<div className="flex border-b border-gray-200">
					<div className="grow border-r border-gray-200 pt-6">
						<div className="flex pl-6">
							<div className="flex pb-4 grow">
								<div>
									<div className="font-bold text-xl">{isoFormatDateTime(originDepatureTime)}</div>
									<div className="text-base">{originName}</div>
								</div>
								<div>
									<div className="mx-5 w-4 h-4">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
											<path d="M264.6 70.63l176 168c4.75 4.531 7.438 10.81 7.438 17.38s-2.688 12.84-7.438 17.38l-176 168c-9.594 9.125-24.78 8.781-33.94-.8125c-9.156-9.5-8.812-24.75 .8125-33.94l132.7-126.6H24.01c-13.25 0-24.01-10.76-24.01-24.01s10.76-23.99 24.01-23.99h340.1l-132.7-126.6C221.8 96.23 221.5 80.98 230.6 71.45C239.8 61.85 254.1 61.51 264.6 70.63z" />
										</svg>
									</div>
								</div>
								<div>
									<div className="font-bold text-xl">{isoFormatDateTime(destinationArrivalTime)}</div>
									<div className="text-base">{destinationName}</div>
								</div>
							</div>
							<div className="flex-none w-20 ml-6 text-sm text-gray-500 font-normal">
								<div>{journeyDuration}</div>
								<div>{journeyChanges}</div>
							</div>
						</div>
					</div>
					<div className="flex-none w-40 p-6">
						<div className="text-base mb-px">Price</div>
						{price ? (
							<div className="text-xl font-bold text-indigo-600">{price}</div>
						) : (
							<div className="text-sm font-normal text-gray-400">Not Available</div>
						)}
					</div>
				</div>
				<div
					className="py-2 text-center text-sm border-b border-gray-200 font-medium cursor-pointer hover:bg-slate-200 bg-slate-100 transition duration-300"
					onClick={() => setToggleDetails(!toggleDetails)}
				>
					View Details
					<span className="inline-block w-3 h-3 ml-px">
						{toggleDetails ? (
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
								<path d="M23.5 294.5l152-143.1C180.1 146.2 186.1 144 192 144s11.88 2.188 16.5 6.562l152 143.1c9.625 9.125 10.03 24.31 .9375 33.93c-9.125 9.688-24.38 10.03-33.94 .9375l-135.5-128.4l-135.5 128.4c-9.562 9.094-24.75 8.75-33.94-.9375C13.47 318.9 13.87 303.7 23.5 294.5z" />
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
								<path d="M360.5 217.5l-152 143.1C203.9 365.8 197.9 368 192 368s-11.88-2.188-16.5-6.562L23.5 217.5C13.87 208.3 13.47 193.1 22.56 183.5C31.69 173.8 46.94 173.5 56.5 182.6L192 310.9l135.5-128.4c9.562-9.094 24.75-8.75 33.94 .9375C370.5 193.1 370.1 208.3 360.5 217.5z" />
							</svg>
						)}
					</span>
				</div>
			</div>

			<div className={`${toggleDetails ? 'block' : 'hidden'} pt-6 `}>
				{journey.legs.length &&
					journey.legs.map((leg, index) => {
						const nextLegIndex = index + 1;
						const isTransfer = index < journey.legs.length - 1;

						return (
							<div key={index}>
								<JourneyFrom leg={leg} />
								{leg.stopovers && <JourneyStopovers stopovers={leg.stopovers} />}
								<JourneyTo leg={leg} isTransfer={isTransfer} />
								{isTransfer && <JourneyTransfer leg={leg} nextLeg={journey.legs[nextLegIndex]} />}
							</div>
						);
					})}
			</div>
		</div>
	);
};

JourneyItem.defaultProps = {
	journey: [],
};

export default JourneyItem;
