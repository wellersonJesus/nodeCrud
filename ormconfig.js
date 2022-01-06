
module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "nodeCrud",

  ///TypeORM corrigir QueryFailedError
  synchronize: true,
  migrationsRun: true,


  //ENTIDADES ...
  entities: [
    "./src/entities/*.ts"

  ],
  entitiesDir: [
    "./src/entities"

  //MIGRATIONS ...
  ],
  migrations: [
    "./src/database/migration/*.ts"
  ],
  cli: {
    migrationsDir: "src/database/migration"
  }
}
