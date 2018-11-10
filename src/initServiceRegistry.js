import ServiceRegistry from './registry';

const initServiceRegistry = async (configure) => {
  await configure(ServiceRegistry);

  return ServiceRegistry;
};

export default initServiceRegistry;
