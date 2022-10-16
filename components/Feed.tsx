import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './Post';
import { LineWobble } from '@uiball/loaders'

/**
 * Props is an object that has a property called topic that is a string.
 * @property {string} topic - string
 */
type Props = {
    topic?: string
}


/**
 * Feed is a function that returns a list of posts using the Post component. It uses the useQuery hook to fetch the posts from the server.
 * The posts are mapped using conditional rendering.
 * @see {@link https://uiball.com/loaders/}
 * @see {@link https://www.apollographql.com/docs/react/data/queries/}
 * @returns A React component
 */
function Feed( {topic} : Props) {

    /* Destructuring the data and error from the useQuery hook. */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = !topic ? useQuery(GET_ALL_POSTS) : useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: { topic: topic },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: 'cache-first',
    })

    /* Destructuring the data from the useQuery hook and assigning it to the posts variable. */
    const posts: Post[] = !topic ? data?.getPOSTList : data?.getPOSTListByTopic;

    /* A conditional rendering. If the posts array is empty, it will return the div with the loading animation and some text. */
    if(!posts) return (
        <div className="flex flex-col w-full items-center justify-center p-10 text-xl subpixel-antialiased">
            <LineWobble
                size={475}
                lineWeight={7}
                speed={1.50}
                color="#B8E1DD"
            />
            <h1 className="font-semibold  m-5 dark:text-[#3A9188]">
                Waiting for Mímir to impart his divine knowledge...
            </h1>

            <LineWobble
                size={475}
                lineWeight={7}
                speed={1.50}
                color="#B8E1DD"

            />
        </div>
    )

    return (
        /* Conditional Rendering; Mapping over the posts array and returning a Post component for each post. */
        <div className="mt-5 space-y-4">
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