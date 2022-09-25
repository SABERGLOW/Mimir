import NextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit";

/* Add API route */
// https://next-auth.js.org/getting-started/introduction
// https://next-auth.js.org/configuration/routes
// This contains the dynamic route handler for NextAuth.js which will also contain all of our global NextAuth.js configurations.

/* Configuring the authentication providers. */
export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		RedditProvider({
			clientId: process.env.REDDIT_CLIENT_ID,
			clientSecret: process.env.REDDIT_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
};

/* Exporting the NextAuth function with the authOptions object as a parameter. */
export default NextAuth(authOptions);
