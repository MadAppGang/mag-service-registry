Service registry
===

[![npm version](https://badge.fury.io/js/mag-service-registry.svg)](https://badge.fury.io/js/mag-service-registry) [![Build Status](https://travis-ci.org/MadAppGang/mag-service-registry.svg?branch=master)](https://travis-ci.org/MadAppGang/mag-service-registry)
[![Coverage Status](https://coveralls.io/repos/github/MadAppGang/mag-service-registry/badge.svg?branch=master)](https://coveralls.io/github/MadAppGang/mag-service-registry?branch=master)
## What is it?
This package implements a concept of a globally available registry that enables access to your services throughout the application.
It is quite similar to service locator software development pattern.

Register your services once and than access them elsewhere by just importing registry from the package.

## What might you need it for?
You want to initialize your services right after the application starts right? The place to do it is the applications entry point.
The issue is that you would then have to export services from the entry point module, which is not a good thing to do. Entry point code should only be run once. If you're exporting logic in your entry point module, you're probably better off moving that functionality in to a re-usable module.

Using the service registry you can configure your services at one place, and then import them from another. This simple prevents the case when you import something from entry point. and this packages intent is to help you with that.

## How do you use it?
First off you need to install it. It is available on npm.
```bash
$ npm install --save mag-service-registry
```

### Configuring services
All you need to do now is to init your services and get them registered globally.
```javascript
  // index.js [your entry point js file]

  import { initServiceRegistry } from 'mag-service-registry';

  const configureServices = (registry) => {
    // here you can access the registry, so this is the right place to run your services for the first time
    const exampleService = { id: 'EXAMPLE_SERVICE' };

    registry.register({ exampleService });
  };

  initServiceRegistry(configureServices);
```

### Accessing services
Then you simply access you services in another file
```javascript
  // anotherFile.js

  import ServiceRegistry from 'mag-service-registry';

  console.log(ServiceRegistry.services.exampleService); // { id: 'EXAMPLE_SERVICE' }
```

As you can see to ran the configuration at the entry point, but access the results from another place. That is the beauty of this package.

### Asynchronous operations
Your services may require some time to initialize, so you might want to make *configureServices* asynchronous. And this is possible here.

The following will work perfectly fine.
```javascript
  const async configureServices = (registry) => {
    const exampleService = await initExampleService();

    registry.register({ exampleService });
  };
```

Due to ability to handle asynchronous services during registration the *initServiceRegistry* becomes asynchronous as well.
It resolves to registry after all the services are set and ready.

```javascript
  const registry = await initServiceRegistry(configureServices);

  // Do the rest of you application initialization here.
  // Services are initialized and registered globally at this point.
```

## API
### Registry
| Property | Type | Description |
| --- | --- | --- |
| register | function | This is used to register services. It accepts an object, keys of which are aliases, and values are services. You will then be able to access services by those aliases.
| get | function | This is used to access registered services. It accepts a string as a parameter, which is an alias to get a service by.
| services | object | This is basically a compiled object that holds a combined version of all register invocation results.


### initServiceRegistry
It accepts a function that is going to be called with registry as a first argument. Awaits for the function to finish and then resolves to registry. Is asynchronous.

## License
This project is licensed under the MIT License - see the LICENSE file for details.





