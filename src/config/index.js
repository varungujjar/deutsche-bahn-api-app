const CONFIG = {
	baseUrl: 'https://v5.db.transport.rest',

	/* Initialization query parameters based on the API documentation default values */
	/* https://v5.db.transport.rest/api.html#get-journeys */

	journeysApi: {
		url: '/journeys',
		params: {
			from: null,
			to: null,
			depature: new Date().toISOString(),
			arrival: null,
			scheduledDays: false,
			stopovers: true,
			results: 10,
			transferTime: 0,
			firstClass: false,
			bike: true,
			tickets: false,
			nationalExpress: true,
			national: true,
			regionalExp: true,
			regional: true,
			suburban: true,
			bus: true,
			ferry: true,
			subway: true,
			tram: true,
			taxi: true,
		},
	},

	/* Initialization query parameters based on the API documentation default values */
	/* https://v5.db.transport.rest/api.html#get-locations */

	locationApi: {
		url: '/locations',
		params: {
			query: null,
			fuzzy: true,
			results: 10,
			stops: true,
			addresses: true,
			poi: true,
			linesOfStops: false,
			language: 'en',
		},
	},

	currency: {
		EUR: '€',
		USD: '$',
	},
};

export default CONFIG;
