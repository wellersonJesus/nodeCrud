import { Router } from "express";
import { CreateCategoryController } from "./src/Controllers/CreateCategoryController";
import { DeleteCategoryController } from "./src/Controllers/DelereCategoryController";
import { GetAllCategoriesController } from "./src/Controllers/GetCategoryController";
import { UpdateCategoryController } from "./src/Controllers/UpdateCategoryController";

const routes = Router();

/***
 * [x] C - create - Post
 * [x] R - Read - Get
 * [x] U - Update - Put
 * [x] C - Delete - Delete 
 * 
 */

routes.post("/categories", new CreateCategoryController().handle);
routes.get("/categories", new GetAllCategoriesController().handle);
routes.delete("/categories/:id", new DeleteCategoryController().handle)
routes.put("/categories/:id", new UpdateCategoryController().handle);


export { routes };