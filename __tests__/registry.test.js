import createRegistry from '..';

describe('createRegistry test suit', () => {
  let registry = null;
  let httpService = null
  let storageService = null;

  beforeEach(() => {
    registry = createRegistry();
    httpService = {};
    storageService = {};
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
    registry.register({ httpService, storageService });

    const registered = registry.exposeRegistered();

    expect(registered.httpService).toBe(httpService);
    expect(registered.storageService).toBe(storageService);
  });

  test('registered services are returned from "register"', () => {
    const registered = registry.register({ httpService });

    expect(registered.httpService).toBe(httpService);
  });

  test('object returned from "register" contains results of all previous "register" calls', () => {
    registry.register({ httpService });
    const registered = registry.register({ storageService });

    expect(registered.httpService).toBe(httpService);
    expect(registered.storageService).toBe(storageService);
  });
});
