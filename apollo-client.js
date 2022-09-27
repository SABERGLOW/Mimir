import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://villazon.stepzen.net/api/mimir-stepzen/__graphql",
	headers: {
        uri: "https://villazon.stepzen.net/api/mimir-stepzen/__graphql",
		Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
	},
	cache: new InMemoryCache(),
});

export default client;
