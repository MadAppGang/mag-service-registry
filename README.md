Registry
===

[![Build Status](https://travis-ci.org/MadAppGang/mag-service-registry.svg?branch=master)](https://travis-ci.org/MadAppGang/mag-service-registry)
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
$ npm install --save @madappgang/registry
```

### Creating a registry
```javascript
// serviceRegistry.js

import createRegistry from '@madappgang/registry';

const { register, exposeRegistered } = createRegistry();

// here you delegate the registering so it can be performed in another file
export { register };

export default exposeRegistered();

```
Default import of this file is an object that contains all registered stuff. At first it is an empty object since nothing has been registered yet, but it's going to update each time you register something.

The idea is that you register stuff somewhere else, but then access it from here.

### Registering logic
All you need to do now is to init your logic and get it registered globally.

```javascript
// entry point or whatever place you want to configure your services at
...

const registerServices = async () => {
  const httpService = await configureHttpService();
  const storageService = await configureStorageService();

  return register({
    http: httpService,
    storage: storageService,
  });
};

const services = await registerServices();

...
```

### Accessing logic
Then you simply access you services in another file
```javascript
// anotherFile.js

// this is imported from the place where the registry was created
import services from './serviceRegistry';

console.log(services.http); // httpService
console.log(services.storage); // storageService
```

As you can see you did the registering at the entry point, but access the results from servieRegistry.js

As simple as that.

## API
### Registry
Registry is created with packages *createRegistry* method.

| Property | Type | Description |
| --- | --- | --- |
| register | function | This is used to register units. It accepts an object, keys of which are aliases, and values are units. You will then be able to access units by those aliases. Returns all that was ever registered.
| exposeRegistered | function | This returns the object that holds everything that has ever been registered to this instance of registry. Returns all that was ever registered.

## License
This project is licensed under the MIT License - see the LICENSE file for details.





