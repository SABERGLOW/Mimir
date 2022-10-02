import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS } from '../graphql/queries'
import Post from './Post';

/**
 * Feed is a function that returns a list of posts using the Post component. It uses the useQuery hook to fetch the posts from the server.
 * The posts are mapped using conditional rendering.
 * @returns A React component
 */
function Feed() {

    /* Destructuring the data and error from the useQuery hook. */
    const { data, error } = useQuery(GET_ALL_POSTS);

    /* Destructuring the data from the useQuery hook and assigning it to the posts variable. */
    const posts:Post[] = data?.getPOSTList;

    return (
        /* Conditional Rendering; Mapping over the posts array and returning a Post component for each post. */
        <div>
            {posts?.map(post => (
                <Post 
                    key={post.id}
                    post={post}
                />    
            ))}
        </div>
    )
}

export default Feed