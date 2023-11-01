import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Usuario } from "./Usuario"

@Entity()
export class TipoUsuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    nome: string

    @OneToMany(() => Usuario, (user) => user.tipoUsuario)
    usuario: Usuario[]

}
