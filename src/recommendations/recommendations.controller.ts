
import { Controller, Get, Param } from "@nestjs/common";
import { RecommendationsService } from "./recommendations.service";

@Controller('recommendations')
export class RecommendationsController {
  constructor(private service: RecommendationsService) {}

  @Get(':userId')
  recommend(@Param('userId') userId: string) {
    return this.service.recommend(userId);
  }
}

