import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({unique:true})
    public email:string;

    @Column()
    public name: string;

    @Column()
    public password: string;
}

export default User;