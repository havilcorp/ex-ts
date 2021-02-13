import * as c from "colors/safe";

export default class Logger {
  /**
   * @description Log request data (blue)
   */
  static request(...data: any): void {
    console.log(c.bold(c.blue("▼ Request:")), ...data, c.bold(c.blue("⊙")));
  }
  static log(...data: any): void {
    console.log(c.bold(c.cyan("Log:")), ...data, c.bold(c.cyan("⊙")));
  }

  static success(...data: any): void {
    console.log(c.bold(c.green("✔ Success:")), ...data, c.bold(c.green("⊙")));
  }

  static warn(...data: any): void {
    console.log(c.bold(c.yellow("⚠ Warn:")), ...data, c.bold(c.yellow("⊙")));
  }

  static error(...data: any): void {
    console.log(c.bold(c.red("⚠ Error:")), ...data, c.bold(c.red("⊙")));
  }

  static timeStart(label: string): void {
    console.time(c.bold(c.yellow("τ")) + ` - ${label}`);
  }

  static timeEnd(label: string, ...data: any): void {
    console.timeLog(c.bold(c.yellow("τ")) + ` - ${label}`, ...data, "⏳");
  }
}
