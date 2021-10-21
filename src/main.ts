import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // adding ClassSerializerInterceptor globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );
  
  app.useGlobalInterceptors(new ExcludeNullInterceptor());

  // app.useGlobalInterceptors(new ExcludeNullInterceptor());

  // ExceptionsLoggerFilter which is the modify version of BaseExceptionFilter
  // ExceptionsLoggerFilter is globally used by declaring through app.useGlobalFilters 
  // const {httpAdapter} = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
