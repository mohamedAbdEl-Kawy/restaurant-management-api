
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('Restuarant Management API')
    .setDescription('Simple resturant management API')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`server started at localhost:${process.env.PORT}`);
}
bootstrap();

