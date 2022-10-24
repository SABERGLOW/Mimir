import React from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import AvatarSubreddit from "./AvatarSubreddit";
import Link from "next/link";

/**
 * Props is an object with two properties: index and topic.
 * index is a number and topic is a string.
 * @property {number} index - number
 * @property {string} topic - string
 */
type Props = {
	index: number;
	topic: string;
};

function TopCommunities({ index, topic }: Props) {
	return (
		<div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b font-gilroy subpixel-antialiased dark:bg-[#044A42] dark:border-[#3A9188] backdrop-blur-sm">
			<p className="dark:text-[#B8E1DD]">{index + 1}</p>

			<ChevronUpDownIcon className="ChevronUpDownIcon h-4 w-4 flex-shrink-0 text-gray-400 dark:text-[#3A9188]" />

			<AvatarSubreddit seed={`/subreddit/${topic}`} />

			<p className="flex-1 truncate text-sm dark:text-[#B8E1DD]">m/{topic}</p>

			<Link href={`/subreddit/${topic}`}>
				<div className="viewButton cursor-pointer rounded-full bg-gray-400 px-3 text-white hover:bg-blue-400 dark:text-[#B8E1DD] dark:bg-[#062824] drop-shadow-[0_10px_10px_rgba(184,225,221,0.05)] hover:drop-shadow-xl dark:shadow-lg">
					View
				</div>
			</Link>

		</div>
	);
}

export default TopCommunities;
