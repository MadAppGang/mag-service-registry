function createRegistry() {
  const registered = {};
  
  const exposeRegistered = () => registered;

  const registerUnit = (alias, unit) => {
    registered[alias] = unit;
  };

  const register = (units) => {
    Object.entries(units).map(entry => registerUnit(...entry));
    
    return exposeRegistered();
  }

  return {
    register, exposeRegistered,
  };
};

export default createRegistry;