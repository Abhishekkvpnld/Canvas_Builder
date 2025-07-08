import { useState } from "react";
import toast from "react-hot-toast";

const CircleInputPopup = ({ onAddCircle, onClose }) => {
    const [circleData, setCircleData] = useState({
        x: 300,
        y: 80,
        r: 20,
        color: "#0000FF"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCircleData((prev) => ({
            ...prev,
            [name]: name === "color" ? value : parseInt(value)
        }));
    };

    const handleSubmit = () => {
        if (!circleData.x || !circleData.y || !circleData.color || !circleData.r) {
            return toast.error("Fill the details")
        }
        onAddCircle(circleData);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-400/50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-md w-[350px] shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add Circle</h2>

                {/* X */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">X Position</label>
                    <input
                        type="number"
                        name="x"
                        value={circleData.x}
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
                        value={circleData.y}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Radius */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Radius</label>
                    <input
                        type="number"
                        name="r"
                        value={circleData.r}
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
                        value={circleData.color}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1 h-[40px]"
                    />
                </div>

                <div className="flex justify-end mt-4 gap-3">
                    <button onClick={onClose} className="px-4 py-1 bg-gray-500 text-white rounded">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-1 bg-blue-600 text-white rounded">Add</button>
                </div>
            </div>
        </div>
    );
};

export default CircleInputPopup;
