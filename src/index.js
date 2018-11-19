function createRegistry() {
  const registered = {};
  
  const exposeRegistered = () => registered;

  const register = (units) => {
    Object.keys(units).map((alias) => {
      registered[alias] = units[alias];
    });
    
    return exposeRegistered();
  }

  return Object.freeze({
    register, exposeRegistered,
  });
};

export default createRegistry;