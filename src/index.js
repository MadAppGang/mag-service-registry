function createRegistry() {
  const registered = {};
  
  const exposeRegistered = () => registered;

  const registerUnit = (alias, unit) => {
    registered[alias] = unit;
  };

  const register = (units) => {
    Object.keys(units).map(alias => registerUnit(alias, units[alias]));
    
    return exposeRegistered();
  }

  return Object.freeze({
    register, exposeRegistered,
  });
};

export default createRegistry;