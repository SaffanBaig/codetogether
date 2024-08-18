import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeGatewayModule } from './code-gateway/code-gateway.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), CodeGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
