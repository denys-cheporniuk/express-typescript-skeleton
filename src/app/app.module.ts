import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';
import { DateScalar } from '@/modules/common/scalars/date.scalar';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { UserModule } from '@/modules/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['../**/*.schema.graphql'],
      installSubscriptionHandlers: true
    }),

    PrismaModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar]
})
export class AppModule {}
