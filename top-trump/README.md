# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## Production

[top-trump-mariobrusarosco.vercel.app](top-trump-mariobrusarosco.vercel.app)

## Planet Scale

### Log in

```bash
pscale auth login
```

### Start a branch

```bash
pscale branch create top-trump initial-setup
```

### Switch to a branch

```bash
pscale branch switch {branch_name} --database top-trump
```

### Connect to a branch

```bash
pscale connect top-trump {branch_name}
```

### Push a prisma schema to PlanetScale

```bash
npx prisma db push
```
