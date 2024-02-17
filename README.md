# Villers-le-Lac Website

## Development

### Setting up the API

The API is powered by [Directus](https://directus.io/), and you can initialize it by following these steps:

1. Navigate to the backend directory and install dependencies using pnpm

```sh
cd backend
pnpm install
```

2. Bootstrap the Directus project:

```sh
npx directus bootstrap
```

3. Add an admin user to the .env file:

```sh
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="d1r3ctu5"
```

4. Apply the database schema using the provided YAML file

```sh
npx directus schema apply schema.yaml
```

5. Start the Directus server:

```sh
npx directus start
```

Open [http://localhost:8055](http://localhost:8055) in your browser to access the Directus dashboard.

### Running the Application

The frontend is a [Next.js](https://nextjs.org/) project created with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). To run the application, follow these steps:

```sh
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application and begin coding in your favorite code editor.
