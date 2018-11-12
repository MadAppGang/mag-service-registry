const initRegistry = registry => (populateRegistry) => {
  const { register, exposeRegistered } = registry;

  return Promise.resolve(populateRegistry(register)).then(exposeRegistered);
};

export default initRegistry;
