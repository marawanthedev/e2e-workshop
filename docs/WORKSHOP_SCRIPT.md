# Facilitator script: Mini Shop full-stack workshop

3.5 hours, mixed levels, one app built in small steps. Every step has a branch holding the state at the **end** of that step.
The start of step N is the branch of step N-1. The workshop guide (`guide/workshop-guide.html`) has every code snippet with a Copy button.

## Timeline

| Time | Block | Branch you end on | Priority |
|---|---|---|---|
| 0:00-0:15 | Intro, demo video, prerequisites, repo link | none | Must |
| 0:15-0:25 | Setup and the check script | `starter` | Must |
| 0:25-0:50 | Step 1: UI, pictures, filters, sample data | `step-1-ui-sample-data` | Must |
| 0:50-1:10 | Step 2: server, health, empty list, CORS | `step-2-server-cors` | Must |
| 1:10-1:20 | Break | | |
| 1:20-1:50 | Step 3: Neon, db files, seed, real data | `step-3-database` | Must |
| 1:50-2:10 | Step 4: api layer, then the hook | `step-4-api-hook` | Must |
| 2:10-2:30 | Step 5: form, create endpoint, faulty product | `step-5-add-product` | Must |
| 2:30-2:45 | Step 6: Zod validation, clean product | `step-6-validation` | Must |
| 2:45-3:00 | Step 7: delete endpoint, Postman, env files | `step-7-delete-postman` | Must |
| 3:00-3:15 | Step 8: cart and zustand | `step-8-cart-zustand` | Nice |
| 3:15-3:30 | Wrap-up and the quiz | `final` | Must |

**Plan for about 150 minutes of content in 210.** A group new to React takes 1.5 to 2 times as long at each step.
If you are more than 10 minutes behind at the break, use the cut order at the bottom.

## Before the day

- [ ] Run the whole workshop yourself once from a clean clone, on a different laptop and with a fresh Neon project.
- [ ] Send the prerequisites a week ahead (guide, Prerequisites page) and ask for a screenshot of `npm run check`.
- [ ] Open on the projector: the finished app on `final`, the Neon dashboard, Postman, the demo video, the slides.
- [ ] Neon is mandatory. Make sure everyone can sign up. A student whose Neon fails pairs with a neighbour.
- [ ] Bring a phone hotspot. `npm install` and the quiz both depend on the network.
- [ ] Test the quiz with real phones on the venue wifi (see `quiz/README.md`).

---

## 0:00 Intro (15 min)

1. **About me (3 min).** Who you are, what you work on, how long, why you are teaching this. Keep it personal and short.
2. **What we will build (2 min).** Open the finished app: filter, add a product, add to cart. Do not show code.
3. **Demo video (3 min).** Play `mini-shop-walkthrough-ar-eg.mp4` (2 minutes) or give the tour yourself.
4. **The map (3 min).** Draw this on the board and leave it up all day:
   ```
   Browser (React)  ->  Express API  ->  Postgres (Neon)
   ```
   "A click becomes an HTTP request. Express routes it to a controller. The controller asks the database. The answer comes back as JSON and React redraws. Today we build every arrow."
5. **Prerequisites (2 min).** Git and Node.js, plus Postman and a Neon account. Ask: who is missing something?
6. **Share the repo (2 min).** Put `https://github.com/marawanthedev/e2e-workshop` on the screen and in the chat.

## 0:15 Setup (10 min), branch `starter`

```bash
git clone https://github.com/marawanthedev/e2e-workshop.git
cd e2e-workshop
git checkout starter
npm install
npm run check
npm run dev
```

Everyone must see all ticks. The lines with a dash are things we do later together.
**Pair a stuck student with a neighbour and carry on.** Do not let setup eat the first hour.

| Symptom | Fix |
|---|---|
| Node too old | Install Node 22 LTS, reopen the terminal |
| A port is in use | Close the other dev server |
| Slow `npm install` | Phone hotspot, or a zipped `node_modules` on a USB drive |

Quick tour: `client/src` (styles are done), `server/src/config.ts`, `scripts/check.mjs`.

---

## 0:25 Step 1: UI with sample data (25 min), ends on `step-1-ui-sample-data`

**Goal:** a product page with pictures and category filters, from hardcoded data.

**Paste:** `data/sampleProducts.ts`, `ProductCard.tsx`, `CategoryFilter.tsx`.
**Type:** `ProductList.tsx` (the `map` and the `key`), then the filter logic in `App.tsx`.

