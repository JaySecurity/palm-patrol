const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  userName: String,
  discription: String,
  photos: [],
}
{ timestamps: true }
);
const reportSchema = new mongoose.Schema(
  {
    incidentData: Date,
    catagory: {
      type: String,
      enum: ["Theft", "Vandalism", "Lost&Found", "Other"],
      required: true,
    },
    location: { address: String, lat: Number, long: Number },
    description: String,
    photo: [],
    comments: [commentSchema],
  },

  { timestamps: true }
);
module.exports = mongoose.model("Report", reportSchema);
