import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CodeGatewayService } from './code-gateway.service';
import { CodeGatewayController } from './code-gateway.controller';
import { CodeGateway } from './code-gateway.gateway';

@Module({
    imports: [HttpModule],
    providers: [CodeGatewayService, CodeGateway],
    controllers: [CodeGatewayController],
})
export class CodeGatewayModule {}
