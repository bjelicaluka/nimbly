import { ServiceRegistry } from '../src/service-registry'
import { LocalProxyOf } from '../src/local-proxy'
import { RemoteProxyOf } from '../src/remote-proxy'

class TestService {
  public deps: { exampleService?: any } = {};
  
  constructor(deps = {}) {
    this.deps = deps;
  }

  async getExampleServiceResult() {
    return this.deps.exampleService.get();
  }
}

class ExampleService {
  
  async get() {
    return [1, 2, 3];
  }
}

class AnotherService {
  public deps = {};
  
  constructor(deps = {}) {
    this.deps = deps;
  }
}

describe('ServiceRegistry', () => {
  it('should register a test service', async () => {
    ServiceRegistry.register(LocalProxyOf<TestService>(TestService));

    const result = ServiceRegistry.getAll();

    expect(result).toHaveProperty('testService');
  });

  it('should update dependencies', async () => {
    ServiceRegistry.register(LocalProxyOf<TestService>(TestService));
    ServiceRegistry.register(LocalProxyOf<ExampleService>(ExampleService));
    ServiceRegistry.register(RemoteProxyOf<AnotherService>(AnotherService));

    const result = ServiceRegistry.getAll() as any;

    expect(result).toHaveProperty('testService');
    expect(result).toHaveProperty('anotherService');

    expect(result.anotherService.deps).toHaveProperty('testService');
    expect(result.anotherService.deps).toHaveProperty('anotherService');
    expect(result.anotherService.deps).toHaveProperty('exampleService');

    expect(result.testService.deps).toHaveProperty('testService');
    expect(result.testService.deps).toHaveProperty('anotherService');
    expect(result.testService.deps).toHaveProperty('exampleService');

    expect(await result.testService.getExampleServiceResult()).toEqual([1, 2, 3]);
  });
});