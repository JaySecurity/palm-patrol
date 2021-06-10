const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
    photos: [],
  },
  { timestamps: true }
);
const reportSchema = new Schema(
  {
    incidentData: Date,
    category: {
      type: String,
      enum: ['Theft', 'Vandalism', 'Lost&Found', 'Other'],
      required: true,
    },
    location: { address: String, lat: Number, long: Number },
    description: String,
    photo: [],
    comments: [commentSchema],
  },

  { timestamps: true }
);
module.exports = mongoose.model('Report', reportSchema);
