import User from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PrivateFile {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public key: string;

  @ManyToOne(() => User, (owner: User) => owner.files)
  public owner: User;
}

export default PrivateFile;
