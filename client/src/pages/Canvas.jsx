import { useEffect, useRef, useState } from "react";
import CanvasSizeBox from "../components/CanvasSizeBox"
import Navbar from "../components/Navbar"
import toast from "react-hot-toast";
import ButtonContainer from "../components/ButtonContainer";
import RectangleInputPopup from "../components/RectangleInputPopup";
import CircleInputPopup from "../components/CircleInputPopup";
import TextInputPopup from "../components/TextInputPopup";
import ImageInputPopup from "../components/ImageInputPopup";

const Canvas = () => {
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [openCanvas, setOpenCanvas] = useState(false);
    const [openSizeBox, setOpenSizeBox] = useState("")
    const [circle, setCircle] = useState([]);
    const [rectangle, setRectangle] = useState([]);
    const [text, setText] = useState([]);
    const [images, setImages] = useState([]);

    const canvasRef = useRef(null);

    const handleCreateCanvas = () => {
        console.log("Canvas Created:", width, height);
        if (!width || !height) {
            toast.error("Set your canvas dimension first")
        }

        setOpenCanvas(true)
    };


    // console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅", rectangle);
    // console.log("❌❌❌❌❌❌❌❌❌", circle);
    // console.log("🔃🔃🔃🔃🔃🔃🔃🔃🔃🔃", text);
    // console.log('🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️🤦‍♂️', images)


    // useEffect(() => {
    //     if (openCanvas) {
    //         const canvasData = canvasRef.current;
    //         const ctx = canvasData.getContext("2d");

    //         ctx.clearRect(0, 0, canvasData.width, canvasData.height);

    //         // Rectangles
    //         rectangle.forEach(rect => {
    //             ctx.fillStyle = rect.color;
    //             ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    //         });

    //         // Circles
    //         circle.forEach(c => {
    //             ctx.beginPath();
    //             ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    //             ctx.fillStyle = c.color;
    //             ctx.fill();
    //             ctx.closePath();
    //         });

    //         // Text
    //         text.forEach(t => {
    //             ctx.font = t.font;
    //             ctx.fillStyle = t.color;
    //             ctx.fillText(t.text, t.x, t.y);
    //         });

    //         // Images
    //         images.forEach(img => {
    //             const imageObj = new Image();
    //             imageObj.crossOrigin = "anonymous";
    //             imageObj.src = img.imageUrl;
    //             imageObj.onload = () => {
    //                 ctx.drawImage(imageObj, img.x, img.y, 150, 150);
    //             };
    //         });
    //     }
    // }, [openCanvas, rectangle, circle, text, images]);


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
                    ctx.drawImage(imageObj, img.x, img.y, 150, 150);
                };
            });
        }
    }, [openCanvas, rectangle, circle, text, images]);


    return (
        <div className="min-h-screen min-w-screen flex flex-col items-center bg-slate-200">
            <Navbar />
            {openCanvas
                ?
                <div className="flex flex-col items-start justify-center mt-5 mb-1">
                    <div className="w-full flex items-center gap-4 justify-between">
                        <ButtonContainer setOpenSizeBox={setOpenSizeBox} />

                        <div className="flex items-center w justify-between gap-2">
                            <div className="flex items-center justify-center">
                                <label htmlFor="width">Width:</label>
                                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} name="width" id="width" className="border w-20 px-1 rounded-md" />
                            </div>

                            <div className="flex items-center justify-center">
                                <label htmlFor="height">Height:</label>
                                <input value={height} type="number" onChange={(e) => setHeight(e.target.value)} name="height" className="border rounded-md w-20 px-1" id="height" />
                            </div>
                        </div>
                    </div>

                    <canvas
                        ref={canvasRef}
                        width={width}
                        height={height}
                        className="mt-5 mb-3 bg-white overflow-x-scroll rounded-md border border-slate-200"
                    />
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