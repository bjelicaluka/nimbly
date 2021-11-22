import { LocalProxyOf } from '../src/local-proxy'

class TestService {
  async getAll() {
    return [1, 2, 3];
  }
  getAllNonAsync() {
    return [1, 2, 3];
  }
  async addSomething(test) {
    return test;
  }
  async updateSomething(test) {
    return test;
  }
  async deleteSomething(test, test2) {
    return [test, test2];
  }
}

const localTestService = new TestService();

describe('LocalProxyOf', () => {
  it('should have the same get result as the service itself', async () => {
    const testServiceProxy = LocalProxyOf<TestService>(TestService);

    const result = await testServiceProxy.getAll();

    expect(result).toEqual(await localTestService.getAll());
  });

  it('should have the same add result as the service itself', async () => {
    const testServiceProxy = LocalProxyOf<TestService>(TestService);

    const result = await testServiceProxy.addSomething({ test: { nest: 1 } });

    expect(result).toEqual(await localTestService.addSomething({ test: { nest: 1 } }));
  });

  it('should have the same update result as the service itself', async () => {
    const testServiceProxy = LocalProxyOf<TestService>(TestService);

    const result = await testServiceProxy.updateSomething({ test: { nest: 1 } });

    expect(result).toEqual(await localTestService.updateSomething({ test: { nest: 1 } }));
  });

  it('should have the same delete result as the service itself', async () => {
    const testServiceProxy = LocalProxyOf<TestService>(TestService);

    const result = await testServiceProxy.deleteSomething(1, 2);

    expect(result).toEqual(await localTestService.deleteSomething(1, 2));
  });

  it('should handle the non-async method', async () => {
    const testServiceProxy = LocalProxyOf<TestService>(TestService);

    const result = await testServiceProxy.getAllNonAsync();

    expect(result).toEqual(localTestService.getAllNonAsync());
  });

});