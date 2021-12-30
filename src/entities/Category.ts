import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";


@Entity("categories")
export class Category{

    //MODELO DE REFERENCIA AO BANCO
    @PrimaryColumn()
    id:string

    @Column()
    name:string

    @Column()
    description:string

    @CreateDateColumn()
    created_at:Date


    //CONSTRUTOR FEITO PARA INSERIR UM NOVO ID ALEATÓRIO EM CASO DE CADASTRO
    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }

}

