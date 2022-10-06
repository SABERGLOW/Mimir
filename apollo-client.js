import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_STEPZEN_API_URL,
	headers: {
		Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
	},
	cache: new InMemoryCache(),
});

export default client;
