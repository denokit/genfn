/**
 * @author    Denorid
 * @copyright 2021, https://github.com/Denorid
 * @license   MIT
 */
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.127.0/testing/asserts.ts";
import { FunctionGenerator } from "./function-generator.ts";

Deno.test("generate add() function", () => {
  const generator = new FunctionGenerator(`function add(n) {
    return n + 10;
  }
  `);

  assertEquals(
    generator.toString(),
    [
      "function add(n) {",
      "  return n + 10;",
      "}",
    ].join("\n"),
  );

  assertEquals(generator.toFunction()(15), 25);
});

Deno.test("generate add() with closed variables", () => {
  const generator = new FunctionGenerator(`function add(n) {
    return begin + 10;
  }
  `);

  assertThrows(() => generator.toFunction()(10));
  assertEquals(generator.toFunction({ begin: 100 })(10), 110);
});
