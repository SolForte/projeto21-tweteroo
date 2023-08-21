import { Injectable } from '@nestjs/common';
import User from './entities/user.entities';
import Tweet from './entities/tweet.entities';

@Injectable()
export class AppService {
  private readonly users: User[] = [];
  private readonly tweets: Tweet[] = [];

  getHello(): string {
    return "I'm okay!";
  }

  userCheck(username: string, avatar: string) {
    if (
      !username ||
      typeof username !== 'string' ||
      !avatar ||
      typeof avatar !== 'string'
    ) {
      throw new Error('All fields are required!');
    }
  }

  tweetCheck(username: string, tweet: string) {
    if (
      !username ||
      typeof username !== 'string' ||
      !tweet ||
      typeof tweet !== 'string'
    ) {
      throw new Error('All fields are required!');
    }
  }

  postUsers(username: string, avatar: string) {
    this.userCheck(username, avatar);
    this.users.push(new User(username, avatar));
  }

  postTweets(username: string, tweet: string) {
    this.tweetCheck(username, tweet);
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw new Error('UNAUTHORIZED');
    }
    this.tweets.push(new Tweet(username, tweet));
  }

  getTweets(pageNumber: number, pageBoolean: boolean): Tweet[] {
    const TWEETS_PER_PAGE_AMOUNT = 15;
    const tweets = [];
    const avatar = {};

    this.users.forEach((user) => {
      avatar[user.username] = user.avatar;
    });

    const startIndex =
      TWEETS_PER_PAGE_AMOUNT * (pageBoolean ? 0 : pageNumber - 1);
    const endIndex = TWEETS_PER_PAGE_AMOUNT * (pageBoolean ? 1 : pageNumber);

    for (let i = startIndex; i < endIndex; i++) {
      if (this.tweets[i]) {
        tweets.push({
          ...this.tweets[i],
          avatar: avatar[this.tweets[i].username],
        });
      }
    }

    return tweets;
  }

  getUserTweets(username: string): Tweet[] {
    const tweets = [];
    let avatar: string;

    this.users.forEach((user) => {
      if (user.username === username) {
        avatar = user.avatar;
      }
    });

    this.tweets.forEach((tweet) => {
      if (tweet.username === username) {
        tweets.push({
          ...tweet,
          avatar,
        });
      }
    });

    return tweets;
  }
}
