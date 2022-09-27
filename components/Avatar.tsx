import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

/**
 * Props is an object with optional properties seed and large.
 * @property {string} seed - A string that is used to generate the avatar.
 * @property {boolean} large - boolean - If true, the avatar will be rendered at 128x128. If false, it
 * will be rendered at 64x64.
 */
type Props = {
	seed?: string;
	large?: boolean;
};

/**
 * This function takes in a seed and a large boolean and returns a div with an image inside of it.
 * @param {Props}  - seed - the seed for the avatar
 * @returns A component that renders an image.
 */
function Avatar({ seed, large }: Props) {
	{/* useSession so we can use logged in user state */}
	const { data: session } = useSession();

	return (
		/* Rendering an image. */
        <div
			className={`relative h-10 w-10 rounded-full border-gray-300 bg-white overflow-hidden ${
				large && "h-2- w-20"
			}
            `}
		>
			<Image
				layout='fill'
				/* Setting the source of the image to the seed or the user's name, or a placeholder */
                src={`https://avatars.dicebear.com/api/bottts/${
					seed || session?.user?.name
				} || placeholder.svg`}
				alt='avatar'
			/>
		</div>
	);
}

export default Avatar;
