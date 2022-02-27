/**
 * @author    Denorid
 * @copyright 2021, https://github.com/Denorid
 * @license   MIT
 */
import { INDENT_END, INDENT_START } from "./constants.ts";

export class FunctionGenerator {
  private lines = [] as string[];
  private indent = 0;

  public constructor(code: string);
  public constructor(code: string[]);
  public constructor(code: string | string[]) {
    this.generate(code as string);
  }

  public generate(code: string): this;
  public generate(code: string[]): this;
  public generate(code: string | string[]): this {
    (Array.isArray(code) ? code : code.trim().split("\n")).map((line) =>
      this.pushLine(line.trim())
    );

    return this;
  }

  public toString(): string {
    return this.lines.join("\n");
  }

  // deno-lint-ignore no-explicit-any
  public toFunction<T = (...args: any[]) => any>(
    scope?: Record<string, unknown>,
  ): T {
    scope ??= {};
    const src = `return (${this.toString()})`;

    const keys = Object.keys(scope);

    return Function.apply(null, keys.concat(src)).apply(
      null,
      keys.map((key) => (scope as Record<string, unknown>)[key]),
    );
  }

  private push(text: string): void {
    this.lines.push("".padStart(this.indent * 2).concat(text));
  }

  private pushLine(text: string): void {
    const indentEnd = INDENT_END.test(text.trim()[0]);
    const indentBegin = INDENT_START.test(text[text.length - 1]);

    if (indentEnd && indentBegin) {
      --this.indent;
      this.push(text);
      ++this.indent;
    } else if (indentBegin) {
      this.push(text);
      ++this.indent;
    } else if (indentEnd) {
      --this.indent;
      this.push(text);
    } else {
      this.push(text);
    }
  }
}
