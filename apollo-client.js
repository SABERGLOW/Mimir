import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
// 	uri: process.env.NEXT_PUBLIC_STEPZEN_API_URL,
// 	headers: {
// 		Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
// 	},
// 	cache: new InMemoryCache(),
// 	ssrMode: typeof window === "undefined",
// 	defaultOptions: {
// 		watchQuery: {
// 			nextFetchPolicy: 'cache-first',
// 		},
// 	},
// });


function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_STEPZEN_API_URL,
			headers: {
				Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
			},
		}),
		cache: new InMemoryCache(),
	});
}

export default createApolloClient;
