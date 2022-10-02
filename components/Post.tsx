import React from 'react'
import AvatarSubreddit from './AvatarSubreddit';

import {
	ArrowUpIcon,
    ArrowDownIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon,
    ShareIcon,
    GiftIcon,
	BellIcon,
} from "@heroicons/react/24/outline";


type Props = {
    post: Post
}

/**
 * Post is a function that takes in a post object and returns a div with the post's title and body.
 * @param {Props}  - Props
 * @returns A React component
 */
function Post({ post }: Props) {
    return (
    <div className="flex cursor-pointer border rounded-md border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        {/*
            flex : put the items in a row,
            cursor-pointer : change the cursor to a pointer when we hover over the post
            border : add a border
            rounded-md : round the corners
            border-gray-300 : color of the border
            bg-white : background color
            shadow-sm : add a shadow
            hover:border : add a border when we hover over the post
            hover:border-gray-600 : color of the border when we hover over the post
        */}


        {/* VOTE on the left side*/}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
            {/*
                flex : put the items in a row,
                flex-col : put the items in a column,
                items-center : center along the x axis,
                justify-start : start along the y axis,
                space-y-1 : vertical space of 1 between the elements,
                rounded-l-md : round the corners on the left side,
                bg-gray-50 : background color,
                p-4 : padding of 4,
                text-gray-400 : color of the text
            */}

            <ArrowUpIcon className="voteButtons hover:text-red-400"/>
            <p className="text-black font-bold text-xs">0.0</p>
            <ArrowDownIcon className="voteButtons hover:text-red-400"/>
        </div>

        {/* POST body on the right side*/}
        
        <div className="p-3 pb-1">
            {/* Header*/}
            <div>
                <AvatarSubreddit seed={post.subreddit.topic}/>
                <p>
                    <span>m/{post.subreddit.topic}</span>
                </p>
            </div>

            {/* Body*/}

            {/* Image*/} 
        </div>
    </div>
    )
}

export default Post