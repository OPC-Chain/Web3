import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // const config = new DocumentBuilder()
  //   .setTitle('Marvel')
  //   .setDescription('Marvel Mock API')
  //   .setVersion('1.0')
  //   .addTag('marvel')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document);
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT', '4000');
  await app.listen(PORT, '0.0.0.0');
  Logger.log(`App running on ${await app.getUrl()}`, 'START');
}
bootstrap();
