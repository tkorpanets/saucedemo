import { test } from '@playwright/test';

/**
 * Decorator that wraps a function with a Playwright test step.
 * Used for reporting purposes.
 *
 * @example
 * ```
 *    import { step } from './step-decorator';
 *    class MyTestClass {
 *        @step('optional step name')
 *        async myTestFunction() {
 *            // Test code goes here
 *        }
 *    }
 * ```
 */
export function step<This extends object, Args extends unknown[], Return>(message?: string) {
  return function (
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
  ) {
    const wrapped = function (this: This, ...args: Args): Promise<Return> {
      const ctor = (this as This & { constructor: { name?: string } }).constructor;
      const className = typeof ctor?.name === 'string' && ctor.name.length > 0 ? ctor.name : 'Unknown';
      const name = message ?? `${className}.${String(context.name)}`;

      return test.step(name, async () => target.apply(this, args), { box: true });
    };

    return wrapped as (this: This, ...args: Args) => Promise<Return>;
  };
}
