import React from "react";
import Image from "next/image";
import { ChevronDownIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/outline'

function Header() {
	return (
		//... This is the Header component, it contains the navigation bar and the logo ...// 
		<div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm"> {/* sticky header, always stays on top even when we scroll down */}
			<div className="relative h-10 w-20 flex-shrink-0 cursor-pointer"> {/* flex-shrink-0 makes sure our logo doesn't shrink when we set constraint to the header */}
				<Image
					objectFit='contain'
					src='/logo/LogoText.svg'
					layout='fill'
					alt='logo'
				/>
			</div>

			{/* Home Icon + Dropdown menu */}
			<div className="flex items-center mx-7 xl:min-w-[300px]"> 
				{/* flex : put the items in a row,
					items-center : center along the y axis,
					mx-7 : a margin of 7 along x axis,
					xl:min-w-[300px] : on extra large screens, width of 300px for Home Component, uses JIT compiler of tailwind css
				*/}

				{/* Home Icon */}
				<HomeIcon className="h-5 w-5"/>
				<p className="flex-1 ml-2 lg:inline hidden">Home
					{/* flex-1 : allow our component to graw/shrink as needed
						ml-2 : add a margin of 2 along x axis
						lg:inline : show the text on large screens
						hidden : hide the text on small screens
					*/}
				</p>
				<ChevronDownIcon className="h-5 w-5"/>
			</div>


			{/* Search Bar */}
			<form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded bg-gray-100 px-3 py-1 ">
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

				<MagnifyingGlassIcon className="h-6 w-6 text-gray-400"/>
				<input className=" flex-1 bg-transparent outline-none" type="text" placeholder="Search Mimir"/>
				<button hidden type="submit"/> 

			</form>
		</div>
		
	);
}

export default Header;
