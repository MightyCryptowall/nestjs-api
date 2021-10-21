import { Exclude, Expose } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn('uuid')
    @Exclude()
    public id: string;

    @Column({unique:true})
    @Expose()
    public email:string;

    @Column()
    @Expose()
    public name: string;

    @Column()
    @Exclude()
    public password: string;
}

export default User;