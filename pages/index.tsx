import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import TopCommunities from "../components/TopCommunities";
import { useQuery } from "@apollo/client";
import { GET_SUBREDDITS_WITH_LIMIT } from "../graphql/queries";

const Home: NextPage = () => {
	{
		/* Using the useQuery hook to query the GET_SUBREDDITS_WITH_LIMIT query and limiting the results to 9. */
	}
	const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
		variables: {
			limit: 9,
		},
	});

	{
		/* Subreddit[] array contains the list of subreddits.
      data?.getSUBREDDITListLimit is the data returned from the query.
  */
	}
	const subreddits: Subreddit[] = data?.getSUBREDDITListLimit;

	return (
		<div className='my-7 mx-auto max-w-5xl'>
			{/* my-7 = margin top and bottom 7
          mx-auto = margin left and right auto 
          max-w-5xl = max width 5xl, 64rem, 1024px 
      */}

			<Head>
				<title>Mimir</title>
				<meta
					name='An online knowledge hub'
					content='Developed with Next.js and Tailwind CSS'
				/>
				<link rel='icon' href='/favicon/favicon.ico' />
			</Head>

			{/* Post Box */}
			<PostBox />

			{/* Feed */}
			<div className='flex'>
				<Feed />

				{/* Top Communities */}
				<div className='sticky top-36 ml-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
					<p className='text-md mb-1 p-4 pb-3 font-bold'>
						Top Communities
					</p>

					<div>
						{/* Mapping over the subreddits array and returning a TopCommunities component for each subreddit. */}
            {/* List limited amount of SubMimirs */}
						{subreddits?.map((subreddit, index) => (
							<TopCommunities
								key={subreddit.id}
								index={index}
								topic={subreddit.topic}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
