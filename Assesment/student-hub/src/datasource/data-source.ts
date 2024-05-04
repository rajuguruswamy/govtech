import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'student_hub',
  synchronize: true,
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
};
export default new DataSource(dataSourceOptions);
