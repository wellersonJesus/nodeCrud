***dATAbASES***
|database|user|loginPostgres
---|---|---|
node_crud|postgres|admin123

***cOMANDOS***

        yarn init -y |criar projeto

        sudo apt install yarn 
        yarn -v |1.22.17
        yarn init -y |criar arquivo projeto
        yarn add express |adiciona dependencias
        yarn add typescript ts-node-dev @types/express -D |adiciona dependencias 

        yarn tsc --init |inicia aplicação

- [tsconfi.json]()

        "target": es2021"
        "strict": false,

        yarn add typeorm reflect-metadata pg
        yarn typeorm

        yarn add uuid | Instala bibliotecas uuid
        yarn add @types/uuid -D | Instala as tipagens

        yarn typeorm migration:run | roda migrations  
        yarn typeorm migration:revert | desfaz a ultima migrations  
        yarn dev |start servidor

        yarn typeorm migration:create -n CreateCategories
        yarn typeorm migration:create -n CreateVideos
        yarn |Cria arquivo node_modules

***oRMcONFIG.TS***

        module.exports = {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "admin123",
        database: "node_crud",

        
        //ENTIDADES ...
        entities: [
        "./src/entities/*.ts"

        ],
        entitiesDir: [
        "./src/entities"


        //MIGRATIONS
        ],
        migrations: [
        "./src/database/migration/*.ts"
        ],
        cli: {
        migrationsDir: "src/database/migration"
        }
        }

***mIGRATIONS-cATEGORIES.TS 26:55***

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategories1640786790698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: "categories",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        })
    )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
}
}

***mIGRATIONS-vIDEOS.TS 31:50***

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVideos1640804905953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
  
        await queryRunner.createTable(
            new Table({
                name: "videos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                    },
                    {
                        name: "duration",
                        type: "numeric",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                 {
                        name: "fk_videos_category",
                        columnNames: ["category_id"],
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"]
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("videos");
    }
}

***eNTITIES cATEGORY.TS 38:23***

    import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm" 
    import { v4 as uuid } from "uuid"


    @Entity("categories")
    export class Category {

        @PrimaryColumn()
        id: string;

        @Column()
        name: string;
        
        @Column()
        description: string;
        
        @CreateDateColumn()
        created_at: Date;

        constructor() {
            if(!this.id){
                this.id = uuid();
            }
        }
    }
   
***sERVICES.TS***

    import "reflect-metadata"
    import express from "express";
    import "./database";
    import { routes } from "./routes";

    const app = express();

    app.use(express.json());
    app.use(routes);

    app.listen(3000, () => console.log("Server is running"));

***eNTITIES vIDEO.TS***

    import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm"
    import { v4 as uuid } from "uuid"
    import { Category } from "./Category";

    @Entity("videos")
    export class Video {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    duration: number;

    @Column()
    category_id: string;
    
    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuid();
        }
    }
}

***iNDEX.TS***

        import { createConnection } from "typeorm";
            createConnection(); 

***cREATEcATEGORYsERVICE.TS 43:30***

     import { getRepository } from "typeorm"
     import { Category } from "../../entities/Category";

        type CategoryRequest = {
            name: string;
            description: string;
        }

        export class CreateCategoryService {

            async execute({ 
                name, 
                description,
            }: CategoryRequest): Promise<Category | Error> {
                const repo = getRepository(Category);
                
                //SELECT * FROM CATEGORIES WHERE NAME = "NAME"  LIMIT 1
                if (await repo.findOne({ name })) {
                    return new Error("Category already exists");
                }

                const category = repo.create({
                    name,
                    description,
                });

                await repo.save(category);

                return category;
            }
        }

***cREATEcATEGORYcONTROLLER.TS***

        import { request, Request, Response } from "express";
        import { CreateCategoryService } from "../database/services/CreateCategoryService";

        export class CreateCategoryController {
            async handle(request:Request, response: Response ) {
                const { name, description } = request.body;

                const service = new CreateCategoryService();
                const result = await service.execute({ name, description });

                if (result instanceof Error) {
                    return response.status(400).json(result.message);
                }

                return response.json(result);
            }
        }

***rOUTES.TS***

    import { Router } from "express";
    import { CreateCategoryController } from "./Controllers/CreateCategoryController";

        const routes = Router();

        routes.post("/categories", new CreateCategoryController().handle);

        export { routes };


---
.
.
.
_51:50 ... Continuar_