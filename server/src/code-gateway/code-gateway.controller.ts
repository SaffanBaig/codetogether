import { Body, Controller, Get, Post } from '@nestjs/common';
import { CodeGatewayService } from './code-gateway.service';
import { CodeGatewayDto } from './dto/CodeGateway.dto';

@Controller()
export class CodeGatewayController {
  constructor(private readonly codegatewayService: CodeGatewayService) {}

  @Post('execute')
  executeCode(@Body() data: CodeGatewayDto) {
    return this.codegatewayService.executeCode(data);
  }
}
