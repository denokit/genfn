# @denorid/genfn

A module that helps you to write generated functions in [Deno](https://deno.land),
based on npm [generate-function](https://github.com/mafintosh/generate-function) package.

## Usage

```TypeScript
import { genFn } from "https://deno.land/x/denorid_genfn@1.0.0/mod.ts"

const addNumber = (val: number) => {
  const gen = genFn(`
    function add(n) {
      return n + ${val}
    }
  `);

  return gen.toFunction();
}

const addTen = addNumber(10);

console.log(addTen.toString()); // prints the generated function
console.log("5 + 10 =", addTen(5));
```

If you need to close over variables in your generated function pass them to `toFunction(scope?: Record<string, unknown>)`

```TypeScript
function multiply(a: number, b: number) {
  return a * b;
}

function addAndMultiplyNumber(val: number) {
  const gen = genFn(`
    function (n) {
      if (typeof n !== 'number') {
        throw new Error('argument should be a number')
      }
      const result = multiply(${val}, n + ${val})
      return result
    }
  `);

  return gen.toFunction({ multiply });
}

const addAndMultiply2 = addAndMultiplyNumber(2);

console.log(addAndMultiply2.toString()); // prints the generated function
console.log("(3 + 2) * 2 =", addAndMultiply2(3));
```

You can call `gen.generate(code: string | string[])` as many times as you want to append more source code to the function.
