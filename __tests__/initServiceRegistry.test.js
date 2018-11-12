import { initRegistry } from '..';

describe('initRegistry test suit', () => {
  const registry = {};
  const inputFunc = jest.fn();

  beforeEach(() => {
    registry.exposeRegistered = jest.fn(() => 15);
    registry.register = jest.fn();
  });

  test('is a function', () => {
    expect(initRegistry).toBeInstanceOf(Function);
  });

  test('returns a function', () => {
    const populateRegistry = initRegistry(registry);
    expect(populateRegistry).toBeInstanceOf(Function);
  });

  test('returned function returns a promise', () => {
    const populateRegistry = initRegistry(registry);
    expect(populateRegistry(inputFunc)).toBeInstanceOf(Promise);
  });

  test('populateRegistry calls registry in the end', (done) => {
    const populateRegistry = initRegistry(registry);

    populateRegistry(inputFunc).then(() => {
      expect(registry.exposeRegistered).toHaveBeenCalled();
      done();
    });
  });

  test('populateRegistry resolves to exposeRegistered invocation result', (done) => {
    const populateRegistry = initRegistry(registry);
    
    populateRegistry(inputFunc).then((result) => {
      expect(result).toEqual(registry.exposeRegistered());
      done();
    });
  });

  test('populateRegistry invokes first-param function with "register" method of registry', (done) => {
    const populateRegistry = initRegistry(registry);
    
    populateRegistry(inputFunc).then(() => {
      expect(inputFunc).toHaveBeenCalledWith(registry.register);
      done();
    });
  });
});