import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"



@Entity()
export class AgendamentoConsulta{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "date" })
    dtConsulta: Date

    @Column({ type: "time" })
    hrConsulta: string

    @Column({ type: "date" })
    dtAgendamento: Date

    @Column({ type: "time" })
    hrAgendamento: string
}