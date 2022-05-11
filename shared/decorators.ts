import { BASIC_TYPES } from "./constants";

export function Service(rootPath: string) {
  return function (target: any): void {
    if(!target.prototype.$nimbly_config) target.prototype.$nimbly_config = {};
    target.prototype.$nimbly_config.rootPath = rootPath;
  }
}

export function Get(path: string = '') {
  return pathDecorator(path, 'get');
}

export function Post(path: string = '') {
  return pathDecorator(path, 'post', true);
}

export function Put(path: string = '') {
  return pathDecorator(path, 'put', true);
}

export function Delete(path: string = '') {
  return pathDecorator(path, 'delete');
}

export function Patch(path: string = '') {
  return pathDecorator(path, 'patch', true);
}

const typeDecorator = (typeParam: string | { new(): any }) => (target: any, propertyKey?: string | symbol, parameterIndex?: number) => {
  let type = typeParam;
  if(!target.$nimbly_config) target.$nimbly_config = {};
  if(!target.$nimbly_config.types) target.$nimbly_config.types = {};
  if(typeof type === 'function') {
    const instance = new type();
    type = instance.$nimbly_config.types;
  }
  if(parameterIndex === undefined) {
    if(!target.$nimbly_config.types[propertyKey]) target.$nimbly_config.types[propertyKey] = type;
  } else {
    if(!target.$nimbly_config.types[propertyKey]) target.$nimbly_config.types[propertyKey] = [];
    target.$nimbly_config.types[propertyKey].push({ index: parameterIndex, type });
  }
}

export const string = typeDecorator(BASIC_TYPES.string);
export const boolean = typeDecorator(BASIC_TYPES.boolean);
export const number = typeDecorator(BASIC_TYPES.number);
export const type = (type: { new(): any }) => typeDecorator(type);

export function Query(name: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    if(!target.$nimbly_config) target.$nimbly_config = {};
    if(!target.$nimbly_config[propertyKey]) target.$nimbly_config[propertyKey] = {};
    if(!target.$nimbly_config[propertyKey].query) target.$nimbly_config[propertyKey].query = [];
    target.$nimbly_config[propertyKey].query.push({ index: parameterIndex, name });
  }
}

const pathDecorator = (path: string, method: string, body: boolean = false) => function (target: any, propertyKey: string): void {
  if(!target.$nimbly_config) target.$nimbly_config = {};
  if(!target.$nimbly_config[propertyKey]) target.$nimbly_config[propertyKey] = {};
  target.$nimbly_config[propertyKey] = { ...target.$nimbly_config[propertyKey], path, method, body };
}