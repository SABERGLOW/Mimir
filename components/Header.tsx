import React from "react";
import Image from "next/image";

function Header() {
	return (
		///... This is the Header component, it contains the navigation bar and the logo ...// 
		<div>
			<div className="relative h-10 w-20 flex-shrink-0 cursor-pointer"> {/* flex-shrink-0 makes sure our logo doesn't shrink when we set constraint to the header */}
				<Image
					objectFit='contain'
					src='/logo/LogoText.svg'
					layout='fill'
					alt='logo'
				/>
			</div>
		</div>
	);
}

export default Header;
