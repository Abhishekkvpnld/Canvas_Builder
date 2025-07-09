import { useEffect, useRef, useState } from "react";
import CanvasSizeBox from "../components/CanvasSizeBox"
import Navbar from "../components/Navbar"
import toast from "react-hot-toast";
import ButtonContainer from "../components/ButtonContainer";
import RectangleInputPopup from "../components/RectangleInputPopup";
import CircleInputPopup from "../components/CircleInputPopup";
import TextInputPopup from "../components/TextInputPopup";
import ImageInputPopup from "../components/ImageInputPopup";
import { IoSaveOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { ImSpinner2 } from "react-icons/im";



const Canvas = () => {
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [openCanvas, setOpenCanvas] = useState(false);
    const [openSizeBox, setOpenSizeBox] = useState("")
    const [circle, setCircle] = useState([]);
    const [rectangle, setRectangle] = useState([]);
    const [text, setText] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const canvasRef = useRef(null);


    const handleCreateCanvas = () => {
        if (!width || !height) {
            toast.error("Set your canvas dimension first")
        }

        setOpenCanvas(true)
    };

    const handleSave = async () => {
        const canvas = canvasRef.current;

        if (!canvas) {
            toast.error("Canvas not found.");
            return;
        }

        const imageData = canvas.toDataURL("image/png");

        try {
            setLoading(true);

            const response = await axios.post(`${BASE_URL}/canvas/add`, {
                image: imageData,
                height,
                width,
                rectangle,
                circle,
                text,
            });

            const data = response?.data;

            if (data?.success) {
                toast.success(data?.message || "Canvas saved!");
                if (data?.data?.pdfUrl) {
                    window.open(data?.data?.pdfUrl, "_blank");
                }
            }
             else {
                toast.error(data?.message || "Failed to save canvas");
            }

        } catch (error) {
            console.error("Upload failed:", error);
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong while saving the canvas."
            );
        } finally {
            setLoading(false);
        }
    };


    const handleAddRectangle = (data) => setRectangle((prev) => [...prev, data]);
    const handleAddCircle = (data) => setCircle((prev) => [...prev, data]);
    const handleAddText = (data) => setText((prev) => [...prev, data]);
    const handleAddImage = (data) => setImages(prev => [...prev, data]);

    useEffect(() => {
        if (openCanvas) {
            const canvasData = canvasRef.current;
            const ctx = canvasData.getContext("2d");

            ctx.clearRect(0, 0, canvasData.width, canvasData.height);

            // Rectangles
            rectangle.forEach(rect => {
                ctx.fillStyle = rect.color;
                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            });

            // Circles
            circle.forEach(c => {
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
                ctx.fillStyle = c.color;
                ctx.fill();
                ctx.closePath();
            });

            // Text
            text.forEach(t => {
                ctx.font = t.font;
                ctx.fillStyle = t.color;
                ctx.fillText(t.text, t.x, t.y);
            });

            // Images
            images.forEach(img => {
                const imageObj = new Image();
                imageObj.crossOrigin = "anonymous";
                imageObj.src = img.imageUrl;
                imageObj.onload = () => {
                    ctx.drawImage(imageObj, img.x, img.y, img.width, img.height);
                };
            });
        }
    }, [openCanvas, rectangle, circle, text, images]);


    return (
        <div className="min-h-screen min-w-screen flex flex-col items-center bg-slate-200">
            <Navbar />
            {
                openCanvas ?
                    <div className="flex flex-col items-start justify-center mt-5 mb-1">
                        <div className="w-full p-3 flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Left: Buttons */}
                            <div className="w-full md:w-auto flex justify-center">
                                <ButtonContainer setOpenSizeBox={setOpenSizeBox} />
                            </div>

                            {/* Right: Width & Height Inputs */}
                            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto justify-center">
                                {/* Width */}
                                <div className="flex items-center gap-1">
                                    <label htmlFor="width" className="text-black text-sm">Width:</label>
                                    <input
                                        type="number"
                                        value={width}
                                        onChange={(e) => setWidth(e.target.value)}
                                        name="width"
                                        id="width"
                                        className="border w-24 px-2 py-1 rounded-md text-sm"
                                    />
                                </div>

                                {/* Height */}
                                <div className="flex items-center gap-1">
                                    <label htmlFor="height" className="text-black text-sm">Height:</label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        name="height"
                                        id="height"
                                        className="border w-24 px-2 py-1 rounded-md text-sm"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="w-full max-w-full overflow-x-scroll">
                            <canvas
                                ref={canvasRef}
                                width={width}
                                height={height}
                                className="bg-white block rounded border border-slate-300"
                            />

                            <div className="flex justify-center items-center mt-2">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className={`px-4 py-2 mb-4 cursor-pointer flex items-center justify-center gap-2 rounded-xl transition
      ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}
    `}
                                >
                                    {loading ? (
                                        <>
                                            <ImSpinner2 className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <IoSaveOutline />
                                            Save as PDF
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                    :
                    <CanvasSizeBox height={height} width={width} setHeight={setHeight} setWidth={setWidth} handleCreateCanvas={handleCreateCanvas} />
            }

            {openSizeBox == "rectangle" && <RectangleInputPopup onAddRectangle={handleAddRectangle} onClose={() => setOpenSizeBox("")} />}
            {openSizeBox == "circle" && <CircleInputPopup onAddCircle={handleAddCircle} onClose={() => setOpenSizeBox("")} />}
            {openSizeBox == "text" && <TextInputPopup onAddText={handleAddText} onClose={() => setOpenSizeBox("")} />}
            {openSizeBox == "image" && <ImageInputPopup onAddImage={handleAddImage} onClose={() => setOpenSizeBox("")} />}
        </div>
    )
}

export default Canvas