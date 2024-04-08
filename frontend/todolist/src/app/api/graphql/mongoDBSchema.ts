const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: Number,
  taskName: String,
  description: String,
});

export default mongoose.model.t;
