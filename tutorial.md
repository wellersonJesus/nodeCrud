
**CRUD NODE.JS**
-

***[CRUD com Node.JS, Express, TypeORM e PostgreSQL](https://www.youtube.com/watch?v=9AO2hZJsHrs). Tutorial projeto crud node.js para estudo e base novos projetos...***


***tSCONFIG.JSON***

            "target": es2021"
            "strict": false,

***oRMcONFIG.TS***

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

***eNTITIES***

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

***mIGRATIONS-cATEGORIES.TS 26:55***

            import {MigrationInterface, QueryRunner, Table} from "typeorm";

            export class CreateCategories1640181264943 implements MigrationInterface {

                public async up(queryRunner: QueryRunner): Promise<void> {
                    await queryRunner.createTable(
                        new Table({
                            name:"categories",
                            columns:[
                                {
                                    name:"id",
                                    type:"uuid",
                                    isPrimary:true
                                },
                                {
                                    name:"name",
                                    type:"varchar",
                                    isUnique:true
                                },
                                {
                                    name:"description",
                                    type:"varchar",
                                },
                                {
                                    name:"created_at",
                                    type:"timestamp",
                                    default:"now()"
                                }
                            ]
                        })
                    )
                }

                public async down(queryRunner: QueryRunner): Promise<void> {
                    await queryRunner.dropTable("categories")
                }

            }

***mIGRATIONS-vIDEOS.TS 31:50***

            import {MigrationInterface, QueryRunner, Table} from "typeorm";

            export class CreateVideos1640182098935 implements MigrationInterface {

                public async up(queryRunner: QueryRunner): Promise<void> {
                    await queryRunner.createTable(
                        new Table({
                            name:"videos",
                            columns:[

                                {
                                    name:"id",
                                    type:"uuid",
                                    isPrimary:true
                                },
                                {
                                    name:"name",
                                    type:"varchar",
                                    isUnique:true
                                },
                                {
                                    name:"description",
                                    type:"varchar",
                                },

                                {
                                    name:"category_id",
                                    type:"uuid"
                                },

                                {
                                    name:"duration",
                                    type:"numeric"
                                },

                                {
                                    name:"created_at",
                                    type:"timestamp",
                                    default:"now()"
                                }
                            ],
                            foreignKeys:[
                                {
                                    name:"fk_videos_category",
                                    columnNames:["category_id"],
                                    referencedTableName:"categories",
                                    referencedColumnNames:["id"]
                                }
                            ]
                        })
                    )
                }

                public async down(queryRunner: QueryRunner): Promise<void> {
                    await queryRunner.dropTable("videos")
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
            import { routes } from "../router";

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

***cREATEcATEGORYsERVICE.TS***

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

            import { Request, Response } from "express";
            //import { CreateCategoryService } from "../services/CreateCategorySevice";
            import { CreateCategoryService } from "../services/CreateCategoryService";

            //CONFERIR ESTA PARTE ESTAVA COM ERROR

            export class CreateCategoryController {

                async handle(req: Request, res: Response) {

                    const { name, description } = req.body

                    //Validations
                    if (!name) {
                        res.status(422).json({ message: "Required name field!" })
                    }
                    if (!description) {
                        res.status(422).json({ message: "Required description field" })
                    }

                    const service = new CreateCategoryService()

                    const result = await service.execute({ name, description })

                    return res.json(result)
                }
            }

***rOUTES.TS***

        /***
        * [x] C - create - Post
        * [x] R - Read - Get
        * [x] U - Update - Put
        * [x] C - Delete - Delete 
        * 
        */
            import { Router } from "express";
            import { CreateCategoryController } from "./src/Controllers/CreateCategoryController";
            import { CreateVideoController } from "./src/Controllers/CreateVideoController";
            import { DeleteCategoryController } from "./src/Controllers/DelereCategoryController";
            import { GetAllCategoriesController } from "./src/Controllers/GetCategoryController";
            import { UpdateCategoryController } from "./src/Controllers/UpdateCategoryController";

            const routes = Router();

            routes.post("/categories", new CreateCategoryController().handle);
            routes.get("/categories", new GetAllCategoriesController().handle);
            routes.delete("/categories/:id", new DeleteCategoryController().handle)
            routes.put("/categories/:id", new UpdateCategoryController().handle);

            routes.post("/videos", new CreateVideoController().handle);

            export { routes };

***gETaLLcATEGORIAsERVICES.TS 54:00***

            import { getRepository } from "typeorm";
            import { Category } from "../entities/Category";

            export class GetAllCategoryesService {
                async execute() {
                    const repo = getRepository(Category);
                    const categoryes = await repo.find();

                    return categoryes;
                    }
                }

***gETaLLcATEGORIAcONTROLLER.TS 54:45***

            import { Request, Response } from 'express'
            import { GetAllCategoryesService } from '../services/GetAllCategoriesServices';

            export class GetAllCategoriesController {
                async handle(request: Request, response: Response) {
                    const service = new GetAllCategoryesService();

                    const categories = await service.execute();
                    
                    return response.json(categories);
                }
            }

***dELETcATEGORIAsERVICE.TS 57:40***

            import { getRepository  } from "typeorm";
            import { Category } from "../entities/Category";

            export class DeleteCategoryService {
                async execute(id: string) {
                    const repo = getRepository(Category);

                    if(!await repo.findOne) {
                        return new Error("Category does not exists")
                    }

                    await repo.delete(id);        
                }
            }

***dELETcATEGORIAcONTROLLER.TS 59:10***

            import { Request, Response } from "express";
            import { DeleteCategoryService } from "../services/DeleteCategoryService";

            export class DeleteCategoryController {
                async handle(request: Request, response: Response) {
                    const { id } = request.params;

                    const service = new DeleteCategoryService();

                    const result = await service.execute(id);

                    if (result instanceof Error) {
                        return response.status(400).json(result.message);
                    }

                    return response.status(204).end();
                }
            }

***uPDATEcATEGORIAsERVICE.TS 1:01:00***

            import { getRepository } from "typeorm";
            import { Category } from "../entities/Category";

            type CategoryUpdateRequest = {
                id: string;
                name: string;
                description: string;
            };

            export class UpdateCategoryService {
                async execute({ id, name, description }: CategoryUpdateRequest) {
                    const repo = getRepository(Category);

                    const category = await repo.findOne(id);

                    if (!category) {
                        return new Error("Category does not exists!");
                    }

                    category.name = name ? name : category.name;
                    category.description = description ? description : category.description;

                    await repo.save(category);

                    return category;
                }
            }

***uPDATEcATEGORYcONTROLLER.TS 1:05:00***

            import { Request, Response } from "express"
            import { UpdateCategoryService } from "../services/UpdateCategoryService"

            export class UpdateCategoryController {
                async handle(request: Request, response: Response) {
                    const { id } = request.params;
                    const { name, description } = request.body;

                    const service = new UpdateCategoryService();

                    const result = await service.execute({id, name, description });

                    if (result instanceof Error) {
                        return response.status(400).json(result.message);
                    }

                    return response.json(result);
                }
            }

***cREATEvIDEOsEREVICE.TS 1:11:00***

            import { getRepository} from "typeorm";
            import { Category } from "../entities/Category";
            import { Video } from "../entities/Video";

            type VideoRequest = {
                name: string;
                description: string;
                duration: number;
                category_id: string;
            };

            export class CreateVideoService {
                async execute({ name, description, duration, category_id }: VideoRequest): Promise<Error | Video > {
                    const repo = getRepository(Video);
                    const repoCategory = getRepository(Category);

                    if (!(await repoCategory.findOne(category_id))) {
                        return new Error("Category does not existis!");
                    }

                    const video = repo.create({ name, description, duration, category_id });

                    await repo.save(video);

                    return video;
                }
            }

***cREATEvIDEOcONTROLLER.TS 1:14:00***

            import { Request, Response  } from "express";
            import { CreateVideoService } from "../services/CreateVideoService";

            export class CreateVideoController {
                async handle(request: Request, response: Response) {
                    const { name, description, category_id, duration } = request.body:

                    const service = new CreateVideoService();

                    const result = await service.execute({
                        name,
                        description,
                        category_id,
                        duration,
                });

                if (result instanceof Error) {
                    return response.status(400).json(result.message);
                }

                return response.json(result);
            }
            }

---
.
.
.
_1:17:00 ... Continuar_