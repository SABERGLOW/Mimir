import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import React from 'react'
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import { ADD_COMMENT } from '../../graphql/mutations';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import Avatar from '../../components/Avatar';
import TimeAgo from 'react-timeago'

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
 * @see {@link https://nextjs.org/docs/routing/dynamic-routes}
 * @returns The PostPage component is being returned.
 */
function PostPage() {

    {/* A hook that gives us access to the router object. */}
    const router = useRouter();

    {/* Getting the session data from the next-auth/react hook. Allows us to use user's logged-in state*/}
    const { data:session } = useSession();

    {/* Using the useMutation hook to call the ADD_COMMENT mutation. refetchQueries will refetch the post and its details after inserting the comment */}
    const [insertCOMMENT] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_POST_BY_POST_ID, "getPOSTListByPostId"],
    });

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

/**
 * The onSubmit function is a function that is called when the user submits the form. It calls the insertCOMMENT mutation.
 * @param {FormData} data - The data that the user entered in the form.
 * @returns The onSubmit function is being returned.
 * @see {@link https://react-hook-form.com/api/useform/submitform}
 * @see {@link https://react-hook-form.com/api/useform/setvalue}
 * @see {@link https://react-hook-form.com/api/useform/register}
 */
    const onSubmit: SubmitHandler<FormData> = async (data) => {

        /* Creating a loading animation. */
        const notification = toast.loading("Posting your comment...");

        /* Calling the insertCOMMENT mutation and passing in the variables. */
        await insertCOMMENT({
            variables: {
                post_id: router.query.postId,
                username : session?.user?.name,
                text: data.comment,
            },
        });

        console.log(data.comment);

        /* Clearing the comment textarea after the user submits a comment. */
        setValue("comment", "");
        toast.dismiss(notification);
        toast.success("Comment posted!", {
            id: notification,
        });


        toast.custom(
            (t) => (
                <div
                    className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                    }
                    max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mx-5`}
                >
                    <div className='flex-1 w-0 p-4'>
                        <div className='flex items-start'>
                            <div className='flex-shrink-0 pt-0.5'>
                            <Avatar seed={session?.user?.name}/>
                            </div>
                            <div className='ml-3 flex-1'>
                                <p className='text-sm font-medium text-gray-900'>
                                    {session?.user?.name}
                                </p>
                                <p className='mt-1 text-sm text-gray-500'>
                                    {data.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex border-l border-gray-200'>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                            Close
                        </button>
                    </div>
                </div>
            ),
            {
                position: "bottom-right",
            }
        );
    }

    return (
        <div className="mx-auto my-7 max-w-5xl font-gilroy subpixel-antialiased">

            {/* Conditional Rendering; If the post data is not available, it will return a loading animation. */}

            {/* Post */}
            <Post post={post}/>

            {/* Check if the post has loaded */}
            {post && (
                //{/* Comment Section */}
                <>
                    {/* Comment Section */}
                    <div className="rounded-md border border-t-0 border-gray-300 bg-white p-5 pl-16 mt-2 hover:border hover:border-gray-600 dark:bg-gradient-to-b dark:from-[#062925] dark:to-[#044A42] font-gilroy subpixel-antialiased backdrop-blur-sm dark:hover:border-[#3A9188] dark:border-[#062925]">
                        <p className="text-sm dark:text-[#F1F2EB] font-gilroy tracking-wide pb-2">
                            Comment as <span className="font-semibold text-emerald-600 dark:text-[#3A9188]">{session?.user?.name}</span>
                        </p>

                        {/* Comment Text Area */}
                        {/* Disabled if the user is not logged in. */}
                        {/* Calling the handleSubmit function and passing in the onSubmit function that we defined earlier. */}
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-5xl space-y-2">
                            <textarea
                                {...register("comment", { required: true })}
                                disabled={!session}
                                className="h-24 rounded-md border bg-white border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50 dark:bg-[#044A42] dark:border-[#3A9188] dark:text-[#B8E1DD] font-gilroy subpixel-antialiased tracking-wide dark:hover:border-[#3A9188]"
                                placeholder={session ? "What are your thoughts?" : "Please sign in to comment"} />

                            <button
                                disabled={!session}
                                type="submit"
                                className="w-full bg-blue-400 text-white font-semibold disabled:bg-gray-200 dark:text-[#B8E1DD] dark:bg-[#062824]  dark:border-[#044A42] dark:shadow-lg drop-shadow-[0_5px_5px_rgba(184,225,221,0.05)] hover:drop-shadow-xl rounded-md p-2">
                                Comment
                            </button>
                        </form>
                    </div>

                    <div className="rounded-md border border-t-0 border-gray-300 bg-white mt-2  pt-5 pb-10 px-10 hover:border hover:border-gray-600 dark:bg-gradient-to-b dark:from-[#062925] dark:to-[#044A42] font-gilroy tracking-wide subpixel-antialiased backdrop-blur-sm dark:hover:border-[#3A9188] dark:border-[#062925]">
                        {post?.comments.map(comment => (
                                <div className="relative flex items-center space-x-2 space-y-5" key={comment.id}>
                                    <hr className="absolute top-10 left-7 h-14 border rounded-sm z-0 dark:border-[#B8E1DD]" />

                                    {/* User Avatar */}
                                    <div className="z-50 dark:text-[#B8E1DD]">
                                        <Avatar seed={comment.username} />
                                    </div>

                                    {/* Username + TimeAgo + Comment */}
                                    <div className="flex flex-col">
                                        <p className="py-2 text-xs text-gray-400 dark:text-[#B8E1DD]">
                                            <span className="font-semibold text-gray-600 dark:text-[#B8E1DD]">
                                                {comment.username}
                                            </span>
                                            {" "}
                                            • <TimeAgo date={comment.created_at} />
                                        </p>

                                        <p className="dark:text-[#F1F2EB]">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>

                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default PostPage