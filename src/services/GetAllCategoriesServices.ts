import { getRepository } from "typeorm";
import { Category } from "../entities/Category";

export class GetAllCategoryesService {
    async execute() {
        const repo = getRepository(Category);
        const categoryes = await repo.find();

        return categoryes;
        }
    }