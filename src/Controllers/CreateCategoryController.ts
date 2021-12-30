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