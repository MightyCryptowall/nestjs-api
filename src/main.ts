import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';
import { ConfigService } from '@nestjs/config';
import { config } from "aws-sdk";
// import { ValidationPipe } from './utils/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 

  // adding ClassSerializerInterceptor globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );
  
  app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());

  // ExceptionsLoggerFilter which is the modify version of BaseExceptionFilter
  // ExceptionsLoggerFilter is globally used by declaring through app.useGlobalFilters 
  // const {httpAdapter} = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  })

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
