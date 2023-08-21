import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export default class UserDTO {
  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'All fields are required!' })
  @IsUrl()
  avatar: string;
}
