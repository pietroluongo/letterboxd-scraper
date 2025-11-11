import mongoose, { Schema, Types } from "mongoose";

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // equivalent to @NotBlank
      trim: true,
    },
    externalId: {
      type: String,
      required: true, // equivalent to @NotBlank
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: true, // equivalent to @NotNull
    },
    reviews: {
      type: Types.ObjectId,
      ref: "Review", // assuming you have a Review model
    },
  },
  {
    timestamps: true, // optional, adds createdAt and updatedAt
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
