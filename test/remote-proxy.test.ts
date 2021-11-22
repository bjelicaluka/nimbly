import realAxios from 'axios';
import { RemoteProxyOf } from '../src/remote-proxy';

jest.mock('axios');

const axios = realAxios as jest.Mocked<typeof realAxios>;

class TestService {
  async getAll() {}
  async addSomething(test) {}
  async updateSomething(test) {}
  async deleteSomething(test, test2) {}
}

describe('RemoteProxyOf', () => {
  it('send get request with expected args and default origin', async () => {
    const testServiceProxy = RemoteProxyOf<TestService>(TestService);
    (axios as any).mockResolvedValue({ data: [1] });

    const result = await testServiceProxy.getAll();

    expect(axios).toBeCalledWith({
      method: 'get',
      params: {args: []},
      url: 'http://localhost/' + 'test-service/get-all'
    });

    expect(result).toEqual([1]);
  });

  it('send post request with provided origin', async () => {
    const origin = 'http://test-origin/';
    const testServiceProxy = RemoteProxyOf<TestService>(TestService, origin);
    (axios as any).mockResolvedValue({ data: [1] });

    const arg = { test: "123" };
    const result = await testServiceProxy.addSomething(arg);

    expect(axios).toBeCalledWith({
      method: 'post',
      params: {args: [arg]},
      url: origin + 'test-service/add-something'
    });

    expect(result).toEqual([1]);
  });

  it('send put request with provided origin', async () => {
    const origin = 'http://test-put-origin/';
    const testServiceProxy = RemoteProxyOf<TestService>(TestService, origin);
    (axios as any).mockResolvedValue({ data: [1] });

    const arg = { test: "123" };
    const result = await testServiceProxy.updateSomething(arg);

    expect(axios).toBeCalledWith({
      method: 'put',
      params: {args: [arg]},
      url: origin + 'test-service/update-something'
    });

    expect(result).toEqual([1]);
  });

  it('send delete request with provided origin and multiple args', async () => {
    const origin = 'http://origin/';
    const testServiceProxy = RemoteProxyOf<TestService>(TestService, origin);
    (axios as any).mockResolvedValue({ data: [1] });

    const arg1 = { test: "123" };
    const arg2 = 123;
    const result = await testServiceProxy.deleteSomething(arg1, arg2);

    expect(axios).toBeCalledWith({
      method: 'delete',
      params: {args: [arg1, arg2]},
      url: origin + 'test-service/delete-something'
    });

    expect(result).toEqual([1]);
  });
});