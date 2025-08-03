import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Seguridad Civica!';
  }

  postHello() {
    return "Desde @Post en el service"
  }
}
