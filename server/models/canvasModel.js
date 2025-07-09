import mongoose from "mongoose";

const rectangleSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  color: String,
});

const circleSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  r: Number,
  color: String,
});

const textSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  text: String,
  font: String,
  color: String,
});

const imageSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  src: String,
  width: Number,
  height: Number,
});

const canvasSchema = new mongoose.Schema(
  {
    width: { type: Number, default: 800 },
    height: { type: Number, default: 600 },

    rectangles: [rectangleSchema],
    circles: [circleSchema],
    texts: [textSchema],
    images: [imageSchema],

    pdfUrl: { type: String }, // Cloudinary PDF URL
  },
  { timestamps: true }
);


const canvasModel = mongoose.model("Canvas",canvasSchema);
export default canvasModel;