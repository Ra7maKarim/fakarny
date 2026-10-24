import { describe, expect, it } from 'vitest';
import { parseDatabaseConfig } from '../../src/config/database.js';

describe('parseDatabaseConfig', () => {
  it('applies the default host and port', () => {
    const config = parseDatabaseConfig({
      DB_USERNAME: 'mysafe',
      DB_PASSWORD: 'local-only',
      DB_NAME: 'mysafe_test',
    });

    expect(config).toMatchObject({ DB_HOST: 'localhost', DB_PORT: 5432 });
  });

  it('rejects missing credentials and out-of-range ports', () => {
    expect(() => parseDatabaseConfig({
      DB_USERNAME: 'mysafe',
      DB_NAME: 'mysafe_test',
      DB_PORT: '70000',
    })).toThrow('Invalid database configuration');
  });
});
