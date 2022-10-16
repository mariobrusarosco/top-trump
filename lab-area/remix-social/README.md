# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

Check your local DB

```sh
npx prisma studio
```

## Planet Scale

### Log in

```bash
pscale auth login
```

# Connect to a branch

```bash
pscale connect {db_name} {branch_name}
```

### Start a branch

```bash
pscale branch create remix-social initial-setup
```

# Switch to a branch

```bash
pscale branch switch {branch_name} --database {db_name}
```

### Push a prisma schema to PlanetScale

```bash
npx prisma db push
```

## AUTHENTICATION

- remix-auth
- remix-auth-form

First we'll need ton fullfill the `Authenticator`class requirements.

1. We need to pass a **User schema**
2. We need to implement three functions: `getSession`, `commitSessionand`, `destroySession`.

```ts
export type SessionUser = Omit<User, "hashedPassword">;

export const authenticator = new Authenticator<SessionUser>({
  getSession,
  commitSession,
  destroySession,
});
```

This project will use _HTTP Cookies_. `@remix-run/node` has a Cookies Strategy:

```ts
import { createCookieSessionStorage } from "@remix-run/node";
```
