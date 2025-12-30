/**
 * Simple in-memory logger for debugging production issues
 */

interface LogEntry {
  timestamp: string;
  level: 'info' | 'error' | 'warn';
  category: string;
  message: string;
  data?: any;
}

class SimpleLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 100; // Keep last 100 logs

  log(level: 'info' | 'error' | 'warn', category: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data
    };
    
    this.logs.push(entry);
    
    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
    
    // Also log to console
    const logData = data ? ` | ${JSON.stringify(data)}` : '';
    console.log(`[${level.toUpperCase()}] [${category}] ${message}${logData}`);
  }

  info(category: string, message: string, data?: any) {
    this.log('info', category, message, data);
  }

  error(category: string, message: string, data?: any) {
    this.log('error', category, message, data);
  }

  warn(category: string, message: string, data?: any) {
    this.log('warn', category, message, data);
  }

  getLogs(limit?: number, category?: string) {
    let filtered = this.logs;
    
    if (category) {
      filtered = filtered.filter(log => log.category === category);
    }
    
    if (limit) {
      filtered = filtered.slice(-limit);
    }
    
    return filtered;
  }

  clear() {
    this.logs = [];
  }
}

export const logger = new SimpleLogger();
