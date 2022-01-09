import PrivateFilesService from './privateFiles.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import PrivateFile from './privateFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateFile]), ConfigModule],
  providers: [PrivateFilesService],
  exports: [PrivateFilesService],
})
export class PrivateFileModule {}
