import { gql } from "@apollo/client";

/* A GraphQL query which gets subreddit list by topics */
export const GET_SUBREDDIT_LIST_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`; 
