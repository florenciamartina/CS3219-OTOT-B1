import mongoose from "mongoose";

var Schema = mongoose.Schema;
let DiveLogModelSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  },
});

export default mongoose.model("DiveLogModel", DiveLogModelSchema);
