import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/",
    setupNodeEvents(on, config) {
      // You can add event handlers here
    },
  },
});
