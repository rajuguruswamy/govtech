import * as dotenv from 'dotenv';
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('NODE_PORT', true);
  }

  public getEnvironment() {
    return this.getValue('NODE_ENV', true);
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != 'DEV';
  }

  public getHost() {
    return this.getValue('DATABASE_HOSTNAME', true);
  }

  public getDbPort() {
    return this.getValue('DATABASE_PORT', true);
  }
  public getDbUserName() {
    return this.getValue('DATABASE_USERNAME', true);
  }
  public getDbPassword() {
    return this.getValue('DATABASE_PASSWORD', true);
  }
  public getDbName() {
    return this.getValue('DATABASE_NAME', true);
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_HOSTNAME',
  'DATABASE_PORT',
  'DATABASE_USERNAME',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
]);

export { configService };
