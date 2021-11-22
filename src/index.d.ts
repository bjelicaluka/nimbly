interface Constructor {
  new ();
}

export class ServiceRegistry {
  public static register(key: string, service: any): void;
  public static register(service: any): void;
  public static getAll(): any;
}

export function LocalProxyOf<T>(type: Constructor): T;
export function RemoteProxyOf<T>(type: Constructor): T;