import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUser } from './entities/delete-user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return this.usersService.createUser(createUserInput);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          variant: 'error',
          detailedMessage: 'Cannot Create User due to Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query(() => [User])
  findAll() {
    return this.findAll();
  }

  @Query(() => User)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      const temp = await this.usersService.updateUser(
        updateUserInput,
        updateUserInput.id,
      );
      return temp;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error' + error);
    }
  }

  @Mutation(() => DeleteUser)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    try {
      const message = await this.usersService.deleteUser(id);

      return { message: message };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error' + error);
    }
  }
}
