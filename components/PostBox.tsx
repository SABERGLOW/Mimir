import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { PhotoIcon, LinkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";

type FormData = {
	postTitle: string;
	postBody: string;
	postImage: string;
	subreddit: string;
};

function PostBox() {
	{/* useSession so we can use logged in user state*/}
	const { data: session } = useSession();

	{/* useState for Image */}
	const [imageBoxOpen, setimageBoxOpen] = useState(false);

	/* useForm so we can use form state, Destructuring the useForm hook. */
	const { 
		register,
		handleSubmit,
		watch,
		formState: { errors } 
	} = useForm();

	{/* onSubmit function */}
	const onSubmit = handleSubmit( async (formData) => {
		console.log(formData);
	})

	return (
		<form 
			/* Calling the onSubmit function. */
			onSubmit={onSubmit}
			className='sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2 '>
			<div className='flex items-center space-x-3 '>
				{/* User Avatar */}
				<Avatar />

				{/* Checking if the user is signed in. If they are, it will display "Create a Post" in the input box. 
                If they are not signed in, it will display "Sign In to create a post" in the input box. 
                And the input box will be disabled.
            */}
				<input
					/* A spread operator. It is taking the register function and spreading it out. */
					{...register("postTitle", { required: true })}
					disabled={!session}
					className='flex-1 bg-gray-50 p-2 pl-5 outline-none rounded-md '
					type='text'
					placeholder={
						session ? "Create a Post" : "Sign In to create a post"
					}
				/>

                <PhotoIcon 
					onClick={() => setimageBoxOpen(!imageBoxOpen)}  
					className={`h-6 text-gray-300 cursor-pointer ${imageBoxOpen && 'text-blue-500'}`}
				/>

                <LinkIcon className="h-6 text-gray-300"/>
			</div>

			{/* Checking if the user has typed anything in the input box. If they have, it will display this section.
				If they have not, it will not display. */}
			{!!watch("postTitle") && (
				<div className="flex flex-col py-2 ">
					{/* Post Body */}
					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Body:</p>
						<input className="flex-1 m-2 bg-gray-50 p-2 outline-none" 
						{...register("postBody")} type="text" placeholder="Text (optional)" />
					</div>

					{/* Sub-Reddit */}
					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Subreddit:</p>
						<input className="flex-1 m-2 bg-gray-50 p-2 outline-none" 
						{...register("subreddit", { required: true })} type="text" placeholder="i.e. Next.js" />
					</div>

					{/* Image */}
					{/* Checking if the imageBoxOpen state is true. If it is, it will display the div. 
						If it is not, it will not display the div. 
					*/}
					{imageBoxOpen && (
						<div className="flex items-center px-2">
							<p className="min-w-[90px]">Image URL:</p>
							<input className="flex-1 m-2 bg-gray-50 p-2 outline-none" 
							{...register("postImage")} type="text" placeholder="Optional" />
						</div>
					)}

					{/* Erros */}
					{/* Checking if there are any errors. If there are, it will display the relevant div. 
						If there are not, it will not display the div. 
					*/}
					{Object.keys(errors).length > 0 && (
						<div className="space-y-2 p-2 text-red-500">
							{errors.postTitle?.type === "required" && (
								<p className=" text-xs">❗A Title for the post is required.</p>
							)}

							{errors.subreddit?.type === "required" && (
								<p className="text-xs">❗A Subreddit for the post is required.</p>
							)}
						</div>
					)}

					{/* Post Button */}
					{/* Checking if the user has typed anything in the Post Title input box. 
						If they have, it will display the submit post button. 
						If they have not, it will not display the button. 
					*/}
					{!!watch("postTitle") && (
						<button 
							type="submit"
							className="w-full rounded-full bg-blue-400 text-white ">
							Post
						</button>
					)}

				</div>
			)}
		</form>
	);
}

export default PostBox;
