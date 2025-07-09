import { useState } from "react";
import toast from "react-hot-toast";

const ImageInputPopup = ({ onAddImage, onClose }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [x, setX] = useState(50);
    const [y, setY] = useState(50);
    const [width, setWidth] = useState(150);
    const [height, setHeight] = useState(150);

    const handleSubmit = () => {
        if (!imageUrl) return toast.error("Provide image URL");
        if (!x || !y || !width || !height) return toast.error("Fill all data");
        onAddImage({ imageUrl, x, y, width, height });
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-400/50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-md w-[350px] shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add Image</h2>

                {/* Image URL */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Image URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* X Position */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">X Position</label>
                    <input
                        type="number"
                        value={x}
                        onChange={(e) => setX(parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Y Position */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Y Position</label>
                    <input
                        type="number"
                        value={y}
                        onChange={(e) => setY(parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Width */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Width</label>
                    <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Height */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Height</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-4 gap-3">
                    <button onClick={onClose} className="px-4 py-1 bg-gray-500 text-white rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-1 bg-blue-600 text-white rounded">Add</button>
                </div>
            </div>
        </div>
    );
};

export default ImageInputPopup;
