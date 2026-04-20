#!/usr/bin/env node
/* eslint-disable no-console */
/*
 * Start script for Railway (and anywhere else).
 *
 * Prisma's schema.prisma references env("APP_DATABASE_URL"). On Railway
 * the Postgres plugin auto-injects DATABASE_URL instead. To isolate our
 * tables from other projects that may share the same Postgres, we derive
 * APP_DATABASE_URL = DATABASE_URL + ?schema=status here, then chain:
 *   prisma db push --skip-generate  (sync schema)
 *   next start                       (serve the app)
 *
 * If APP_DATABASE_URL is already set explicitly, we honor it as-is.
 */

const { spawn } = require('node:child_process');

function die(msg) {
  console.error(`[start] ${msg}`);
  process.exit(1);
}

function resolveAppDbUrl() {
  if (process.env.APP_DATABASE_URL) return process.env.APP_DATABASE_URL;

  const base = process.env.DATABASE_URL;
  if (!base) {
    die('Neither APP_DATABASE_URL nor DATABASE_URL is set. Link a Postgres plugin in Railway.');
  }

  try {
    const u = new URL(base);
    if (!u.searchParams.get('schema')) u.searchParams.set('schema', 'status');
    return u.toString();
  } catch (e) {
    die(`DATABASE_URL is not a valid URL: ${e.message}`);
  }
}

function run(cmd, args, env) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', env });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
    p.on('error', reject);
  });
}

async function main() {
  const APP_DATABASE_URL = resolveAppDbUrl();
  const env = { ...process.env, APP_DATABASE_URL };

  console.log('[start] syncing database schema (prisma db push)...');
  await run('npx', ['prisma', 'db', 'push', '--skip-generate'], env);

  console.log('[start] starting Next.js...');
  await run('npx', ['next', 'start'], env);
}

main().catch((e) => {
  console.error('[start] failed:', e.message);
  process.exit(1);
});
