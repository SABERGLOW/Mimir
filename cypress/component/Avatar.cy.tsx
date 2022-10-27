import React from "react";
import Avatar from "../../components/Avatar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

describe("Avatar.cy.tsx", () => {
	it("renders correctly", () => {
		cy.mount(
			<SessionProvider
				session={{
					expires: "1",
					user: { email: "a", name: "Delta", image: "c" },
				}}
			>
				<ThemeProvider attribute='class'>
					<div className='p-10'>
						<Avatar />
					</div>
				</ThemeProvider>
			</SessionProvider>
		);

		// Check if the image has the correct source
		cy.get("img").should(
			"have.attr",
			"src",
			"https://avatars.dicebear.com/api/bottts/Delta||placeholder.svg"
		);

		// Check if the image has the correct alt text
		cy.get("img").should("have.attr", "alt", "avatar");

		// Check if the image has height 10 and width 10 (40px)
		cy.get("img").should("have.css", "height", "40px");
		cy.get("img").should("have.css", "width", "40px");

		// Check if the image has border radius 9999px
		cy.get(".AvatarDiv").should("have.css", "border-radius", "9999px");

    // Check if the div has box shadow of color #044A42
    cy.get(".AvatarDiv").should(
      "have.css",
      "box-shadow",
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgb(4, 74, 66) 0px 0px 0px 4px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
    );

    cy.get(".AvatarDiv").should("have.css", "box-shadow");

	});
});

export {};
