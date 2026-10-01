import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.setGlobalPrefix('api');

    const port = process.env.PORT || 3000;
    await app.listen(port);

    logger.log(`Application is running on: http://localhost:${port}/api`);

    process.on('SIGTERM', async () => {
      logger.log('SIGTERM signal received, shutting down gracefully');
      await app.close();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.log('SIGINT signal received, shutting down gracefully');
      await app.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Failed to start application', error);
    process.exit(1);
  }
}

export { bootstrap };
bootstrap();
