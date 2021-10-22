import { Exclude, Expose } from "class-transformer";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Address from "./address.entity";

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

    // @OneToOne(() => Address, {eager: true}) // load Address by default
    @OneToOne(() => Address, {cascade: true})
    @JoinColumn()
    public address: Address;
}

export default User;