import { DataSourceOptions } from 'typeorm';
import { configService } from '../config/config.service';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getHost(),
  port: +configService.getDbPort(),
  username: configService.getDbUserName(),
  password: configService.getDbPassword(),
  database: configService.getDbName(),
  synchronize: configService.getEnvironment() == 'DEV' ? true : false,
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
};
