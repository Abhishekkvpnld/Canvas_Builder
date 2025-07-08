import { useState } from "react";
import toast from "react-hot-toast";

const RectangleInputPopup = ({ onAddRectangle, onClose }) => {
    const [rectData, setRectData] = useState({
        x: 50,
        y: 60,
        width: 120,
        height: 80,
        color: "#FF0000"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRectData((prev) => ({
            ...prev,
            [name]: name === "color" ? value : parseInt(value)
        }));
    };

    const handleSubmit = () => {
        if (!rectData.color || !rectData.height || !rectData.width || !rectData.x || !rectData.y) {
            return toast.error("Fill the details")
        }
        onAddRectangle(rectData);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-400/50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-md w-[350px] shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add Rectangle</h2>

                {/* X */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">X Position</label>
                    <input
                        type="number"
                        name="x"
                        value={rectData.x}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Y */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Y Position</label>
                    <input
                        type="number"
                        name="y"
                        value={rectData.y}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Width */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Width</label>
                    <input
                        type="number"
                        name="width"
                        value={rectData.width}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Height */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Height</label>
                    <input
                        type="number"
                        name="height"
                        value={rectData.height}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Color */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Color</label>
                    <input
                        type="color"
                        name="color"
                        value={rectData.color}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1 h-[40px]"
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

export default RectangleInputPopup;
