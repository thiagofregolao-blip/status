#!/usr/bin/env node
/*
 * Wraps any command with APP_DATABASE_URL derived from DATABASE_URL.
 * Usage: node scripts/with-app-db-url.js <cmd> [args...]
 */

const { spawn } = require('node:child_process');

function resolveAppDbUrl() {
  if (process.env.APP_DATABASE_URL) return process.env.APP_DATABASE_URL;
  const base = process.env.DATABASE_URL;
  if (!base) return null; // let the child command decide whether missing URL is a problem
  try {
    const u = new URL(base);
    if (!u.searchParams.get('schema')) u.searchParams.set('schema', 'status');
    return u.toString();
  } catch {
    return null;
  }
}

const [, , cmd, ...args] = process.argv;
if (!cmd) {
  console.error('[with-app-db-url] missing command');
  process.exit(1);
}

const resolved = resolveAppDbUrl();
const env = { ...process.env };
if (resolved) env.APP_DATABASE_URL = resolved;

// Use direct exec for `node`, npx for everything else (so tools from
// node_modules/.bin resolve without being on PATH).
const runner = cmd === 'node' ? 'node' : 'npx';
const runnerArgs = cmd === 'node' ? args : [cmd, ...args];

const p = spawn(runner, runnerArgs, { stdio: 'inherit', env });
p.on('exit', (code) => process.exit(code ?? 1));
p.on('error', (e) => {
  console.error('[with-app-db-url]', e.message);
  process.exit(1);
});
