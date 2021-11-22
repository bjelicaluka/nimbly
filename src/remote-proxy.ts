import axios from "axios";
import { ServiceRegistry } from "./service-registry";

const prefixToMethod = {
  get: 'get',
  read: 'get',
  fetch: 'get',
  add: 'post',
  create: 'post',
  post: 'post',
  put: 'put',
  update: 'put',
  delete: 'delete',
  remove: 'delete',
}

function camelToDashCase(key) {
  var result = key.replace(/([A-Z])/g, " $1" );
  return result.split(' ').join('-').toLowerCase().replace(/^-/g, '');
}

function getHttpMethod(fname) {
  const match = Object.keys(prefixToMethod).find(prefix => fname.match(new RegExp(`^${prefix}`, 'g')));
  return prefixToMethod[match] || 'post';
}

function getResourcePath(cname, fname) {
  return `${camelToDashCase(cname)}/${camelToDashCase(fname)}`;
}

const remoteCallHandler = {
  origin: 'http://localhost/',
  get: function(target, prop, receiver) {
    if(typeof target[prop] === 'function') {
      return function(...args) {
        return new Promise((res, rej) => {
          axios({
            method: getHttpMethod(prop),
            params: {args},
            url: remoteCallHandler.origin + getResourcePath(target.constructor.name, prop)
          }).then(r => res(r.data)).catch(rej);
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

export function RemoteProxyOf<T>(type, origin: string = null): T {
  if(origin) remoteCallHandler.origin = origin;

  const creator = new Proxy(type, constructHandler);

  return new Proxy(new creator(), remoteCallHandler);
}