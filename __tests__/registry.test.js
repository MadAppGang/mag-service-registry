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

  test('has "disposeRegistered" public method', () => {
    expect(registry).toHaveProperty('disposeRegistered');
    expect(registry.disposeRegistered).toBeInstanceOf(Function);
  });

  test('registered services are available on "services" property', () => {
    const httpService = {};
    const storageService = {};

    registry.register({ httpService, storageService });

    const registered = registry.disposeRegistered();

    expect(registered.httpService).toBe(httpService);
    expect(registered.storageService).toBe(storageService);
  });
});
