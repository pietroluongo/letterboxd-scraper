import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // equivalent to @NotBlank
      trim: true,
    },
    email: {
      type: String,
      required: true, // @NotBlank
      unique: true, // @Indexed(unique = true)
      trim: true,
    },
    externalId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // @NotBlank
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    events: [
      {
        type: Types.ObjectId,
        ref: "Event",
      },
    ],
    letterboxdId: {
      type: String,
      unique: true,
      index: true, // Mongoose automatically creates an ascending index
    },
    reviews: [
      {
        type: Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
