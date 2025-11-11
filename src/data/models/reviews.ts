import mongoose, { Schema, Types } from "mongoose";

const userReviewSchema = new Schema(
  {
    score: {
      type: Number,
      required: false, // since @NotNull wasn't used here
    },
    movie: {
      type: Types.ObjectId,
      ref: "Movie",
      required: true, // @NotNull
    },
    content: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true, // @NotNull
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserReview = mongoose.model("UserReview", userReviewSchema);

export default UserReview;
