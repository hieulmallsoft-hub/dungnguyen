import { ConfigService } from '@nestjs/config';

export function isProduction(configService: ConfigService) {
  return configService.get<string>('NODE_ENV') === 'production';
}

export function getBooleanConfig(configService: ConfigService, key: string, defaultValue = false) {
  const rawValue = configService.get<string>(key);
  if (rawValue === undefined || rawValue === null || rawValue === '') {
    return defaultValue;
  }

  return ['1', 'true', 'yes', 'on'].includes(String(rawValue).trim().toLowerCase());
}

export function assertProductionConfig(configService: ConfigService) {
  if (!isProduction(configService)) {
    return;
  }

  const requiredKeys = ['DATABASE_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
  const missingKeys = requiredKeys.filter((key) => !configService.get<string>(key)?.trim());

  if (missingKeys.length) {
    throw new Error(`Missing required production environment variables: ${missingKeys.join(', ')}`);
  }
}

export function getJwtSecret(configService: ConfigService, key: 'JWT_ACCESS_SECRET' | 'JWT_REFRESH_SECRET') {
  const value = configService.get<string>(key)?.trim();
  if (value) {
    return value;
  }

  if (isProduction(configService)) {
    throw new Error(`Missing required production environment variable: ${key}`);
  }

  return key === 'JWT_ACCESS_SECRET' ? 'dev-only-access-secret' : 'dev-only-refresh-secret';
}
