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
	seed?: string | null;
	large?: boolean;
};

/**
 * This function renders an image with a source of either the seed or the user's name, or a
 * placeholder. The Avatar component is used in the Header and PostBox component.
 * The Avatar component is a functional component that uses the useSession hook to fetch data from the
 * NextAuth API. The Avatar component is being returned.
 * The Avatar is generated using DiceBear Avatars.
 * @see {@link https://avatars.dicebear.com/docs/http-api}
 * @param {Props} props - Props is an object with optional properties seed and large.
 * @returns The Avatar component is being returned.
 */
function Avatar({ seed, large }: Props) {
	{/* useSession so we can use logged in user state */}
	const { data: session } = useSession();

	return (
		/* Rendering an image. */
        <div
			className={`relative h-10 w-10 rounded-full border-gray-300 bg-slate-200 overflow-hidden dark:ring-4 dark:ring-[#044A42] dark:hover:ring-[#B8E1DD] dark:hover:shadow-lg ${large && "h-20 w-20"}`}
		>
			<Image
				layout='fill'
				/* Setting the source of the image to the seed or the user's name, or a placeholder */
                src={`https://avatars.dicebear.com/api/bottts/${seed||session?.user?.name}||placeholder.svg`}
				alt='avatar'
			/>
		</div>
	);
}

export default Avatar;
