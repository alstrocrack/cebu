const axios = require('axios');

const token = process.env.BEARER_TOKEN;
const endpointURL = 'https://api.twitter.com/2/tweets/counts/recent';

exports.handler = async (event) => {
	await axios({
		url: endpointURL,
		method: 'get',
		headers: {
			'User-Agent': 'v2RecentTweetCountsJS',
			'authorization': `Bearer ${token}`,
		},
		params: {
			query: event.queryStringParameters.name,
			granularity: event.queryStringParameters.term,
		},
	})
		.then((response) => {
			console.log(response);
			return {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': 'Content-Type',
					'Access-Control-Allow-Methods': 'OPTIONS,GET',
				},
				body: response,
			};
		})
		.catch((error) => {
			console.log(error);
			throw new Error(error);
		});
};