**Say:**
- "`map` turns an array of data into an array of components. The `key` lets React know which item is which."
- "The selected category is **local state**. One component owns it, nobody else needs it."
- "`products` is *derived* from the data and the category. We never store it twice."

**Checkpoint:** 12 products with pictures, and each category shows 3.
**Catch-up:** `git checkout -f step-1-ui-sample-data`

## 0:50 Step 2: server, health and CORS (20 min), ends on `step-2-server-cors`

**Goal:** a running Node app, and an understanding of why the browser blocks calls without CORS.

1. `cp server/.env.example server/.env`.
2. **Type** `index.ts` with only express, the config and the router (no CORS yet), and `routes/index.ts` with `/health`.
3. Open `http://localhost:3001/api/health`: `{"status":"ok"}`.
4. **Say (health):** "Hosting platforms and uptime monitors call this every minute. If it answers 200 the server counts as up, and the share of successful calls is the uptime percentage on a status page. It is a cheap way to know a server is alive without touching the database."
5. **Type** `routes/products.ts` and `controllers/products.ts`: the list endpoint returns `[]`.
6. **CORS, break it first.** On the app page (`localhost:5173`) open the console and run:
   `fetch('http://localhost:3001/api/products').then(r => r.json()).then(console.log)`
   They see "blocked by CORS policy". **Say:** "The server answered fine. The browser refused to give the answer to this page, because it came from a different website. Postman and curl never show this, because they are not browsers."
7. **Fix it:** add `cors({ origin: config.clientOrigin })`, save, run the same line again: `[]`.

**Checkpoint:** the console prints `[]`.
**Catch-up:** `git checkout -f step-2-server-cors`

## 1:10 Break (10 min)

Fix setups. Restart your own app on `final` to check it still works.

---

## 1:20 Step 3: database and seeding (30 min), ends on `step-3-database`

**Goal:** Neon connected, 12 products seeded, served from the API.

1. **Create the database together** on the projector: Neon, New project, Connect, copy the connection string. Paste it into `server/.env` as `DATABASE_URL=` with no quotes. Walk the room.
2. **Say (env files, briefly):** "Config that changes per machine, or is secret, lives outside the code. This file is in `.gitignore`. We come back to it in step 7."
3. **Type** the `databaseUrl` line in `config.ts`, then `db/index.ts` (the pool: "it reuses a few connections, because opening one per request is slow").
4. **Paste** `types.ts`. **Type** `db/postgres.ts`: `SELECT ... ORDER BY id`. Mention `price::float8`: "Postgres sends numbers like prices as strings, so we convert in SQL."
5. **Seeding.** "Seeding means filling a fresh database with starting data, so everyone has the same products." **Paste** `scripts/seed.ts`, read it together, run `npm run db:seed`. Show the 12 rows in the Neon dashboard.
6. **Type** the controller change and open `http://localhost:3001/api/products`.

| Symptom | Fix |
|---|---|
| "DATABASE_URL is missing" | Paste it into `server/.env`, save |
| Connection or password error | Copy it again from Neon, no quotes or spaces |
| An SSL warning | Harmless, printed by the database library |

**Checkpoint:** the API returns 12 products.
**Catch-up:** `git checkout -f step-3-database`

## 1:50 Step 4: api layer and custom hook (20 min), ends on `step-4-api-hook`

**Goal:** stop using sample data, and see why a hook beats fetching inside the component.

1. **Type** `api/products.ts`: "one file knows how to talk to the server."
2. **First, inline.** In `App.tsx` replace the sample data with `useState` plus `useEffect(() => { fetchProducts().then(setAllProducts) }, [])`. It works. Delete `sampleProducts.ts`.
3. **Then the pain.** "Look at App. It fetches, keeps state, filters and draws: four jobs. A form and a cart would make it worse."
4. **Type** `hooks/useProducts.ts` and slim `App.tsx`. "A custom hook is a function that uses state and effects and hands the results to a component. The component only decides what to draw."
5. Stop the server and reload to show the error line. Start it again.

**Checkpoint:** 12 products from the database, filters work.
**Catch-up:** `git checkout -f step-4-api-hook`

## 2:10 Step 5: add a product, and break things (20 min), ends on `step-5-add-product`

**Goal:** a working form, then feel why unchecked data hurts.

