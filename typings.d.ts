{/*
    Path: typings.d.ts
    Language: typescript
    typings.d.ts is a special file that is used to declare global types and interfaces that are not specific to any particular file.
    It is used to declare types that are used in multiple files.
    It is also used to declare types that are not available in the npm package.
    For example, if you are using a library that is not available in the npm package, you can declare the types for that library in typings.d.ts.
    You can also declare types for global variables that are not available in the npm package.
*/}



type Comments = {
    created_at: string;
    id: number;
    post_id: number;
    username: string;
    text: string;
};

type Vote = {
    created_at: string;
    id: number;
    post_id: number;
    username: string;
    upvote: boolean;
};

type Subreddit = {
    created_at: string;
    id: number;
    topic: string;
};

type Post = {
    created_at: string;
    id: number;
    subreddit_id: number;
    username: string;
    title: string;
    body: string;
    image: string;
    comments: COMMENT[];
    votes: VOTE[];
    subreddit: SUBREDDIT;
};
