import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Return Type of User' })
  id: number;

  @Field()
  user_name: string;

  @Field()
  phone_number: string;

  @Field()
  address: string;

  @Field()
  email: string;
}
