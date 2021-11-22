import { ServiceRegistry } from "./service-registry";

const localCallHandler = {
  get: function(target, prop, receiver) {
    if(typeof target[prop] === 'function') {
      return function(...args) {
        return new Promise((res, rej) => {
          const result = target[prop].apply(this, args);
          if(result instanceof Promise) {
            result.then(r => res(r)).catch(rej);
          } else {
            res(result);
          }
        });
      }
    }
    return target[prop]
  },
}

const constructHandler = {
  construct: function(target, args) {
    const newInstance = new target(ServiceRegistry.getAll(), ...args);
    ServiceRegistry.register(newInstance);
    return newInstance;
  },
}

export function LocalProxyOf<T>(type): T {
  const creator = new Proxy(type, constructHandler);
  return new Proxy(new creator(), localCallHandler);
}