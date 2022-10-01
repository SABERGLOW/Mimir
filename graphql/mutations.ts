import { gql } from "@apollo/client";

{/* A GraphQL mutation is being called that will Inset a Post in the Supabase DB */}
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
            title
            body
            image
            subreddit_id
            username
        }
    }
`

/* A GraphQL mutation that will insert a Subreddit in the Supabase DB. */
export const ADD_SUBREDDIT = gql`
    mutation MyMutation($topic: String!)
    {
        insertSUBREDDIT(topic: $topic){
            id
            topic
            created_at
        }
    }
`
