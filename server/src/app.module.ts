import { Module } from '@nestjs/common';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<ServeStaticModuleOptions[]> => {
        const logger = new Logger('AppModule');
        const buildPath = configService.get<string>('REACT_APP_BUILD_PATH');
        logger.log(`REACT_APP_BUILD_PATH: ${buildPath}`);

        const clientAppPath = join(
          __dirname,
          configService.get<string>('REACT_APP_BUILD_PATH'),
        );
        logger.log(`serving front-end at: ${clientAppPath}`);

        return [
          {
            rootPath: clientAppPath,
          },
        ];
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
