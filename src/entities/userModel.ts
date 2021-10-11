import { Column, Entity, PrimaryGeneratedColumn, Check, OneToMany, CreateDateColumn } from "typeorm";
import Quotes from "./quotesModel";

@Entity({name : 'users'})
@Check('LENGTH("username") > 7')
@Check('LENGTH("password") > 7')
class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    data: Date;
    
    @OneToMany(() => Quotes, quotes => quotes.user_id)
    quotes: Quotes[];
}

export default Users;