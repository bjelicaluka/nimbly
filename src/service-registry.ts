function lowerFirstLetter(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export class ServiceRegistry {

  private static registry = { }

  public static register(paramOne: string | any, paramTwo?: any) {
    if(typeof paramOne === 'string') {
      this.registry[paramOne] = paramTwo;
    } else {
      this.registry[lowerFirstLetter(paramOne.constructor.name)] = paramOne;
    }
  }

  public static getAll() {
    return this.registry;
  }
}