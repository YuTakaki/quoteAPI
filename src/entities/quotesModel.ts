import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Users from "./userModel";

@Entity({name: 'quotes'})
class Quotes{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    quote: string;

    @CreateDateColumn()
    date: Date;

    @Column({name: 'user_id'})
    user_id: string

    @ManyToOne(() => Users, users => users.quotes)
    @JoinColumn({name: 'user_id'})
    user: string
}

export default Quotes;