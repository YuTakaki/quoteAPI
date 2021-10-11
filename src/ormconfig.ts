export = {
    type:'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    migrationsRun: false /* Disable auto-run migration */,
    cli: {
        entitiesDir: "src/entities",
        migrationsDir: "src/migrations",
    },
}
