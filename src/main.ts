import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { mainConfig } from './configs';

async function bootstrap() {
  const PORT = mainConfig.PORT;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My Home Work')
    .setDescription('Home Work API')
    .setVersion('0.1')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server is running on PORT:${PORT}`),
  );
}
bootstrap();
