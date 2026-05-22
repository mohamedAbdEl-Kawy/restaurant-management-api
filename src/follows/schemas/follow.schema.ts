
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Follow {
  @Prop({ required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, index: true })
  restaurantId: Types.ObjectId;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
FollowSchema.index({ userId: 1, restaurantId: 1 }, { unique: true });

