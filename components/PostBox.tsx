import { useSession } from "next-auth/react";
import React from "react";
import Avatar from "./Avatar";
import { PhotoIcon, LinkIcon } from "@heroicons/react/24/solid";

function PostBox() {
	{
		/* useSession so we can use logged in user state*/
	}
	const { data: session } = useSession();
	return (
		<form className='sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2 '>
			<div className='flex items-center space-x-3 '>
				{/* User Avatar */}
				<Avatar />

				{/* Checking if the user is signed in. If they are, it will display "Create a Post" in the input box. 
                If they are not signed in, it will display "Sign In to create a post" in the input box. 
                And the input box will be disabled.
            */}
				<input
					disabled={!session}
					className='flex-1 bg-gray-50 p-2 pl-5 outline-none rounded-md '
					type='text'
					placeholder={
						session ? "Create a Post" : "Sign In to create a post"
					}
				/>

                <PhotoIcon className={`h-6 text-gray-300 cursor-pointer`}/>
                <LinkIcon className="h-6 text-gray-300"/>
			</div>
		</form>
	);
}

export default PostBox;
