import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as YAML from 'yamljs';
import * as path from 'path';
import { createAdmin } from './createAdmin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);
  await createAdmin();
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
