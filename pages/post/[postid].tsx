import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import React from 'react'
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from "react-hook-form";

/**
 * FormData is an object with a property called comment that is a string.
 * @property {string} comment - The comment that the user entered.
 */
type FormData = {
    comment: string;
}

/**
 * The PostPage function is a React component that uses the useRouter hook to get the postid from the
 * URL, then uses the useQuery hook to get the post data from the GraphQL API, then renders the Post
 * component with the post data.
 * The PostPage function allows the user to view a post in detail and comment on it.
 * @see https://nextjs.org/docs/routing/dynamic-routes
 * @returns The PostPage component is being returned.
 */
function PostPage() {

    {/* A hook that gives us access to the router object. */}
    const router = useRouter();

    {/* Getting the session data from the next-auth/react hook. Allows us to use user's logged-in state*/}
    const { data:session } = useSession();

    {/* Using the useQuery hook to get the post data from the GraphQL API. */}
    const { data } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: router.query.postId
        },
    })

    {/* A type assertion. It is telling TypeScript that the post variable is of type Post.
        data?.getPostByPostId is the data that we get from the useQuery hook.
        The data is of type any, so we have to tell TypeScript what type it is.
    */}
    const post : Post = data?.getPOSTListByPostId;

    {/* useForm so we can use form state, Destructuring the useForm hook. */}
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
    }

    return (
        <div className="mx-auto my-7 max-w-5xl ">

            {/* Conditional Rendering; If the post data is not available, it will return a loading animation. */}

            {/* Post */}
            <Post post={post}/>

            {/* Check if the post has loaded */}
            {post && (


                    //{/* Comment Section */}
                    <div className="rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16 mt-2 hover:border hover:border-gray-600">
                    <p className="text-sm">
                        Comment as <span className="text-emerald-600">{session?.user?.name}</span>
                    </p>

                    {/* Comment Text Area */}
                    {/* Disabled if the user is not logged in. */}
                    {/* Calling the handleSubmit function and passing in the onSubmit function that we defined earlier. */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-5xl space-y-2">
                        <textarea 
                            disabled={!session}
                            className="h-24 rounded-md border bg-white border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                            placeholder={session ? "What are your thoughts?" : "Please sign in to comment"}
                        />

                        <button type="submit" className="w-full rounded-full bg-blue-400 text-white font-semibold disabled:bg-gray-200"> 
                            Comment
                        </button>
                    </form>

                </div>

            )}
        </div>
    )
}

export default PostPage