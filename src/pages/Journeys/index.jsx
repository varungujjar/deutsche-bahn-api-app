import { useEffect, useState } from 'react';
import CONFIG from '../../config';
import serviceApi from '../../service/axios';
import SearchBar from '../../components/layout/SearchBar';
import Message from '../../components/layout/Messages';
import JourneyItem from './JourneyItem';
import JourneyItemSkeleton from './JourneyItemSkeleton';

const Journeys = () => {
	const [response, setResponse] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState();

	const onSubmitQueryHandler = (searchQuery) => {
		// console.log(searchQuery);
		setResponse();
		setIsLoading(true);
		setErrorMessage();
		const fetchJourneys = async () => {
			await serviceApi
				.get(CONFIG.journeysApi.url, {
					params: {
						...searchQuery,
						from: searchQuery.from.type === 'location' ? searchQuery.from.id : searchQuery.from.location.id,
						to: searchQuery.to.type === 'location' ? searchQuery.to.id : searchQuery.to.location.id,
					},
				})
				.then((response) => {
					setIsLoading(false);
					setResponse(response.data);
					// console.log(response.data);
				})
				.catch((error) => {
					setIsLoading(false);
					setErrorMessage(error.toJSON().message);
					console.log(error.toJSON());
				});
		};
		fetchJourneys();
	};

	useEffect(() => {}, [isLoading, errorMessage]);

	return (
		<div className="container m-auto mt-4 mb-4 w-12/12 lg:w-9/12 xl:w-7/12 rounded shadow-xl bg-white">
			<div className="p-6 border-b border-gray-200 shadow-sm relative z-10">
				<SearchBar isLoading={isLoading} onSubmitQuery={onSubmitQueryHandler} />
				<div className="mt-2">{errorMessage && <Message message={errorMessage} onClose={() => setErrorMessage()} />}</div>
			</div>

			<div className="p-6 bg-slate-300 rounded-bl rounded-br">
				{isLoading && (
					<div data-testid="journeys-loading">
						<JourneyItemSkeleton />
						<JourneyItemSkeleton />
						<JourneyItemSkeleton />
						<JourneyItemSkeleton />
					</div>
				)}
				{response && (
					<div data-testid="journeys-results">
						{response.journeys.map((journey, index) => (
							<JourneyItem key={index} journey={journey} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Journeys;
