import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteUser {
  @Field()
  message: string;
}
