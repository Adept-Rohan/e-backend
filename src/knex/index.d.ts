import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface KnexUser {
    id: number;
    user_name: string;
    password: string;
    phone_number: string;
    email: string;
    address: string;
  }

  interface Tables {
    user: Knex.CompositeTableType<
      KnexUser,
      Omit<KnexUser, 'id'>,
      Partial<Pick<KnexUser>, 'id'>
    >;
  }
}
