import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Especialidade } from "./Especialidade"
import { SolicitacaoConsulta } from "./SolicitacaoConsulta"


@Entity()
export class Medico {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    crm: string

    @Column('varchar')
    nome: string

    @ManyToOne( () => Especialidade, (especialidade) => especialidade.medico )
    especialidade: Especialidade

    @OneToMany( () => SolicitacaoConsulta, (solicitacao) => solicitacao.medico)
    solicitacao: SolicitacaoConsulta[]

}