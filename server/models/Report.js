const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    description: String,
    photos: [],
  },
  { timestamps: true }
);
const reportSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    incidentData: Date,
    category: {
      type: String,
      enum: ["Accident", "Theft", "Vandalism", "Lost&Found", "Other"],
      required: true,
    },
    location: { address: String, lat: Number, long: Number },
    description: String,
    photos: [
      {
        key: String,
        url: String,
      },
    ],
    comments: [commentSchema],
  },

  { timestamps: true }
);
module.exports = mongoose.model("Report", reportSchema);
