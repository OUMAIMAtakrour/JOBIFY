import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @MessagePattern('auth.login')

  login(data) {
    return this.authServiceService.login(data);
  }

  @MessagePattern('auth.register')
  register(data) {
    return this.authServiceService.register(data);
  }
}