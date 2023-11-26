import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm"
import { SolicitacaoConsulta } from "./SolicitacaoConsulta"
import { AgendamentoConsulta } from "./AgendamentoConsulta"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    name: string
    
    @Column({ type: "date"})
    birthDay: Date
    
    @Column({ type: "varchar"})
    password: string
    
    @Column({ type: "varchar" })
    cardNumber: string 

    @Column({ type: "varchar" })
    sex: string
    
    @OneToMany( () => SolicitacaoConsulta, (solicitacao) => solicitacao.usuario)
    solicitacao: SolicitacaoConsulta[]

    @OneToMany( () => AgendamentoConsulta, ( agendamento) => agendamento.usuario)
    agendamentos: AgendamentoConsulta[]

    
}
