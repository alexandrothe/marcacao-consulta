import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm"
import { Medico } from "./Medico"
import { SolicitacaoConsulta } from "./SolicitacaoConsulta"


@Entity()
export class Especialidade{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @OneToMany( () => Medico, (medico) => medico.especialidade)
    medico: Medico[]

    @OneToMany( () => SolicitacaoConsulta, (solicitacao) => solicitacao.especialidade)
    solicitacao: SolicitacaoConsulta[]
}

