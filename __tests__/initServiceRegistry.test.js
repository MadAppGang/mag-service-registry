import Registry, { initServiceRegistry } from '..';

describe('initServiceRegistry test suit', () => {
  test('is a function', () => {
    expect(initServiceRegistry).toBeInstanceOf(Function);
  });

  test('returns a promise', () => {
    expect(initServiceRegistry(jest.fn())).toBeInstanceOf(Promise);
  });

  test('resolves to Registry', () => {
    expect.assertions(1);
    expect(initServiceRegistry(jest.fn())).resolves.toBe(Registry);
  });

  test('invokes "configure"', () => {
    expect.assertions(1);

    const configure = jest.fn();

    initServiceRegistry(configure).then(() => {
      expect(configure).toHaveBeenCalled();
    });
  });

  test('invokes "configure" with registry', () => {
    const configure = jest.fn();

    initServiceRegistry(configure).then(() => {
      expect(configure).toHaveBeenCalledWith(Registry);
    });
  });

  test('registry contains registered services', () => {
    expect.assertions(1);

    const httpClient = { id: 'HTTP_CLIENT '};

    const configure = (registry) => {
      registry.register({ httpClient });
    };

    initServiceRegistry(configure).then((registry) => {
      expect(registry.services.httpClient).toBe(httpClient);
    });
  });
});