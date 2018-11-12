import { createRegistry } from '..';

describe('createRegistry test suit', () => {
  let registry = null;

  beforeEach(() => {
    registry = createRegistry();
  });

  test('createRegistry is a function', () => {
    expect(createRegistry).toBeInstanceOf(Function);
  });

  test('has "register" public method', () => {
    expect(registry).toHaveProperty('register');
    expect(registry.register).toBeInstanceOf(Function);
  });

  test('has "exposeRegistered" public method', () => {
    expect(registry).toHaveProperty('exposeRegistered');
    expect(registry.exposeRegistered).toBeInstanceOf(Function);
  });

  test('registered services are available on "services" property', () => {
    const httpService = {};
    const storageService = {};

    registry.register({ httpService, storageService });

    const registered = registry.exposeRegistered();

    expect(registered.httpService).toBe(httpService);
    expect(registered.storageService).toBe(storageService);
  });
});
