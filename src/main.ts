import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { mainConfig } from './configs';

async function bootstrap() {
  const PORT = mainConfig.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(`Server is running on PORT:${PORT}`),
  );
}
bootstrap();
