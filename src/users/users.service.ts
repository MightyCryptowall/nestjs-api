import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly filesService: FilesService
    ){}

    async getByEmail(email:string) {
        const user =await this.usersRepository.findOne({email});
        if (user) return user;
        throw new HttpException("User with this email does not exist", HttpStatus.NOT_FOUND);
    }

    async create(userData: CreateUserDto) {
        const newUser = await this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    async getById(id: string) {
        const user = await this.usersRepository.findOne(id); //findOne({ id });
        if (user) {
          return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async addAvator(userId: string, imageBuffer: Buffer, filename: string) {
        const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
        const user = await this.getById(userId);

        await this.usersRepository.update(userId, {
            ...user,
            avatar
        });

        return avatar;

    }
}
