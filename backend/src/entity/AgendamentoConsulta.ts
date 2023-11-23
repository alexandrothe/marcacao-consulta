import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm"
import { Usuario } from "./Usuario"
import { SolicitacaoConsulta } from "./SolicitacaoConsulta"



@Entity()
export class AgendamentoConsulta{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "integer" })
    usuarioId: number

    @Column({ type: "integer" })
    solicitacaoId: number

    @Column({ type: "date", nullable: false, default: () => "CURRENT_DATE"})
    dtAgendamento: Date
    
    @Column({ type: "time", nullable: false, default: () => "CURRENT_TIME" })
    hrAgendamento: string
    
    @OneToOne( () => SolicitacaoConsulta, ( solicitacao) => solicitacao.agendamento)
    @JoinColumn({ name: "solicitacaoId" })
    solicitacao: SolicitacaoConsulta

    @ManyToOne( () => Usuario, (user) => user.agendamentos)
    @JoinColumn({ name: "usuarioId" })
    usuario: Usuario
}