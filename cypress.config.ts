import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "2bbi6a",
  viewportHeight: 1080,
  viewportWidth: 1920,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    experimentalStudio: true,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
