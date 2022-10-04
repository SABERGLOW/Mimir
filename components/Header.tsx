import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import {
	ChevronDownIcon,
	HomeIcon,
	MagnifyingGlassIcon,
	Bars3Icon,
} from "@heroicons/react/24/solid";

import {
	ArrowUpRightIcon,
	BellIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	PlusIcon,
	ChartBarSquareIcon,
	VideoCameraIcon,
	MegaphoneIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";

function Header() {
	/* A function that checks if the user is logged in or not. */
	const { data: session, status } = useSession();
	return (
		//... This is the Header component, it contains the navigation bar and the logo ...//
		<div className='sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm'>
			{" "}
			{/* sticky header, always stays on top even when we scroll down */}
			<div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
				{" "}
				{/* flex-shrink-0 makes sure our logo doesn't shrink when we set constraint to the header */}
				<Image
					objectFit='contain'
					src="/logo/LogoText.svg"
					layout='fill'
					alt='logo'
				/>
			</div>
			{/* Home Icon + Dropdown menu */}
			<div className='flex items-center mx-7 xl:min-w-[300px]'>
				{/* flex : put the items in a row,
					items-center : center along the y axis,
					mx-7 : a margin of 7 along x axis,
					xl:min-w-[300px] : on extra large screens, width of 300px for Home Component, uses JIT compiler of tailwind css
				*/}

				{/* Home Icon */}
				<HomeIcon className='h-5 w-5' />
				<p className='flex-1 ml-2 lg:inline hidden'>
					Home
					{/* flex-1 : allow our component to graw/shrink as needed
						ml-2 : add a margin of 2 along x axis
						lg:inline : show the text on large screens
						hidden : hide the text on small screens
					*/}
				</p>
				<ChevronDownIcon className='h-5 w-5' />
			</div>
			{/* Search Bar */}
			<form className='flex flex-1 items-center space-x-2 border border-gray-200 rounded bg-gray-100 px-3 py-1 '>
				{/* flex : put the items in a row,
					flex-1 : allow our component to graw/shrink as needed
					items-center : center along the y axis,
					space-x-2 : horizontal space of 2 between the elements
					border : add a border of width 1px
					border-gray-200 : color of the border
					rounded : round the corners, 4px
					bg-gray-100 : background color
					px-3 : padding of 3 along x axis
					py-1 : padding of 1 along y axis
				*/}

				<MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
				<input
					className=' flex-1 bg-transparent outline-none'
					type='text'
					placeholder='Search Mimir'
				/>
				<button hidden type='submit' />
			</form>
			{/* Right Header Side: Profile + Messages + Notifications etc */}
			<div className='text-gray-500 space-x-2 items-center mx-5 hidden lg:inline-flex '>
				{/* text-gray-500 : icon color set to gray
					items-center : center along the y axis,
					space-x-2 : horizontal space of 2 between the elements
					mx-5 : a margin of 5 along x axis
					hidden : hide the icons on small screens
					lg:inline-flex : show the icons on large screens
				*/}

				<ArrowUpRightIcon className='icon hidden lg:inline-flex ' />
				<ChartBarSquareIcon className='icon hidden lg:inline-flex ' />
				<VideoCameraIcon className='icon hidden lg:inline-flex ' />

				{/* A horizontal line that separates the icons on the right side of the header. */}
				<hr className='h-10 border border-gray-100 hidden lg:inline-flex ' />

				<ChatBubbleOvalLeftEllipsisIcon className='icon hidden lg:inline-flex ' />
				<BellIcon className='icon hidden lg:inline-flex ' />
				<PlusIcon className='icon hidden lg:inline-flex ' />
				<MegaphoneIcon className='icon hidden lg:inline-flex ' />
			</div>
			{/* Hamburger Menu Icon */}
			<div className='ml-5 flex items-center lg:hidden'>
				<Bars3Icon className='icon'></Bars3Icon>
			</div>
			{/* Mimir Logo and Sign In / Sign Out button */}
			{/* A ternary operator. It is a shorthand way of writing an if-else statement. */}
			{session ? (
				<div
					/* A function that calls the signOut function from the next-auth library. */
					onClick={() => signOut()}
					className='hidden lg:flex items-center cursor-pointer space-x-2 border border-gray-200 bg-gray-100 rounded p-2'
				>
					<div className='relative h-7 w-20 flex-shrink-0'>
						<Image
							objectFit='contain'
							src='/logo/LogoText.svg'
							layout='fill'
							alt='login'
						/>
						{/* objectFit='contain': make sure the image fits in the container */}
					</div>
					
					<div className="flex-1 text-xs">
						<p className="truncate">{session?.user?.name}</p>
						<p className='text-gray-400'>7 Mims</p>
					</div>
					
					<ChevronDownIcon className="flex-shrink-0 h-5 text-gray-400" />

				</div>
			) : (
				<div
					/* A function that calls the signIn function from the next-auth library. */
					onClick={() => signIn()}
					className='hidden lg:flex items-center cursor-pointer space-x-2 border border-gray-200 bg-gray-100 rounded p-2'
				>
					<div className='relative h-7 w-20 flex-shrink-0'>
						<Image
							objectFit='contain'
							src='/logo/LogoText.svg'
							layout='fill'
							alt='login'
						/>
						{/* objectFit='contain': make sure the image fits in the container */}
					</div>

					<p className='text-gray-400'>Log In</p>
				</div>
			)}
			<div className='mobile-menu hidden'>{/* Mobile Menu */}</div>
		</div>
	);
}

export default Header;
