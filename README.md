# Mini Shop: a full-stack workshop

Build a small online shop end to end and see how every layer of a web app connects:
**React and TypeScript** in the browser, an **Express** API, and a **Postgres** database on Neon.

```
Browser (React + TypeScript)  ->  Express API (Node.js)  ->  Postgres (Neon)
   ui -> hooks -> api layer        routes -> controllers -> db

click -> HTTP request -> route -> controller -> SQL -> rows -> JSON -> React redraws
```

It is a 3.5 hour, hands-on session for mixed levels. The styling is already done, so you only write TypeScript and JSX.
Every step has its own branch, so you can follow along live, catch up when you fall behind, or work through it alone later.

## What you will learn

- **Components, props and local state:** build a product page with pictures and category filters.
- **A Node.js and Express server:** routes, controllers, a health check, and why uptime monitors use it.
- **CORS:** see the browser block you, then whitelist your website.
- **Postgres on Neon:** connections, env files, and seeding a database.
- **The api layer and custom hooks:** why we separate business logic from the UI.
- **Forms and validation with Zod:** push a faulty product, see the damage, then stop it on the server and in the form.
- **Postman:** test an API without a frontend, and the HTTP status codes.
- **Global state with zustand:** a cart shared by many components.
- A bit of **TypeScript** throughout.

## What you build

A product page with category filters, an **Add product** form with validation, a cart, and an API backed by a real database.

## Who it is for

Students and junior developers who know basic HTML, CSS and JavaScript. Beginners can follow every step. No prior React,
Node or SQL experience is needed.

## Before the workshop (about 20 minutes)

1. Install **Node.js 22 LTS** ([nodejs.org](https://nodejs.org)), **Git** and **VS Code**.
2. Create a free **Neon** account ([neon.com](https://neon.com), no credit card). We create the database together in step 3.
3. Install **Postman** ([postman.com/downloads](https://www.postman.com/downloads/)).
4. Clone the repo, switch to the starter code, and run the check:
   ```bash
   git clone https://github.com/marawanthedev/e2e-workshop.git
   cd e2e-workshop
   git checkout starter
   npm install
   npm run check
   ```
   `npm run check` prints a tick for everything the workshop needs. Send a screenshot to the facilitator.

## Run it

```bash
npm run dev
```

- Client: http://localhost:5173
- API: http://localhost:3001/api/health (from step 2)

## Branches: one per step

Each branch is the state **at the end** of that step. The start of step N is the branch of step N-1.

| Branch | What it contains | What you learn | Time |
|---|---|---|---|
| [`starter`](../../tree/starter) | Packages, styling, an empty app shell, an almost empty server, the setup check | Tour, getting everything running | 10 min |
| [`step-1-ui-sample-data`](../../tree/step-1-ui-sample-data) | The product page with pictures, from sample data, with category filters | Components, props, `map` and `key`, local state | 25 min |
| [`step-2-server-cors`](../../tree/step-2-server-cors) | An Express app with `/health`, an empty products list, and CORS | Routing, health checks, CORS | 20 min |
| [`step-3-database`](../../tree/step-3-database) | Neon connection, the seed script, products served from the database | Neon, env files, seeding, SQL | 30 min |
| [`step-4-api-hook`](../../tree/step-4-api-hook) | The client reads the API through an api layer and a `useProducts` hook | Custom hooks, separating logic from UI | 20 min |
| [`step-5-add-product`](../../tree/step-5-add-product) | The Add product form and the create endpoint, with no validation | Forms, POST, why unchecked data hurts | 20 min |
| [`step-6-validation`](../../tree/step-6-validation) | Zod validation on the server and in the form | Zod, status codes, two layers of defence | 15 min |
| [`step-7-delete-postman`](../../tree/step-7-delete-postman) | The delete endpoint and a Postman collection | DELETE, Postman, env files | 15 min |
| [`step-8-cart-zustand`](../../tree/step-8-cart-zustand) | The cart, with a zustand store | Global state | 15 min |
| [`final`](../../tree/final) | The finished app, plus `render.yaml` and `DEPLOY.md` | Deploying to Render and Vercel | bonus |
| [`bonus`](../../tree/bonus) | `final` plus a keys and React Profiler lab (`/?lab=keys`) | `key`, `React.memo`, the Profiler | bonus |
| [`main`](../../tree/main) | The facilitator materials: workshop guide, slides, script and live quiz | | |

### Fell behind? Catch up

```bash
git checkout -f step-3-database   # discards your local changes and jumps to that step
```

Want to keep your work first? Run `git stash -u` before switching.

## Workshop materials (on the `main` branch)

| What | Where |
|---|---|
| **Workshop guide**: step-by-step instructions with copy-ready code, prerequisites and a cheat sheet. Presenter notes appear when you tick the checkbox in the header. | [`guide/workshop-guide.html`](../../blob/main/guide/workshop-guide.html). Download it and open it in a browser. |
| **Slides**: a 22-slide deck with keyboard navigation (arrow keys, F for fullscreen) | [`slides/index.html`](../../blob/main/slides/index.html) |
| **Facilitator script**: timeline, talking points, fixes and what to cut when running late | [`docs/WORKSHOP_SCRIPT.md`](../../blob/main/docs/WORKSHOP_SCRIPT.md) |
| **Live quiz**: a Kahoot-style game for the end of the session, with speed-based scoring and a podium | [`quiz/`](../../tree/main/quiz). Read its README to run it. |

## Project layout (final state)

```
e2e-workshop/
  client/                React + Vite + TypeScript
    src/
      api/               products.ts (the api layer)
      components/        ProductCard, ProductList, CategoryFilter, AddProductForm, CartDrawer
      hooks/             useProducts
      store/             cartStore (zustand)
      schemas/           product.ts (Zod)
  server/                Express + TypeScript
    src/
      routes/            URL and method -> controller
      controllers/       request in, response out
      db/                index.ts (connection), postgres.ts (queries)
      schemas.ts         server-side Zod validation
    scripts/seed.ts      create the table and seed the products
  postman/               a ready-made Postman collection
  scripts/check.mjs      the setup check
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the client and the server together |
| `npm run check` | Check your setup |
| `npm run db:seed` | Create the table and seed products (safe to repeat) |
| `npm run db:reset` | Drop the table and seed it again |
| `npm run typecheck` | Type-check client and server |

## Stack

React 19, Vite, TypeScript, zustand, Zod, Express 5, `pg`, Postgres on Neon, `tsx`.

## Stuck?

| Symptom | Fix |
|---|---|
| `npm run check` says Node is too old | Install Node 22 LTS and reopen the terminal |
| "DATABASE_URL is missing" | Paste your Neon connection string into `server/.env` and save |
| Connection or password error | Copy the string again from Neon, with no quotes or spaces |
| Port 3001 or 5173 in use | Close other dev servers |
| An SSL mode warning with Neon | Printed by the database library. It is harmless |

## About the author

Built and taught by **Marwan Mostafa**, a software engineer working with React, Next.js, TypeScript and Node.js.

**Want to grow faster?** I offer 1:1 mentorship for web developers: 45-minute sessions, 8-week programs and interview
preparation. See [altechmentor.com](https://www.altechmentor.com/).

- GitHub: [marawanthedev](https://github.com/marawanthedev)
- Website: [marwan-mostafa.com](https://marwan-mostafa.com/)
- LinkedIn: [marwan-mostafa](https://www.linkedin.com/in/marwan-mostafa-6112801a6/)
- YouTube: [@codewithmarwan](https://www.youtube.com/@codewithmarwan)
