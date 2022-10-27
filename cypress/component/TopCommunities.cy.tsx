import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import TopCommunities from "../../components/TopCommunities";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../../apollo-client";

describe("TopCommunities.cy.tsx", () => {
	it("renders correctly", () => {
		cy.mount(
			<ApolloProvider client={createApolloClient()}>
				<SessionProvider
					session={{
						expires: "1",
						user: { email: "a", name: "Delta", image: "c" },
					}}
				>
					<ThemeProvider attribute='class'>
						<div className='divOne my-7 mx-auto max-w-5xl'>
							<div className='divTwo flex'>
								<div className='divThree sticky top-48 ml-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline font-gilroy subpixel-antialiased dark:bg-[#062925]/95 dark:border-[#062925]/95 dark:hover:border-[#3A9188] backdrop-blur-sm'>
									<p className='text-md mb-1 p-4 pb-3 font-gilroy font-bold dark:text-[#B8E1DD]'>
										Top Communities
									</p>

                  {Array(9)
                    .fill(0)
                    .map((_, i) => (
                      <TopCommunities
                        index={i}
                        topic={"topic" + i}
                        key={"topic" + i}
                      />
                    ))}
									<div></div>
								</div>
							</div>
						</div>
					</ThemeProvider>
				</SessionProvider>
			</ApolloProvider>
		);

    // Check if the background color of divThree is [#062925]/95 and border color is [#062925]/95 and border-radius is 6px, on hover border color is [#3A9188]
    cy.get(".divThree").should("have.css", "background-color", "rgba(6, 41, 37, 0.95)");
    cy.get(".divThree").should("have.css", "border-color", "rgba(6, 41, 37, 0.95)");
    cy.get(".divThree").should("have.css", "border-radius", "6px");

    // use cy.realHover
    cy.get(".divThree").realHover();
    cy.get(".divThree").should("have.css", "border-color", "rgb(58, 145, 136)");

    // Check if the text color of p is [#B8E1DD]
    cy.get("p").should("have.css", "color", "rgb(184, 225, 221)");

    // check if ChevronUpDownIcon has color [#3A9188] and there are 9 of them
    cy.get(".ChevronUpDownIcon").should("have.css", "color", "rgb(58, 145, 136)");
    cy.get(".ChevronUpDownIcon").should("have.length", 9);

    // check if there are p tags with number 1 and 9
    cy.get("p").contains("1").should("exist");
    cy.get("p").contains("9").should("exist");

    // check if there are total 9 images
    cy.get("img").should("have.length", 9);

    // check if there are total 9 viewButton
    cy.get(".viewButton").should("have.length", 9);

    // check if the text color of viewButton is [#3A9188] and background color is [#062925]/95
    cy.get(".viewButton").should("have.css", "color", "rgb(184, 225, 221)");
    cy.get(".viewButton").should("have.css", "background-color", "rgb(6, 40, 36)");

    // Check if text "Top Communities" is visible and the font is Gilroy and color is #B8E1DD and font-weight is 700
    cy.contains("Top Communities").should("be.visible");
    cy.contains("Top Communities").should("have.css", "font-family", "Gilroy, sans-serif");
    cy.contains("Top Communities").should("have.css", "color", "rgb(184, 225, 221)");
    cy.contains("Top Communities").should("have.css", "font-weight", "700");

    // Check if the text "topic0" is visible
    cy.contains("topic0").should("be.visible");

    // Check if the text "topic1" is visible
    cy.contains("topic1").should("be.visible");

    // Check if the text "topic2" is visible and the font is Gilroy and color is #B8E1DD and font-weight is 500
    cy.contains("topic2").should("be.visible");
    cy.contains("topic2").should("have.css", "font-family", "Gilroy, sans-serif");
    cy.contains("topic2").should("have.css", "color", "rgb(184, 225, 221)");
    cy.contains("topic2").should("have.css", "font-weight", "400");


	});
});

export {};
