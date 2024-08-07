import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

HTMLFormElement.prototype.requestSubmit = () => {
  const noop = null;
  return noop;
};

expect.extend(matchers);
