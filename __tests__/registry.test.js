import Registry from '..';

describe('Registry test suit', () => {
  test('is an object', () => {
    expect(Registry).toBeInstanceOf(Object);
  });

  test('has "services" public property', () => {
    expect(Registry).toHaveProperty('services');
    expect(Registry.services).toBeInstanceOf(Object);
  });

  test('has "register" public method', () => {
    expect(Registry).toHaveProperty('register');
    expect(Registry.register).toBeInstanceOf(Function);
  });

  test('has "get" public method', () => {
    expect(Registry).toHaveProperty('get');
    expect(Registry.get).toBeInstanceOf(Function);
  });

  test('registered services are available on "services" property', () => {
    const httpService = {};

    Registry.register({ httpService });

    expect(Registry.services.httpService).toBe(httpService);
  });

  test('registered services are available through "get" property', () => {
    const httpService = {};

    Registry.register({ httpService });

    expect(Registry.get('httpService')).toBe(httpService);
  });
});
