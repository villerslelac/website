# Villers-le-Lac Website

## Development

### Setting up the API

The API is powered by [Directus](https://directus.io/), and you can initialize it by following these steps:

1. Navigate to the backend directory and start Directus

```sh
cd backend
docker compose up -d
```

2. Apply the database schema using the provided YAML file

```sh
docker cp ./schema.yaml directus:/directus/schema.yaml
docker exec -it directus /bin/sh
npx directus schema apply --yes ./schema.yaml
```

Open [http://localhost:8055](http://localhost:8055) in your browser to access the Directus dashboard.

You can log in using the following credentials:

- Username: admin@example.com
- Password: d1r3ctu5

#### Transformation presets

```
Key: og-image
Fit: Cover
Width: 1200
Height: 630
Quality: 100%
Additional transformations:
[
    [
        "flatten",
        {
            "background": "#ffffff"
        }
    ]
]
```

```
Key: event
Fit: Cover
Width: 1000
Height: 1414
Quality: 100%
Additional transformations:
[
    [
        "flatten",
        {
            "background": "#ffffff"
        }
    ]
]
```

```
Key: council-member
Fit: Cover
Width: 512
Height: 656
Quality: 100%
Additional transformations:
[]
```

### Running the Application

The frontend is a [Next.js](https://nextjs.org/) project created with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). To run the application, follow these steps:

```sh
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application and begin coding in your favorite code editor.

Remember to configure environment variables located in `.env.local`.
