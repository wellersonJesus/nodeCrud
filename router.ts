import { Router } from "express";
import { CreateCategoryController } from "./src/Controllers/CreateCategoryController";

const routes = Router();

routes.post("/categories", new CreateCategoryController().handle);

export { routes };