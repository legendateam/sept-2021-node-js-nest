import { config } from 'dotenv';

config();

export const mainConfig = {
  PORT: process.env.PORT || 2500,
  SECRET_KEY_ACCESS_TOKEN:
    process.env.SECRET_KEY_ACCESS_TOKEN || 'secret_access',
  SECRET_KEY_REFRESH_TOKEN:
    process.env.SECRET_KEY_REFRESH_TOKEN || 'secret_refresh',
  EXPIRES_ACCESS_TOKEN: process.env.EXPIRES_ACCESS_TOKEN || '1h',
  EXPIRES_REFRESH_TOKEN: process.env.EXPIRES_REFRESH_TOKEN || '8h',
  BCRYPT_SALT: process.env.BCRYPT_SALT || 5,
  S3_NAME: process.env.S3_NAME,
  S3_REGION: process.env.S3_REGION,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
};
