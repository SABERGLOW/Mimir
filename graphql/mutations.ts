import { gql } from "@apollo/client";

{/* A GraphQL mutation is being called. */}
export const ADD_POST = gql`
    mutation MyMutation(
        $title: String!
        $body: String!
        $image: String!
        $subreddit_id: ID!
        $username: String!
    ){
        insertPOST(
            title: $title
            body: $body
            image: $image
            subreddit_id: $subreddit_id
            username: $username
        ){
            id
            created-at
            title
            body
            image
            subreddit_id
            username
        }
    }
`