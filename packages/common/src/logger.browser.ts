export enum Env {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export type Level = 'debug' | 'error' | 'info' | 'log' | 'warn' | 'security';

export const NODE_ENV: Env =
    (typeof process !== 'undefined' && (process.env?.NODE_ENV as Env)) ||
    Env.Development;

// Browser-friendly level "styles" using CSS in console
const LEVEL_CSS: Record<Level, string> = {
  debug    : 'color: #16a34a; font-weight: 600;',
  error    : 'color: #ef4444; font-weight: 600;',
  info     : 'color: #3b82f6; font-weight: 600;',
  log      : 'color: #6b7280;',
  warn     : 'color: #eab308; font-weight: 600;',
  security : 'color: #a855f7; font-weight: 700;',
};

const LOG_LEVELS: Record<Env, Level[]> = {
  development : ['debug', 'info', 'log', 'warn', 'security'],
  test        : ['log', 'info', 'error'],
  production  : ['error'],
};

const LEVEL_METHODS: Record<Level, keyof Console> = {
  debug    : 'debug',
  error    : 'error',
  info     : 'info',
  log      : 'log',
  warn     : 'warn',
  security : 'warn',
};

export class Logger {
  private levels: Level[];
  private namespace?: string;

  constructor(namespace?: string) {
    this.levels = LOG_LEVELS[NODE_ENV] || [];
    this.namespace = namespace ?? 'did-btc1-js';
  }

  private _log(level: Level, message?: unknown, ...args: unknown[]) {
    if (!this.levels.includes(level)) return;

    const ts = new Date().toISOString();
    const ns = this.namespace ? `[${this.namespace}]` : '';
    const method = LEVEL_METHODS[level];

    // %c applies CSS to the next string token
    (console[method] as (...a: any[]) => void)(
      '%c' + ts + '%c ' + ns + ' ' + level + ':%c ' + String(message ?? ''),
      'color:#9ca3af;',           // timestamp (gray)
      'color:#9ca3af;',           // namespace (same gray)
      LEVEL_CSS[level],
      ...args,
    );
  }

  public debug(m?: unknown, ...a: unknown[]) { this._log('debug', m, ...a); return this; }
  public error(m?: unknown, ...a: unknown[]) { this._log('error', m, ...a); return this; }
  public info(m?: unknown, ...a: unknown[]) { this._log('info', m, ...a); return this; }
  public warn(m?: unknown, ...a: unknown[]) { this._log('warn', m, ...a); return this; }
  public security(m?: unknown, ...a: unknown[]) { this._log('security', m, ...a); return this; }
  public log(m?: unknown, ...a: unknown[]) { this._log('log', m, ...a); return this; }
  public newline() { console.log(); return this; }

  // Static convenience API
  public static debug(m?: unknown, ...a: unknown[]) { new Logger().debug(m, ...a); }
  public static error(m?: unknown, ...a: unknown[]) { new Logger().error(m, ...a); }
  public static info(m?: unknown, ...a: unknown[]) { new Logger().info(m, ...a); }
  public static warn(m?: unknown, ...a: unknown[]) { new Logger().warn(m, ...a); }
  public static security(m?: unknown, ...a: unknown[]) { new Logger().security(m, ...a); }
  public static log(m?: unknown, ...a: unknown[]) { new Logger().log(m, ...a); }
  public static newline() { new Logger().newline(); }

  // Keep signature but avoid Node 'path' – do a lightweight parse
  // (unused by default; safe if you later enable it)
  private static getCallerLocation(): string {
    const stack = new Error().stack?.split('\n');
    const line = stack?.[3] || stack?.[2] || '';
    const match = line.match(/\((.*):(\d+):(\d+)\)/) || line.match(/at (.*):(\d+):(\d+)/);
    if (!match) return '';
    const file = (match[1] || '').split(/[\\/]/).pop() || '';
    return `${file}:${match[2]}`;
  }
}
