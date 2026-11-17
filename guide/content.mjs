// Content for the workshop guide. Code is pulled from git branches by build.mjs.
import { pagesA } from "./pages-a.mjs";
import { pagesB } from "./pages-b.mjs";

export const branchOrder = ["starter", "step-1-ui-sample-data", "step-2-server-cors", "step-3-database", "step-4-api-hook", "step-5-add-product", "step-6-validation", "step-7-delete-postman", "step-8-cart-zustand"];

export const nav = [
  { title: "Start", items: [{ slug: "overview", title: "Overview" }, { slug: "prerequisites", title: "Prerequisites" }] },
  { title: "Build", items: [
    { slug: "setup", title: "Setup", nav: "0 · Setup" },
    { slug: "step-1", title: "The UI with sample data", nav: "1 · UI and sample data" },
    { slug: "step-2", title: "The server, health and CORS", nav: "2 · Server and CORS" },
    { slug: "step-3", title: "The database and seeding", nav: "3 · Database" },
    { slug: "step-4", title: "The api layer and a custom hook", nav: "4 · API layer and hook" },
    { slug: "step-5", title: "Add a product (and break things)", nav: "5 · Add a product" },
    { slug: "step-6", title: "Validation with Zod", nav: "6 · Validation" },
    { slug: "step-7", title: "Delete and Postman", nav: "7 · Delete and Postman" },
    { slug: "step-8", title: "The cart and global state", nav: "8 · Cart and zustand" },
  ] },
  { title: "Finish", items: [{ slug: "wrapup", title: "Wrap-up and quiz", nav: "Wrap-up and quiz" }] },
  { title: "Extras", items: [{ slug: "bonus", title: "Bonus: keys and the Profiler", nav: "Bonus: keys lab" }, { slug: "deploy", title: "Deploy it", nav: "Deploy it" }] },
  { title: "Reference", items: [{ slug: "cheatsheet", title: "Cheat sheet and troubleshooting", nav: "Cheat sheet" }] },
  { title: "Presenter", presenter: true, items: [{ slug: "facilitator", title: "Facilitator guide", nav: "Facilitator guide" }] },
];

export const pages = [...pagesA, ...pagesB];
