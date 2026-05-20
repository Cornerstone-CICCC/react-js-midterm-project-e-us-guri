import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import pool from '../src/config/db.js';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/run-migration.js <path-to-sql-file>');
  process.exit(1);
}

const sql = await readFile(resolve(file), 'utf8');
console.log(`Running ${file} ...`);

try {
  await pool.query(sql);
  console.log('OK');
} catch (err) {
  console.error('FAILED:', err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
