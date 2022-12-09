const JourneyItemSkeleton = () => {
	return (
		<div className="bg-white rounded shadow-sm mb-3">
			<div className=" border-l-4 border-indigo-600 animate-pulse">
				<div className="flex border-b border-gray-200">
					<div className="grow border-r border-gray-200 pt-6">
						<div className="flex pl-6">
							<div className="flex pb-4 grow">
								<div>
									<div className="h-4 bg-gray-200 rounded w-20"></div>
									<div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
								</div>
								<div>
									<div className="mx-5">
										<i className="fa-regular fa-arrow-right text-gray-400"></i>
									</div>
								</div>
								<div>
									<div className="h-4 bg-gray-200 rounded w-20"></div>
									<div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
								</div>
							</div>
							<div className="flex-none w-20 ml-6 mr-4">
								<div className="h-4 bg-gray-200 rounded w-20"></div>
								<div className="h-4 bg-gray-200 rounded w-20 mt-2"></div>
							</div>
						</div>
					</div>
					<div className="flex-none w-40 p-6">
						<div className="mb-px">
							<div className="h-4 bg-gray-200 rounded w-20"></div>
						</div>
						<div className="h-4 bg-gray-200 rounded mt-2"></div>
					</div>
				</div>
				<div className="py-1 border-b border-gray-200 text-center">
					<span className="h-2 bg-gray-200 rounded w-20 inline-block"></span>
				</div>
			</div>
		</div>
	);
};

export default JourneyItemSkeleton;
