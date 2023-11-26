import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { Especialidade } from "./Especialidade"
import { SolicitacaoConsulta } from "./SolicitacaoConsulta"


@Entity()
export class Medico {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date" })
    birthDay: Date

    @Column('varchar')
    crmCode: string

    @Column('varchar')
    name: string

    @Column({ type: "varchar"})
    password: string

    @Column({ type: "varchar"})
    sex: string

    @Column({ type: "number"})
    especialidadeId: number

    @ManyToOne( () => Especialidade, (especialidade) => especialidade.medico )
    @JoinColumn({ name: "especialidadeId"})
    especialidade: Especialidade

    @OneToMany( () => SolicitacaoConsulta, (solicitacao) => solicitacao.medico)
    solicitacao: SolicitacaoConsulta[]

}