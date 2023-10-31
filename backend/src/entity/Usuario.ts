import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"
import { TipoUsuario } from "./TipoUsuario"
import { AgendamentoConsulta } from "./AgendamentoConsulta"
import { SolicitacaoConsulta } from "./SolicitacaoConsulta"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @ManyToOne(() => TipoUsuario, (tipo) => tipo.usuario )
    tipoUsuario: TipoUsuario

    @OneToMany( () => SolicitacaoConsulta, (solicitacao) => solicitacao.usuario)
    solicitacao: SolicitacaoConsulta[]
    
}
