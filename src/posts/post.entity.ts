import User from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class Post{
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @Column({ nullable: true })
    // @Transform(({value}) => {
    //     if (value !== null) {
    //       return value;
    //     }
    //   })
    public category?: string;
    
    @ManyToOne(() => User, (author: User) => author.posts)
    public author: User;

}

export default Post;