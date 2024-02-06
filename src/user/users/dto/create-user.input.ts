import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';

@InputType()
export class CreateUserInput {
  @MinLength(3)
  @Field({ description: 'Input Type For User' })
  user_name: string;

  @Transform(({ value }) => bcrypt.hashSync(value, 12))
  @Field()
  password: string;

  @MinLength(1)
  @Field()
  address: string;

  @IsEmail()
  @Field()
  email: string;

  @MinLength(10)
  @MaxLength(15)
  @Field()
  phone_number: string;
}
