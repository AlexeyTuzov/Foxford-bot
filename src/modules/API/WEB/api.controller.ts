import { Controller, Get, Post } from '@nestjs/common';
import { ApiService } from '../application/api.service';

const token = process.env.TELEGRAM_TOKEN;

@Controller(`api.telegram.org/bot${token}`)
export class ApiController {

    constructor(private readonly apiService: ApiService) { }

    @Post('/start')
    start() {
        console.log('start in Controller POST')
        return this.apiService.greet()
    }

    @Get('/start')
    getStarted() {
        console.log('start in Controller GET')
        return this.apiService
    }
}
