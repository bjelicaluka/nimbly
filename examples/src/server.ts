import { Nimble, NimblyApi } from '../../api/src';
import { Get, Post, Service } from '../../client/src';

class TestService {
  $nimbly = {
    rootPath: '/tests',
    get: {
      method: 'GET',
      path: '/:id'
    },
    update: {
      method: 'PUT',
      path: '/:id',
      body: true
    }
  }

  get(id) {
    return [1, 2, 3]
  }

  update(id, body) {
    return [1, 2, 3]
  }
}

@Service('/')
class DecoratedService {
  private testService: TestService;

  constructor({ testService }: { testService: TestService }) {
    this.testService = testService;
  }

  @Get('/:id')
  test(id: string) {
    return { id, arr: this.testService.get(id) }
  }

  @Post()
  post(body: any) {
    return body;
  }
}

export const api = new NimblyApi({
  nimblyInfo: {
    version: '0.0.1-alpha1',
    name: 'Random Microservice',
    description: 'This microservice is used for random stuff.',
    basePath: '/api/v1'
  }
}).from(new Nimble().ofLocal(TestService).andLocal(DecoratedService));