
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { FollowsModule } from './follows/follows.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    RestaurantsModule,
    FollowsModule,
    RecommendationsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.Mongo_URI!),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

