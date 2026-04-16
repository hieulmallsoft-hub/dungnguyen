import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serverRoot = resolve(__dirname, '..');
const distEntry = resolve(serverRoot, 'dist', 'main.js');
const tscBin = resolve(serverRoot, 'node_modules', 'typescript', 'bin', 'tsc');

let appProcess = null;
let compilerBuffer = '';
let restartTimer = null;
let restartInFlight = false;
let restartQueued = false;
let isShuttingDown = false;

function killProcess(child) {
  if (!child || child.exitCode !== null) {
    return;
  }

  child.kill();
}

function stopAppProcess() {
  if (!appProcess || appProcess.exitCode !== null) {
    appProcess = null;
    return Promise.resolve();
  }

  const child = appProcess;

  return new Promise((resolvePromise) => {
    const handleExit = () => {
      if (appProcess === child) {
        appProcess = null;
      }
      resolvePromise();
    };

    child.once('exit', handleExit);
    child.kill();
  });
}

async function restartApp() {
  if (isShuttingDown || !existsSync(distEntry)) {
    return;
  }

  if (restartInFlight) {
    restartQueued = true;
    return;
  }

  restartInFlight = true;

  try {
    await stopAppProcess();

    if (isShuttingDown || !existsSync(distEntry)) {
      return;
    }

    const child = spawn(process.execPath, [distEntry], {
      cwd: serverRoot,
      stdio: 'inherit'
    });

    appProcess = child;

    child.on('exit', () => {
      if (appProcess === child) {
        appProcess = null;
      }
    });
  } finally {
    restartInFlight = false;

    if (restartQueued && !isShuttingDown) {
      restartQueued = false;
      void restartApp();
    }
  }
}

function scheduleRestart() {
  if (isShuttingDown) {
    return;
  }

  if (restartTimer) {
    clearTimeout(restartTimer);
  }

  restartTimer = setTimeout(() => {
    restartTimer = null;
    void restartApp();
  }, 250);
}

function handleCompilerLine(line) {
  if (/Found 0 errors\./.test(line)) {
    scheduleRestart();
  }
}

const compiler = spawn(
  process.execPath,
  [tscBin, '-p', 'tsconfig.build.json', '--watch', '--preserveWatchOutput', '--pretty', 'false'],
  {
    cwd: serverRoot,
    stdio: ['inherit', 'pipe', 'pipe']
  }
);

compiler.stdout.setEncoding('utf8');
compiler.stderr.setEncoding('utf8');

compiler.stdout.on('data', (chunk) => {
  process.stdout.write(chunk);
  compilerBuffer += chunk;

  let newlineIndex = compilerBuffer.indexOf('\n');
  while (newlineIndex >= 0) {
    const line = compilerBuffer.slice(0, newlineIndex).replace(/\r$/, '');
    compilerBuffer = compilerBuffer.slice(newlineIndex + 1);
    handleCompilerLine(line);
    newlineIndex = compilerBuffer.indexOf('\n');
  }
});

compiler.stderr.on('data', (chunk) => {
  process.stderr.write(chunk);
});

compiler.on('exit', (code) => {
  if (isShuttingDown) {
    return;
  }

  console.error(`TypeScript watch exited with code ${code ?? 'unknown'}.`);
  killProcess(appProcess);
  process.exit(code ?? 1);
});

function shutdown(signal) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  if (restartTimer) {
    clearTimeout(restartTimer);
    restartTimer = null;
  }

  killProcess(appProcess);
  killProcess(compiler);

  if (signal) {
    process.exit(0);
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('exit', () => shutdown());
