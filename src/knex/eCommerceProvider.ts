import { Logger, Provider } from '@nestjs/common';
import { DEFAULT_KNEX_TOKEN } from './constant';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

export const EcommerceProvider: Provider = {
  provide: DEFAULT_KNEX_TOKEN,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const logger = new Logger('KnexProvider');

    const instance = knex({
      ...(config.getOrThrow('database') as Knex.Config),

      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: 'src/migrations',
      },
      seeds: {
        directory: 'src/seeds',
      },
      log: {
        debug: (m) => logger.debug(m),
        error: (m) => logger.error(m),
        warn: (m) => logger.warn(m),
      },
    });

    try {
      await instance.raw('select 1+1 as result');
      logger.log('Local Database successfully connected');
      return instance;
    } catch (error) {
      logger.error('error', error);
      process.exit(1);
    }
  },
};
