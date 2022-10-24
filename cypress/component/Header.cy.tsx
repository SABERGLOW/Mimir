import React from "react";
import Header from "../../components/Header";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

//... This is the Header component, it contains the navigation bar and the logo ...//

describe("Header: Logged In", async () => {
	it("renders correcty", async () => {
		cy.mount(
			<SessionProvider
				session={{
					expires: "1",
					user: { email: "a", name: "Delta", image: "c" },
				}}
			>
				<ThemeProvider attribute='class'>
					<Header />
				</ThemeProvider>
			</SessionProvider>
		);

		/* Checking if the text is in the component. */
		cy.get("p").should("contain.text", "Home");
		cy.get("p").should("contain.text", "Delta");
		cy.get("p").should("contain.text", "Mims");

		// element with class 'mimir-logo' should have attribute 'src' with value '/logo/LogoText.svg'
		cy.get(".mimir-logo").should("have.attr", "src", "/logo/LogoText.svg");

		// check if the image is visible
		cy.get("img").should("be.visible");

		// element with class 'icon' should be visible on display 1024px and of color #3A9188
		cy.get(".icon")
			.should("be.visible")
			.and("have.css", "color", "rgb(58, 145, 136)");

		// check if the font is correct
		cy.get("p").should("have.css", "font-family", "Gilroy, sans-serif");

		// check if the Link is working
		cy.get("a").should("have.attr", "href", "/");
		// cy.get('a').click()

		// check if the form is visible, and if the input is visible. Placeholder should be 'Search Mimir' and the input should be of type 'text' and color #B8E1DD
		cy.get("form").should("be.visible");
		cy.get("input").should("be.visible");
		cy.get("input").should("have.attr", "placeholder", "Search Mimir");
		cy.get("input").should("have.attr", "type", "text");
		cy.get("input").should("have.css", "color", "rgb(184, 225, 221)");

		// check if div with class 'signInOut' is visible, and click on it, it should sign out the user and redirect to the home page
		cy.get(".signInOut").should("be.visible");
		cy.get(".signInOut").click();
		cy.url().should("include", "/");

	});
});

export {};
