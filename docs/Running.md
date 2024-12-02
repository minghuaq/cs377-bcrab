# Dev Setup

Requirements:

- node 22.10.0 // tested down to node 20, do not use latest.
- docker and docker-compose // optional for simple postgres spin-up. If not used, a postgres server will still be necessary.

## Environment setup

1. Pull the project and run `npm i` in the root of the project.

2. Now create and fill your `.env` and `.env.local` according to [Environment.md](./Environment.md)

3. Run `npm run auth:generate` to generate the authentication secret for auth.js.

4. Run `npm run db` to spin up the postgres and adminer containers for development.

5. With the postgres database up and `.env` configured correctly, run `npm run db:generate` to push the prisma schema to the database. **Make sure no other scripts are running before pushing the database schema.**

6. Now, run `npm run dev` to start the application in development mode. See [Build](./Build.md) for how to create and run production builds.

## Notes

Adminer is accessible at [http://localhost:8080/](http://localhost:8080/).

The postgres database is `postgresql://postgres:password@localhost:5432/postgres?schema=public` by default.

`npm run db:migrate` can be used to migrate the development database to an updated schema. Be careful, as this is very likely to cause data loss.

See [Testing](./Testing.md) for information on running tests.

`npm run db:wipe` can be used to destroy and re-set the postgres and adminer containers. This will automatically re-push the prisma schema, so no need to run `npm run db:generate` after a wipe. **Make sure no other scripts are running before wiping the database.**

`npm run db:stop` can be used to stop the containers when you aren't using them. Use `npm run db` to re-start them.
