
module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin123",
  database: "node_crud",

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
