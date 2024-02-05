import { load } from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';
const YAML_CONFIG_FILENAME = 'config.yml';

const config = load(
  readFileSync(join(__dirname, 'src', YAML_CONFIG_FILENAME), 'utf8'),
);

/**
 * @type { import("knex").Knex.Config }
 */

export default {
  ...config['database'],

  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/migrations',
  },
  seeds: {
    directory: './src/seeds',
  },
};
