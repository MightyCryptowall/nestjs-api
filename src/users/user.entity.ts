import { Exclude, Expose } from "class-transformer";
import Post from "../posts/post.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Address from "./address.entity";
import PublicFile from "src/files/publicFile.entity";
import PrivateFile from "src/privateFiles/privateFile.entity";

@Entity()
class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({unique:true})
    @Expose()
    public email:string;

    @Column()
    @Expose()
    public name: string;

    @Column()
    @Exclude({toPlainOnly: true})
    public password: string;

    // @OneToOne(() => Address, {eager: true}) // load Address by default
    @OneToOne(() => Address, {eager: true, cascade: true}) // enabling cascade property allow current entity to create the object for another properly in relationship 
    @JoinColumn()
    public address: Address;

    @OneToMany(() => Post, (post: Post) => post.author)
    public posts?: Post[];

    @JoinColumn()
    @OneToOne(
        () => PublicFile,
        {
            eager: true,
            nullable: true
        }
    )
    public avatar?: PublicFile;

    @OneToMany(
        () => PrivateFile,
        (file: PrivateFile) => file.owner
    )
    public files: PrivateFile[];
}

export default User;