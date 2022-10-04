import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react'
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';

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

    /* Using the useQuery hook to get the post data from the GraphQL API. */
    const { data } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: router.query.postid
        },
    })

    const post : Post = data?.getPOST;

    return (
        <div>
            <Post post={post}/>
        </div>
    )
}

export default PostPage