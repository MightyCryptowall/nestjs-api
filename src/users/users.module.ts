import { PrivateFileModule } from './../privateFiles/privateFiles.module';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]), FilesModule, PrivateFileModule],
    controllers:[UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
