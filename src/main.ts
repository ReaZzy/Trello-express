import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as YAML from 'yamljs';
import * as path from 'path';
import { createAdmin } from './createAdmin';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  let app;
  const isFastify = process.env.USE_FASTIFY === 'true';
  if (isFastify) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    app = await NestFactory.create(AppModule, {
      logger: true,
    });
  }

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);
  await createAdmin();
  await app.listen(process.env.PORT || 4000, isFastify ? '0.0.0.0' : undefined);
  console.log(' App is running 🚀\n', `http://localhost:${process.env.PORT}`);
}
bootstrap();
