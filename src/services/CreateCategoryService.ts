import { getRepository } from "typeorm";
import { Category } from "../entities/Category";



type CategoryRequest = {
    name: string
    description: string
}

export class CreateCategoryService {

    async execute({ name, description }: CategoryRequest): Promise<Category | Error> {


        const repo = getRepository(Category) //INSTANCIAR METODOS DO GETREPOSITORY

        //VERIFICAR SE EXISTE ALGUM DADO JÁ CADASTRADO COMO MESMO NOME
        if (await repo.findOne({ name })) {
            return new Error("Category already exists")
        }

        //CRIAR UM NOVO OBJETO CATEGORY
        const category = repo.create({
            name,
            description
        })

        //SALVAR NOVA CATEGORIA NO BANCO
        await repo.save(category)

        return category

    }
}