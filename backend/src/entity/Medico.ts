import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm"
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

    @Column({ type: "number"})
    especialidadeId: number

    @ManyToOne( () => Especialidade, (especialidade) => especialidade.medico )
    @JoinColumn({ name: "especialidadeId"})
    especialidade: Especialidade

    @OneToMany( () => SolicitacaoConsulta, (solicitacao) => solicitacao.medico)
    solicitacao: SolicitacaoConsulta[]

}