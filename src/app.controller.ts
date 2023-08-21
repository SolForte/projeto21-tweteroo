import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  Param,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import UserDTO from './dtos/user.dtos';
import { PageDto, TweetDTO } from './dtos/tweet.dtos';
import Tweet from './entities/tweet.entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() body: UserDTO) {
    try {
      this.appService.postUsers(body.username, body.avatar);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/tweets')
  @HttpCode(HttpStatus.CREATED)
  createTweet(@Body() body: TweetDTO) {
    try {
      this.appService.postTweets(body.username, body.tweet);
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/tweets')
  getTweets(@Query() page: PageDto) {
    const pageNumber = Number(page.page);
    const pageBoolean: boolean = isNaN(pageNumber) ? true : false;

    return this.appService.getTweets(pageNumber, pageBoolean);
  }

  @Get('/tweets/:username')
  getUserTweets(@Param() user: { username: string }): Tweet[] {
    const username = user.username;

    return this.appService.getUserTweets(username);
  }
}
