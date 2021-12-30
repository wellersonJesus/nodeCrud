import { Request, Response } from 'express'
import { GetAllCategoryesService } from '../services/GetAllCategoriesServices';

export class GetAllCategoriesController {
    async handle(request: Request, response: Response) {
        const service = new GetAllCategoryesService();

        const categories = await service.execute();
        
        return response.json(categories);
    }
}