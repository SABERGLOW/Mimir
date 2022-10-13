import { useRouter } from "next/router";
import React from "react";
import AvatarSubreddit from "../../components/AvatarSubreddit";
import Feed from "../../components/Feed";
import FeedSSR from "../../components/FeedSSR";
import PostBox from "../../components/PostBox";

/**
 * It's a function that returns Subreddit component for specific topic.
 * @returns A React component.
 */
function Subreddit() {
	{/* It's destructuring the query property from the useRouter hook. */}
	const {
		query: { topic },
	} = useRouter();

	return (
		<div className={`h-24 bg-black p-8 dark:bg-[#062925]/95`}>
			<div className='-mx-8 mt-10 bg-white dark:bg-[#044A42]'>
				<div className='mx-auto flex max-w-5xl items-center space-x-4 pb-3'>
					<div className='-mt-5 '>
						<AvatarSubreddit seed={topic as string} large />
					</div>

					<div className='py-2 '>
						<h1 className='text-3xl font-semibold dark:text-[#B8E1DD] font-gilroy subpixel-antialiased'>
							Welcome to the {topic} submimir.
						</h1>
						<p className='text-sm text-gray-400 font-gilroy dark:text-[#B8E1DD] dark:hover:underline'>m/{topic}</p>
					</div>
				</div>
			</div>

            <div className="mx-auto max-w-5xl mt-5 pb-10">
                <PostBox subreddit={topic as string}/>
                <FeedSSR topic={topic as string}/>
            </div>

		</div>
	);
}

export default Subreddit;
