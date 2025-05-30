import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const connectionString =
          configService.getOrThrow<string>('NEON_DATABASE_URL');

        return {
          type: 'postgres',
          url: connectionString,
          autoLoadEntities: true,
          synchronize: configService.getOrThrow<boolean>('DB_SYNC', true),
          logging: configService.getOrThrow<boolean>('DB_LOGGING', false),
          migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
