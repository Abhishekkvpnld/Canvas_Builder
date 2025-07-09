import PDFDocument from "pdfkit";
import { Readable } from "stream";
import cloudinary from "../utils/cloudinaryConfig.js";
import Canvas from "../models/canvasModel.js";

export const addCanvas = async (req, res) => {
  try {
    const {
      image,
      height,
      width,
      rectangle = [],
      circle = [],
      text = [],
    } = req.body;


    if (!image || !width || !height) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Image, width and height are required.",
      });
    }

    const doc = new PDFDocument({ size: [width, height] });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(chunks);

      // Upload PDF to Cloudinary
      const cloudStream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "canvas_pdfs" },
        async (err, result) => {
          if (err) {
            console.error("Cloudinary Upload Error:", err);
            return res
              .status(500)
              .json({ success: false, message: "Cloudinary upload failed" });
          }

          //   Save to MongoDB
          const canvasDoc = new Canvas({
            width,
            height,
            rectangles: rectangle,
            circles: circle,
            texts: text,
            pdfUrl: result.secure_url,
          });

          await canvasDoc.save();

          res.status(201).json({
            error: false,
            success: true,
            message: "Canvas saved and PDF uploaded",
            data: canvasDoc,
          });
        }
      );

      // Pipe PDF buffer to Cloudinary stream
      Readable.from(pdfBuffer).pipe(cloudStream);
    });

    //  Draw image to PDF
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, "base64");
    doc.image(imgBuffer, 0, 0, { width, height });
    doc.end();
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const fetchCanvas = async (req, res) => {
  try {
    const allCanvas = await Canvas.find();

    return res.status(200).json({
      success: true,
      error: false,
      data: allCanvas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error?.message,
    });
  }
};

export const DeleteCanvas = async (req, res) => {
  try {
    const { id } = req.params;

    const check = await Canvas.findById(id);
    if (!check) throw new Error("Canvas can not found");

    const deleteCanvas = await Canvas.deleteOne({_id:id});
    return res.status(200).json({
      success: true,
      error: false,
      data: deleteCanvas,
      message:"Canvas deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error?.message,
    });
  }
};
