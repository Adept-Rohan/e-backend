import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { KnexBase } from 'src/knex/knex-Base/knexBase';
import { InjectKnex } from 'src/knex/knex.decorator';
import { Knex } from 'knex';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends KnexBase<
  CreateUserInput,
  UpdateUserInput,
  Knex.TableType<'user'>
>('user') {
  constructor(@InjectKnex readonly knex: Knex) {
    super(knex);
  }

  async createUser(createUserInput: CreateUserInput): Promise<User | null> {
    console.log('🚀 ~ createUser ~ createUserInput:', createUserInput);

    if (
      createUserInput.user_name === '' ||
      createUserInput.phone_number === '' ||
      createUserInput.password === '' ||
      createUserInput.email === '' ||
      createUserInput.address === ''
    ) {
      throw new HttpException(
        {
          message: 'User Details Cannot Be Empty',
          varaint: 'error',
          detailedMessage: 'Bad Request to Create User',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userList = this.findAll();

    const isUserAlreadyExists = (await userList).find(
      (user) =>
        user.phone_number === createUserInput.phone_number ||
        user.email === createUserInput.email ||
        user.user_name === createUserInput.user_name,
    );

    if (isUserAlreadyExists) {
      throw new HttpException(
        {
          message: 'User Credentials Already Exists',
          varaint: 'error',
          detailedMessage:
            'Please provide a unique credentials to create a user',
        },
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await super.create(createUserInput);
    console.log('🚀 ~ createUser ~ newUser:', newUser);

    return newUser;
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
    id: number,
  ): Promise<User> {
    if (!id) {
      throw new HttpException(
        {
          message: 'Id cannot be Null',
          varaint: 'error',
          detailedMessage: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      updateUserInput.user_name === '' ||
      updateUserInput.phone_number === '' ||
      updateUserInput.password === '' ||
      updateUserInput.email === '' ||
      updateUserInput.address === ''
    ) {
      throw new HttpException(
        {
          message: 'User Details Cannot Be Empty',
          varaint: 'error',
          detailedMessage: 'Bad Request to Create User',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userList = this.findAll();

    const isUserAlreadyExists = (await userList).find(
      (user) =>
        user.phone_number === updateUserInput.phone_number ||
        user.email === updateUserInput.email ||
        user.user_name === updateUserInput.user_name,
    );

    if (isUserAlreadyExists) {
      throw new HttpException(
        {
          message: 'User Credentials Already Exists',
          varaint: 'error',
          detailedMessage:
            'Please provide a unique credentials to create a user',
        },
        HttpStatus.CONFLICT,
      );
    }
    const updatedUser = await super.update(updateUserInput.id, updateUserInput);
    console.log('🚀 ~ updateUser ~ updatedUser:', updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number) {
    console.log('🚀 ~ deleteUser ~ id:', id);
    const temp = await this.knex('user')
      .select('address', 'email', 'password', 'id', 'phone_number', 'user_name')
      .where({ id: id })
      .del();
    console.log('🚀 ~ deleteUser ~ temp:', temp);

    return `The user with the id : ${id} has been deleted`;
  }
}
