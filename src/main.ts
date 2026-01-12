import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtener ConfigService para acceder a variables de entorno
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Emmott Asset Platform API')
    .setDescription('The Emmott Asset Platform API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