1. **Type** `insertProduct` (explain `$1`...`$4`: "the driver sends values separately from the SQL. That stops SQL injection."), the controller, the route, and `express.json()`.
2. **Type** `createProduct` in the api layer and `addProduct` in the hook. **Paste** `AddProductForm.tsx`. **Type** the button in `App.tsx`.
3. Add a normal product (Desk Lamp, 25, Home, an image URL). It appears, and survives a reload.
4. **Push the faulty one:** Magic Gadget, 15.5, category **Gadgets**. It saves. Click every category: it is in none of them, only in "All".
5. **Say:** "The server accepted anything. No check, no error. Now there is wrong data in the database and nobody told us. How do we stop it?"
6. **Clean up in the Neon SQL Editor:** `DELETE FROM products WHERE category = 'Gadgets';`

**Checkpoint:** Desk Lamp is saved; the faulty product was saved and removed.
**Catch-up:** `git checkout -f step-5-add-product`

## 2:30 Step 6: validation with Zod (15 min), ends on `step-6-validation`

1. **Type** `server/src/schemas.ts` and the `safeParse` in the controller. "A schema says what valid looks like. If it does not match we answer **400** with a clear message."
2. Push the faulty product again. The form shows: *Category must be one of: Electronics, Clothing, Home, Accessories*. Nothing is saved.
3. **Type** `client/src/schemas/product.ts` and **paste** the new `AddProductForm.tsx`. "The server is the real guard. The form is a convenience that tells people what is wrong before a request is sent."
4. Submit an empty form (a message under each field), then push a clean product and click its category.

**Checkpoint:** the faulty product is rejected; a clean one shows under its filter.
**Catch-up:** `git checkout -f step-6-validation`

## 2:45 Step 7: delete and Postman (15 min), ends on `step-7-delete-postman`

1. **Type** `deleteProduct`, `removeProduct` and the route.
2. **Postman:** GET the list; POST the faulty product (**400**: "validation works even without our form, because Postman is not our form"); POST a clean one (**201**, note the `id`); DELETE it (**204**), then again (**404**).
3. If short on time, import `postman/mini-shop.postman_collection.json`.
4. **Env files talk (3 min):** "`.env` holds what changes between machines or is secret. It is in `.gitignore`. `.env.example` is committed with empty values. In production the same names are set in the hosting dashboard. What if we committed `.env`? Anyone who sees the repo could use your database."

**Checkpoint:** 400, 201, 204, 404 in Postman.
**Catch-up:** `git checkout -f step-7-delete-postman`

## 3:00 Step 8: cart and zustand (15 min), ends on `step-8-cart-zustand`

1. **Why a store?** "Three components care about the cart: the button on every card, the badge in the header, the drawer. They sit in different parts of the tree. With props we would pass the cart through components that do not care. A store lives outside the tree and any component can use it."
2. **Type** `store/cartStore.ts`. Explain `set((state) => ...)`: the next state is built from the previous one, never mutated.
3. **Paste** `CartDrawer.tsx`. **Type** the button in `ProductCard.tsx` and the badge in `App.tsx`.
4. Add items, switch category, add more: the badge keeps counting.
5. **Say:** "The filter is local state, one owner. The cart is global state, many readers. Use local state first and reach for a store when sharing starts to hurt."

**Checkpoint:** the badge, the drawer, the total and Remove all work.
**Catch-up:** `git checkout -f step-8-cart-zustand`

## 3:15 Wrap-up and quiz (15 min), branch `final`

1. **Recap (3 min).** Walk the map on the board and say what you built at each arrow.
2. **Next steps (1 min).** A delete button in the UI, tests, login, deploying (`final` has `render.yaml` and `DEPLOY.md`), the `bonus` branch.
3. **AI tools:** "Use them, but read every line, run it, and know why it works."
4. **Quiz (10 min).** `cd quiz && npm start`. Host screen on the projector, players scan the QR. 12 questions, 20 seconds each. Winner 3 mentoring sessions, second 2, third 1.
5. Show the mentoring slide and your links.

---

## If you are running late: cut order

1. Step 8: demo it from the branch instead of typing it.
2. Shorten the quiz to 6 questions.
3. Step 7: skip the delete endpoint, keep only Postman with GET and POST.
4. Step 4: paste the hook instead of typing it.
5. **Never cut:** the big picture, step 3 (the database), the faulty product demo, and the catch-up commands.

## Bonus (if there is time, or as homework)

`git checkout bonus`, open `http://localhost:5173/?lab=keys`.
Part A: with `key=index`, removing the first row leaves the typed notes under the wrong items. With `key=id` they follow their items.
Part B: with `React.memo` the 100 cards re-render in about 0 ms; without it about 10 ms.

## Catch-up commands

```bash
git stash -u                      # optional: keep your own work
git checkout -f step-3-database   # jump to any step
```
