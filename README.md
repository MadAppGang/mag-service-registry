Service registry
===

[![npm version](https://badge.fury.io/js/mag-service-registry.svg)](https://badge.fury.io/js/mag-service-registry) [![Build Status](https://travis-ci.org/MadAppGang/mag-service-registry.svg?branch=master)](https://travis-ci.org/MadAppGang/mag-service-registry)
[![Coverage Status](https://coveralls.io/repos/github/MadAppGang/mag-service-registry/badge.svg?branch=master)](https://coveralls.io/github/MadAppGang/mag-service-registry?branch=master)
## What is it?
This package implements a concept of a globally available registry that enables access to your logic throughout the application.
It is quite similar to service locator software development pattern.

## What might you need it for?
You want to initialize your logic right after the application starts. The place to do it is the applications entry point.
The issue is that you would then have to export services from the entry point module, which is not a good thing to do. Entry point code should only be run once. If you're exporting logic in your entry point module, you're probably better off moving that functionality in to a re-usable module.

With this package you can create a registry and export it at one place, but **delegate the registering to another**.
This is the key idea of the package.

## How do you use it?
First off you need to install it. It is available on npm.
```bash
$ npm install --save mag-service-registry
```

### Creating a registry
```javascript
// serviceRegistry.js

import { createRegistry, initRegistry } from 'mag-service-registry';

// create an instance
const registry = createRegistry();

// you will call this when you need to register something.
export const populateServiceRegistry = initRegistry(registry);

// export everything that has been registered
export default registry.disposeRegistered();

```
See the main idea is that you export everything that has been registered on the registry instance from here
and than every piece of you app that needs access to the registered logic will import it from this very place.
However the registering isn't happening here, **it is delegated somewhere else**.

### Registering logic
All you need to do now is to init your logic and get it registered globally.
```javascript
// index.js [your entry point js file]

// remember how we created this function at the example above?
import { populateServiceRegistry } from './serviceRegistry';

populateServiceRegistry((register) => {
  // here you can register stuff, so this is the right place to run your logic for the first time
  const exampleService = { id: 'EXAMPLE_SERVICE' };

  register({ exampleService });
});
```

### Accessing logic
Then you simply access you services in another file
```javascript
// anotherFile.js

// this is imported from the place where the registry was created
import Services from './serviceRegistry';

console.log(Services.exampleService); // { id: 'EXAMPLE_SERVICE' }
```

As you can see you did the registering at the entry point, but access the results from another place. That is the whole purpose of the package.

*populateServiceRegistry* is an asynchronous function. It waits for all of your logic to get registered and after all resolves to the registering result.
(in case you want to inject it somewhere)

```javascript
// registerServices may return a promise, this what makes "populate" function asynchronous.
const services = await populateServiceRegistry(registerServices);

// Do the rest of you application initialization here.
// Services are initialized and registered globally at this point.
```

## API
### Registry
Registry is created with packages *createRegistry* method
| Property | Type | Description |
| --- | --- | --- |
| register | function | This is used to register units. It accepts an object, keys of which are aliases, and values are units. You will then be able to access units by those aliases.
| disposeRegistered | function | This returns the object that holds everything that has ever been registered to this instance of registry.
Example:
```javascript
const registry = createRegistry();
...
```


### initRegistry
This is a function that accepts an instance of a registry and returns a *populateRegistry* function. The idea of *populateRegistry* is described down below.
Example:
```javascript
...
const populateRegistry = initRegistry(registry);
...
```

### populateRegistry
This is a function. It accepts a function as a first argument, that is going to receive the *register* method of your registry instance.
Inside this function you can register your units. 
Example:
```javascript
...
populateRegistry((register) => {
  // Here you have access to the "register" method of you registry.
  // This is the place to register all your units.
  // This function can be asynchronous (can return a promise)
});
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.





