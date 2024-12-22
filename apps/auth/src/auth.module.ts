import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth.controller';
import { AuthServiceService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
  exports: [],
})
export class AuthModule {}
