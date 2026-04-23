import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';
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

function parsePostgresUrl(urlString: string) {
  try {
    const url = new URL(urlString);
    if (url.protocol !== 'postgres:' && url.protocol !== 'postgresql:') {
      return { url: urlString };
    }

    const database = url.pathname?.replace(/^\//, '') || undefined;
    const port = url.port ? Number(url.port) : undefined;

    return {
      host: url.hostname || 'localhost',
      port: Number.isFinite(port) ? port : 5432,
      username: url.username ? decodeURIComponent(url.username) : 'postgres',
      password: decodeURIComponent(url.password ?? ''),
      database
    };
  } catch {
    return { url: urlString };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Load env from this package root (works even when started from a monorepo root cwd).
      envFilePath: [path.resolve(__dirname, '..', '.env'), path.resolve(__dirname, '..', '.env.local')]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        assertProductionConfig(configService);
        const production = isProduction(configService);

        const databaseUrl = configService.get<string>('DATABASE_URL') || configService.get<string>('ADMIN_DATABASE_URL');
        const dbType = (configService.get<string>('DB_TYPE') || '').trim().toLowerCase();

        const parsed = databaseUrl
          ? parsePostgresUrl(databaseUrl)
          : dbType === 'postgres' || dbType === 'postgresql'
            ? {
                host: configService.get<string>('DB_HOST') || 'localhost',
                port: Number(configService.get<string>('DB_PORT') || 5432),
                username: configService.get<string>('DB_USERNAME') || 'postgres',
                password: configService.get<string>('DB_PASSWORD') || '',
                database: configService.get<string>('DB_DATABASE') || 'viec3mien_admin'
              }
            : parsePostgresUrl('postgresql://postgres@localhost:5432/viec3mien_admin');

        const passwordFromEnv = (
          configService.get<string>('DATABASE_PASSWORD') ||
          configService.get<string>('POSTGRES_PASSWORD') ||
          configService.get<string>('PGPASSWORD') ||
          configService.get<string>('DB_PASSWORD')
        );

        const parsedPassword = 'password' in parsed ? parsed.password : undefined;

        // pg's ConnectionParameters treats empty-string passwords as "missing" (falsy),
        // which triggers "client password must be a string" during SCRAM auth.
        const resolvedPassword =
          typeof parsedPassword === 'string' && parsedPassword.length > 0
            ? parsedPassword
            : typeof passwordFromEnv === 'string' && passwordFromEnv.length > 0
              ? passwordFromEnv
              : production
                ? undefined
                : '__MISSING_DB_PASSWORD__';

        if (production && !resolvedPassword) {
          throw new Error(
            "DATABASE_URL is missing a password. Set DATABASE_URL like 'postgresql://user:pass@host:5432/db' or set DATABASE_PASSWORD."
          );
        }

        return {
          type: 'postgres',
          ...parsed,
          ...(resolvedPassword !== undefined ? { password: resolvedPassword } : {}),
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
