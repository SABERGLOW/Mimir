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
		<div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
			<p>{index + 1}</p>

			<ChevronUpDownIcon className="h-4 w-4 flex-shrink-0 text-gray-400" />

			<AvatarSubreddit seed={`/subreddit/${topic}`} />

			<p className="flex-1 truncate">m/{topic}</p>

			<Link href={`/subreddit/${topic}`}>
				<div className="cursor-pointer rounded-full bg-gray-400 px-3 text-white hover:bg-blue-400">
					View
				</div>
			</Link>

		</div>
	);
}

export default TopCommunities;
