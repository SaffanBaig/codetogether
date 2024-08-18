import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { error } from 'console';
import { catchError, firstValueFrom } from 'rxjs';
import { CodeGatewayDto } from './dto/CodeGateway.dto';

@Injectable()
export class CodeGatewayService {
    constructor(private readonly httpService: HttpService) {}
  async executeCode(data: CodeGatewayDto){
    const credsUsed = await firstValueFrom(this.httpService.post(`${process.env.JDOODLE_URL}/credit-spent`,{
        clientId: process.env.JDOODLE_CLIEN_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      } ).pipe(catchError((error: AxiosError) => {
        console.log("error ", error)
        throw error
      })));
    if (credsUsed?.data?.used > 18) {
        throw new Error('credit limit exceeded. Please try again tomorrow');
    }

    const program = {
        script: data?.code,
        language: data?.language_code,
        versionIndex: "3",
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      };

    const resp = await firstValueFrom(this.httpService.post(`${process.env.JDOODLE_URL}/execute`,{
        clientId: process.env.JDOODLE_CLIEN_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      } ).pipe(catchError((error: AxiosError) => {
        console.log("error ", error)
        throw error
      })));

    return resp?.data?.output
  }


  
}
