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

    @Column({ type: "date", nullable: false})
    dtAgendamento: Date
    
    @OneToOne( () => SolicitacaoConsulta, ( solicitacao) => solicitacao.agendamento, { onDelete: "CASCADE"})
    @JoinColumn({ name: "solicitacaoId" })
    solicitacao: SolicitacaoConsulta

    @ManyToOne( () => Usuario, (user) => user.agendamentos, { onDelete: "CASCADE"})
    @JoinColumn({ name: "usuarioId" })
    usuario: Usuario
}