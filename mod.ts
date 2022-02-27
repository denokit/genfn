/**
 * @author    Denorid
 * @copyright 2021, https://github.com/Denorid
 * @license   MIT
 */
import { FunctionGenerator } from "./src/function-generator.ts";

export const genFn = (code: string | string[]): FunctionGenerator =>
  new FunctionGenerator(code as string);

export { FunctionGenerator }
