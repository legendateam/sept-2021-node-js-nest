import { config } from 'dotenv';

config();

export const mainConfig = {
  PORT: process.env.PORT || 2500,
};
