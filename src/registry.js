function createServiceRegistry() {
  const services = {};

  const registerService = (alias, service) => {
    services[alias] = service;
  };

  const register = services =>
    Object.entries(services).map(entry => registerService(...entry));

  const get = alias => services[alias];

  return {
    services,
    register, get,
  };
};

// singleton
export default createServiceRegistry();
