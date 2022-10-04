import React from 'react'
import AvatarSubreddit from './AvatarSubreddit';
import TimeAgo from 'react-timeago'

import {
	ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleLeftIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon,
    ShareIcon,
    GiftIcon,
	BellIcon,
} from "@heroicons/react/24/outline";


/**
 * Props is an object that has a property called post that is of type Post
 * @property {Post} post - Post
 */
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
            <p className="text-black font-bold text-xs subpixel-antialiased">0.0</p>
            <ArrowDownIcon className="voteButtons hover:text-red-400"/>
        </div>

        {/* POST body on the right side*/}
        
        <div className="p-3 pb-1">
            {/* Header*/}
            <div className="flex items-center space-x-2 ">
                <AvatarSubreddit seed={post.subreddit.topic}/>
                <p className="text-xs text-gray-400 subpixel-antialiased">
                    <span className="font-bold text-gray-700 hover:text-blue-400 hover:underline">m/{post.subreddit.topic}</span> • Posted by u/{post.username} • <TimeAgo date={post.created_at} />
                </p>
            </div>

            {/* Body*/}
            <div className="py-4 ">
                <h1 className="text-lg font-semibold subpixel-antialiased">
                    {post.title}
                </h1>
                <p className="mt-2 text-sm font-normal subpixel-antialiased">
                    {post.body}
                </p>

            </div>

            {/* Image*/}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full" src={post.image} alt="post image" />

            {/* Footer*/}
            <div className="flex space-x-4 text-gray-400 ">
                <div className="postButtons">
                    <ChatBubbleLeftIcon className="h-6 w-6"/>
                    <p className="">{post.comments.length} Comments</p>

                </div>

                <div className="postButtons">
                    <GiftIcon className="h-6 w-6"/>
                    <p className="hidden sm:inline">Award</p>

                </div>

                <div className="postButtons">
                    <ShareIcon className="h-6 w-6"/>
                    <p className="hidden sm:inline">Share</p>

                </div>

                <div className="postButtons">
                    <BookmarkIcon className="h-6 w-6"/>
                    <p className="hidden sm:inline">Save</p>

                </div>

                <div className="postButtons">
                    <EllipsisHorizontalIcon className="h-6 w-6"/>

                </div>

            </div>
        </div>
    </div>
    )
}

export default Post