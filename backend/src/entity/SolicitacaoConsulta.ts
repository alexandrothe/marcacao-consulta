import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne,  } from "typeorm"
import { Usuario } from "./Usuario"
import { Medico } from "./Medico"
import { Especialidade } from "./Especialidade"
import { AgendamentoConsulta } from "./AgendamentoConsulta"



@Entity()
export class SolicitacaoConsulta{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date", nullable:false, default: () => "CURRENT_DATE"  })
    dtSolicitacao: Date

    @Column({ type: "integer"})
    usuarioId: number

    @Column({ type: "integer"})
    medicoId: number

    @Column({ type: "integer"})
    especialidadeId: number

    @Column({ type: "varchar"})
    description: string

    @ManyToOne(() => Usuario, (user) => user.solicitacao)
    usuario: Usuario

    @ManyToOne(() => Medico, (medico) => medico.solicitacao)
    medico: Medico

    @ManyToOne( () => Especialidade, (especialidade) => especialidade.solicitacao)
    especialidade: Especialidade

    @OneToOne( () => AgendamentoConsulta, (agendamento) => agendamento.solicitacao)
    agendamento: AgendamentoConsulta
}