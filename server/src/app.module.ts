import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './common/auth/jwt-auth.guard';
import { RolesGuard } from './common/auth/roles.guard';
import { assertProductionConfig, getBooleanConfig, isProduction } from './common/config/app-config';
import { DatabaseSeederService } from './database/database-seeder.service';
import { ENTITIES } from './database/entities';
import { AdminModule } from './modules/admin/admin.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AuthModule } from './modules/auth/auth.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { HealthModule } from './modules/health/health.module';
import { HomeModule } from './modules/home/home.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        assertProductionConfig(configService);
        const production = isProduction(configService);

        return {
          type: 'postgres',
          url:
            configService.get<string>('DATABASE_URL') ||
            configService.get<string>('ADMIN_DATABASE_URL') ||
            'postgresql://postgres@localhost:5432/viec3mien_admin',
          entities: ENTITIES,
          synchronize: !production && getBooleanConfig(configService, 'TYPEORM_SYNCHRONIZE', false),
          logging: getBooleanConfig(configService, 'TYPEORM_LOGGING', false)
        };
      }
    }),
    HealthModule,
    HomeModule,
    AuthModule,
    CompaniesModule,
    JobsModule,
    CandidatesModule,
    ApplicationsModule,
    AdminModule
  ],
  providers: [DatabaseSeederService, JwtAuthGuard, RolesGuard, Reflector]
})
export class AppModule {}
