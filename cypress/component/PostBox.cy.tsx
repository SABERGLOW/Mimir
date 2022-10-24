import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import PostBox from "../../components/PostBox";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../../apollo-client";

describe("PostBox.cy.ts", () => {
	it("renders correctly", () => {
		// Mount the component PostBox

		cy.mount(
			<ApolloProvider client={createApolloClient()}>
				<SessionProvider
					session={{
						expires: "1",
						user: { email: "a", name: "Delta", image: "c" },
					}}
				>
					<ThemeProvider attribute='class'>
						<PostBox />
					</ThemeProvider>
				</SessionProvider>
			</ApolloProvider>
		);

    // Check if the background color of the form is #F5F5F5
    cy.get("form").should("have.css", "background-color", "rgba(6, 41, 37, 0.95)");

    // Check if form is visible
    cy.get("form").should("be.visible");

    // Check if the form has border of 1px solid #B8E1DD and border-radius of 6px
    cy.get("form").should("have.css", "border", "1px solid rgba(6, 41, 37, 0.95)");

    // Check if the PostBoxForm has border color of #3A9188 when hovered
    cy.get(".PostBoxForm").trigger("mouseover");
    cy.get(".PostBoxForm").should("have.css", "border-color", "rgba(6, 41, 37, 0.95)");

    // Check if the input is visible
    cy.get("input").should("be.visible");

    // Check if the input has placeholder 'What's on your mind?'
    cy.get("input").should("have.attr", "placeholder", "Create a Post");

    // Check if the input is of type 'text'
    cy.get("input").should("have.attr", "type", "text");

    // Check if the input has color #B8E1DD
    cy.get("input").should("have.css", "color", "rgb(184, 225, 221)");

    // Enter text in the input
    cy.get("input").type("Hello World");

    // Check if the text is in the input
    cy.get("input").should("have.value", "Hello World");

    // Check if the text "Body" and "SubMimir" is visible
    cy.contains("Body").should("be.visible");
    cy.contains("SubMimir").should("be.visible");

    // Check if the text "Body" and "SubMimir" has color #B8E1DD
    cy.contains("Body").should("have.css", "color", "rgb(184, 225, 221)");
    cy.contains("SubMimir").should("have.css", "color", "rgb(184, 225, 221)");

    // Check if the textarea is visible and has placeholder 'Text (optional)'
    cy.get(".bodyInput").should("be.visible");
    cy.get(".bodyInput").should("have.attr", "placeholder", "Text (optional)");

    // Check if the textarea is visible and has placeholder 'i.e. Next.js'
    cy.get(".subredditInput").should("be.visible");
    cy.get(".subredditInput").should("have.attr", "placeholder", "i.e. Next.js");

    // Check if the button is visible
    cy.get("button").should("be.visible");

    // Check if the button has text 'Post'
    cy.get("button").should("contain.text", "Post");

    // Check if Avatar image is visible
    cy.get("img").should("be.visible");

    // Check if PhotoIconButton is visible and has color #3A9188, and on hover has color #B8E1DD and cursor pointer
    cy.get(".PhotoIconButton").should("be.visible");
    cy.get(".PhotoIconButton").should("have.css", "color", "rgb(58, 145, 136)");
    cy.get(".PhotoIconButton").trigger("mouseover");
    cy.get(".PhotoIconButton").should("have.css", "cursor", "pointer");

    // Click on the PhotoIconButton
    cy.get(".PhotoIconButton").click();

    // Check if ImageURL is visible and has placeholder 'Image URL'
    cy.get(".ImageURL").should("be.visible");
    cy.get(".ImageURL").should("have.attr", "placeholder", "Optional");

	});
});




export {};
