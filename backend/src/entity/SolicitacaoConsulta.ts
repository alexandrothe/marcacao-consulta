import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,  } from "typeorm"
import { Usuario } from "./Usuario"
import { Medico } from "./Medico"
import { Especialidade } from "./Especialidade"



@Entity()
export class SolicitacaoConsulta{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date" })
    dtSolicitacao: Date

    @Column({ type: "time" })
    hrSolicitacao: string

    @ManyToOne(() => Usuario, (user) => user.solicitacao)
    usuario: Usuario

    @ManyToOne(() => Medico, (medico) => medico.solicitacao)
    medico: Medico

    @ManyToOne( () => Especialidade, (especialidade) => especialidade.solicitacao)
    especialidade: Especialidade
}