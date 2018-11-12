const initRegistry = registry => (populateRegistry) => {
  const { register, disposeRegistered } = registry;

  return Promise.resolve(populateRegistry(register)).then(disposeRegistered);
};

export default initRegistry;
