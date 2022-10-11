import React, { useEffect, useState } from 'react'
import AvatarSubreddit from './AvatarSubreddit';
import TimeAgo from 'react-timeago'
import { LineWobble } from '@uiball/loaders'

import {
	ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleLeftIcon,
    BookmarkIcon,
    EllipsisHorizontalIcon,
    ShareIcon,
    GiftIcon,
	BellIcon,
    EyeSlashIcon,
    FlagIcon,
} from "@heroicons/react/24/outline";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { resolveValue, toast, ToastBar, Toaster } from 'react-hot-toast';
import { ApolloCache, NormalizedCacheObject, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/queries';
import { ADD_VOTE } from '../graphql/mutations';


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

    {/* It's getting the session data from the user. */}
    const { data:session } = useSession();

    {/* It's setting the vote state to a boolean. */}
    const [vote, setVote] = useState<boolean>()

    {/* It's getting the all votes related to post ID from the database. Uses GET_ALL_VOTES_BY_POST_ID query */}
    const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
		variables: {
			post_id: post?.id,
		},
	});

    {/* It's adding a vote to the database. using ADD_VOTE mutation.
        refetchQueries is used to refetch the data from the database after the mutation is done.
    */}
    const [addVote] = useMutation(ADD_VOTE, {
        refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
    })


    useEffect(() => {
        const votes: Vote[] = data?.getVotesByPostId;

        {/* It's checking if the user has already voted.
            If the user has already voted, it will set the vote state to the vote that the user has already voted. (upvote or downvote)
        */}
        const vote = votes?.find((vote) => vote?.username === session?.user?.name)?.upvote;

        setVote(vote);

    }, [data, session?.user?.name])

    

    {/* If isUpvote is true, it means the user has already upvoted.
        If isUpvote is false, it means the user has already downvoted.
        If isUpvote is null/undefined, it means the user has not voted yet.
    */}
    const upVote = async (isUpvote: boolean) => {
        if(!session){
            toast('You must be logged in to vote.', {icon: '❗',} );
            return;
        }

        /* It's checking if the user has already upvoted. If the user has already upvoted, and is trying to upvote again, it will return. */
        if (vote && isUpvote)
        {
            toast('You have already upvoted.', {icon: '⚠️',} );
            return
        } 
        /* It's checking if the user has already downvoted. If the user has already downvoted, and is trying to downvote again, it will return. */
        if (vote === false && !isUpvote)
        {
            toast('You have already downvoted.', {icon: '⚠️',} );
            return
        }
        console.log("voting...", isUpvote)

        await addVote({
            variables: {
                post_id: post?.id,
                username: session?.user?.name,
                upvote: isUpvote,
                },
        })
    }

    /**
     * It takes in an object, and returns a number: displayNumber (number of votes)
     * @param {any} data - any - this is the data that is returned from the query.
     * @returns The return value is the number of upvotes minus the number of downvotes.
     */
    const displayVotes = (data: any) => {
		const votes: Vote[] = data?.getVotesByPostId;
		const displayNumber = votes?.reduce(
			(total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
			0
		);
		{/* It's checking if the votes array is empty. If it is, it will return 0. */}
        if (votes?.length === 0) {
            return 0;
        }
		if (displayNumber === 0) {
			return votes[0]?.upvote ? 1 : -1;
		}
		return displayNumber;
	};



    {/* It's checking if the URL contains /post/ and if it does, it sets isPostPage to true. */}
    const { asPath } = useRouter();
	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: "";

	const URL = `${origin}${asPath}`;
	var isPostPage = false;
	if (URL.includes("/post/")) {
		isPostPage = true;
	}

    /* It's checking if the post is empty or null, if it is, it returns a loading animation. */
    if (!post) return (
        <div className="flex w-full items-center justify-center p-10 text-xl">
            <LineWobble 
                size={80}
                lineWeight={5}
                speed={1.50} 
                color="black" 
            />
        </div>
    )


    return (
            <div className="flex cursor-pointer border rounded-md border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 dark:bg-gradient-to-b dark:from-[#062925] dark:to-[#044A42] font-gilroy subpixel-antialiased backdrop-blur-sm dark:hover:border-[#3A9188] dark:border-[#062925]">
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
                <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400 dark:bg-[#062925] font-gilroy subpixel-antialiased">
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

                    <ArrowUpIcon onClick={() => upVote(true)} className={`voteButtons stroke-[4px] hover:text-red-400 dark:hover:text-[#3A9188] ${vote && 'text-red-400 dark:text-[#3A9188]'}`}/>

                    {/* if {displayVotes(data)} is less than zero, display red text, otherwise display green text */}
                    <p className={`text-black font-bold text-sm subpixel-antialiased ${displayVotes(data) < 0 ? 'dark:text-[#F05454]' : 'dark:text-[#B8E1DD]'} `}>{displayVotes(data)}</p>

                    <ArrowDownIcon onClick={() => upVote(false)} className={`voteButtons stroke-[4px] hover:text-red-400 dark:hover:text-[#F05454] ${vote === false && 'text-blue-400 dark:text-[#F05454]'}`}/>
                </div>

                <Link href={`/post/${post.id}`}>
                    {/* POST body on the right side*/}
                    
                    <div className="p-3 pb-1 dark:text-[#F1F2EB] font-gilroy subpixel-antialiased tracking-normal">
                        {/* Header*/}
                        <div className="flex items-center space-x-2 ">
                            <AvatarSubreddit seed={post.subreddit.topic}/>
                            <p className="text-xs text-gray-400 dark:text-[#B8E1DD] font-gilroy subpixel-antialiased">
                                <Link href={`/subreddit/${post.subreddit.topic}`}>
                                    <span className="font-semibold text-gray-700 hover:text-blue-400 hover:underline dark:text-[#B8E1DD] tracking-wide font-gilroy subpixel-antialiased">
                                    {"  "}
                                        m/{post.subreddit.topic}
                                    </span> 
                                </Link>
                                {"  "}
                                • Posted by u/{post.username} 
                                {"  "}
                                • <TimeAgo date={post.created_at} />
                                
                            </p>
                        </div>

                        {/* Body*/}
                        <div className="py-4 dark:text-[#F1F2EB]">
                            <h1 className="font-gilroy text-lg font-semibold subpixel-antialiased tracking-wide">
                                {post.title}
                            </h1>
                            <p className="font-gilroy mt-2 text-sm font-normal subpixel-antialiased tracking-wide">
                                {post.body}
                            </p>

                        </div>

                        {/* Image*/}
                        {/* if post.image is empty or null, don't render it*/}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {post.image.length>1 && <img className="w-full rounded-md" src={post.image} alt="post" />}
                        

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

                            {/* check the URL, if we are Post details, show more icons */}
                            {isPostPage && 
                                <div className="postButtons">
                                    <EyeSlashIcon className="h-6 w-6"/>
                                    <p className="hidden sm:inline">Hide</p>
                                </div>
                            }

                            {isPostPage && 
                                <div className="postButtons">
                                    <FlagIcon className="h-6 w-6"/>
                                    <p className="hidden sm:inline">Report</p>
                                </div>
                            }

                            <div className="postButtons">
                                <EllipsisHorizontalIcon className="h-6 w-6"/>
                            </div>

                        </div>
                    </div>
                </Link>

            </div>
    )
}

export default Post