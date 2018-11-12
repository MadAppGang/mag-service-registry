function createRegistry() {
  const registered = {};

  const registerUnit = (alias, unit) => {
    registered[alias] = unit;
  };

  const register = units =>
    Object.entries(units).map(entry => registerUnit(...entry));

  const exposeRegistered = () => registered;

  return {
    register, exposeRegistered,
  };
};

export default createRegistry;