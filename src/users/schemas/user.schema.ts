
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ type: [String], default: [] })
  favoriteCuisines: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

