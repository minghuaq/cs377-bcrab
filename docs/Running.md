# Dev Setup

Requirements:

- node 22.10.0 // tested down to node 20, do not use latest.
- docker and docker-compose // optional for simple postgres spin-up

## Environment setup

1. Pull the project and run `npm i` in the root of the project.

2. Now create and fill your `.env` and `.env.local` according to [Environment.md](./Environment.md)

3. Run `npm run auth:generate` to generate the authentication secret for auth.js.

4. Run `npm run db:compose` to spin up the postgres and adminer containers for development. This terminal can be closed or ignored, but interupting it will cause your containers to go down. Use `docker-compose start` to run in background.

5. With the postgres database up and `.env` configured correctly, run `npm run db:generate` to push the prisma schema to the database.

6. Now, run `npm run dev` to start the application in development mode. See [Build](./Build.md) for how to create and run production builds.

## Notes

Adminer is accessible at [http://localhost:8080/](http://localhost:8080/).

The postgres database is `postgresql://postgres:password@localhost:5432/postgres?schema=public` by default.

`npm run db:migrate` can be used to migrate the development database to an updated schema. Be careful, as this is very likely to cause data loss.

See [Testing](./Testing.md) for information on running tests.
