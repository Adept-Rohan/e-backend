import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,

      useFactory: () => ({
        playground: false,
        sortSchema: true,
        introspection: true,
        autoSchemaFile: join(__dirname, 'schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: ({ res, req }: { res: Response; req: Request }) => ({
          res,
          req,
        }),
      }),
    }),
  ],
})
export class AppModule {}
