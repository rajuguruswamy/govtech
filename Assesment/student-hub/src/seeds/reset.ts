import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../datasource/data-source';

const dataSource = new DataSource(dataSourceOptions);

async function connect() {
  try {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await dataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error connecting to database', error);
  }
}

async function disconnect() {
  try {
    await dataSource.destroy();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.log('Error when disconnecting from database', error);
  }
}

async function truncate() {
  await dataSource.manager.query(
    'TRUNCATE TABLE teacher_student CASCADE; TRUNCATE TABLE teacher CASCADE; TRUNCATE TABLE student CASCADE;',
  );

  await dataSource.manager.query(
    'ALTER SEQUENCE teacher_id_seq RESTART WITH 1',
  );

  await dataSource.manager.query(
    'ALTER SEQUENCE student_id_seq RESTART WITH 1',
  );
}

async function runReset() {
  await connect();
  console.log('database connected!');
  await truncate();
  console.log('reset done!');
  await disconnect();
  console.log('database disconnected!');
}

runReset();
