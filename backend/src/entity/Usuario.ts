import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm"
import { TipoUsuario } from "./TipoUsuario"
import { SolicitacaoConsulta } from "./SolicitacaoConsulta"
import { AgendamentoConsulta } from "./AgendamentoConsulta"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    nome: string

    @Column({ type: 'integer' })
    tipoUsuarioId: number

    @ManyToOne(() => TipoUsuario, (tipo) => tipo.usuario)
    @JoinColumn({ name: "tipoUsuarioId"})
    tipoUsuario: TipoUsuario

    @OneToMany( () => SolicitacaoConsulta, (solicitacao) => solicitacao.usuario)
    solicitacao: SolicitacaoConsulta[]

    @OneToMany( () => AgendamentoConsulta, ( agendamento) => agendamento.usuario)
    agendamentos: AgendamentoConsulta[]

    
}
