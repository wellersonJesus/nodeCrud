import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";



@Entity("videos")
export class Video {

    //MODELO DE REFERENCIA AO BANCO
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    category_id: string

    @ManyToOne(() => Category) //REFERENCIANDO TABELA DE RELAÇÃO 
    @JoinColumn({ name: "category_id" }) //REFERENCIANDO COLUNA DA TABELA ATUAL QUE IRA FAZER A RELAÇÃO
    category: Category //REFERENCIANDO COLUNA DA TABELA QUE ESTA SENDO FEITA A RELAÇÃO

    @Column()
    duration: number

    @CreateDateColumn()
    created_at: Date


    //CONSTRUTOR FEITO PARA INSERIR UM NOVO ID ALEATÓRIO EM CASO DE CADASTRO
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

}