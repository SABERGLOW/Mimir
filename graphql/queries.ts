import { gql } from "@apollo/client";

/* A GraphQL query which gets all posts. comments, subreddit, and votes related to that post will also be pulled in using Materializer */
export const GET_ALL_POSTS = gql`
    query MyQuery{
        getPOSTList{
            created_at
            id
            subreddit_id
            username
            title
            body
            image
            comments{	
                created_at
                id
                post_id
                username
                text
            }
            subreddit{
                created_at
                id
                topic
            }
            votes{
                created_at
                id
                post_id
                username
                upvote
            }
        }
    }
`;


/* A GraphQL query which gets subreddit list by topics */
export const GET_SUBREDDIT_LIST_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSUBREDDITListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`; 
