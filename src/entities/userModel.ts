import { Column, Entity, PrimaryGeneratedColumn, Check } from "typeorm";

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
    
}

export default Users;