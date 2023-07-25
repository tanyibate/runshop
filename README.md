This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Setting up the database Part 1

You will need a postgres database running for the application to work. There is a docker compose file included which bootstraps postgres. You can execute the database using docker compose up in a terminal. You can also use your own postgres server but make sure to change the DATABASE_URL variable in the .env file to your own.

```
docker compose up
# or
docker compose up -d
```

### Install the dependencies

Please ensure that you are using a new terminal if the postgres instance is not running in the background. To install the dependencies you'll need use your javascript package manager which will most likely be npm.

```
npm install
```

### Setting up the database Part 2

You'll now have to migrate your database to ensure the correct it has the correct schema.

```
npx prisma migrate dev
```

The application is powered using Prisma ORM to be able to use Prisma the boiler plate needs to be generated

```
npx prisma generate
```

Now to finish the setup well need to seed the database using the provided json files

```
npx prisma db seed
```

### Running the application

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. To access protected routes sign in with the credentials admin@runshop.com and the password being just password for simplicity. You can also sign in using your Google Account but this may be limited due google credentials being a setup for an unpublished project. If google sign in does not work you may have to generate your own client id and client secret.

### Common Issues

These are the issues I've discovered my self but are unable to be fixed due to me using a third party library to render data

#### Graphs

The graphs may not occasionally display properly due their dynamic nature, please just select another filter for the data such as Over and Under 1.5 Goals, Over and Under 2.5 Goals etc and then chose the orginal filter and then chart/ graph will be loaded correctly.
