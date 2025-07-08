import { useState } from "react";

const TextInputPopup = ({ onAddText, onClose }) => {
    const [textData, setTextData] = useState({
        text: "Hello, Abhishek!",
        x: 50,
        y: 50,
        font: "20px Arial",
        color: "#000000"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTextData((prev) => ({
            ...prev,
            [name]: name === "x" || name === "y" ? parseInt(value) : value
        }));
    };

    const handleSubmit = () => {
        onAddText(textData);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-400/50 flex items-center justify-center z-50">

            <div className="bg-white p-5 rounded-md w-[350px] shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add Text</h2>

                {/* Text */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Text</label>
                    <input
                        type="text"
                        name="text"
                        value={textData.text}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* X */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">X Position</label>
                    <input
                        type="number"
                        name="x"
                        value={textData.x}
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
                        value={textData.y}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-1"
                    />
                </div>

                {/* Font */}
                <div className="mb-3">
                    <label className="block text-sm mb-1 font-medium">Font</label>
                    <input
                        type="text"
                        name="font"
                        value={textData.font}
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
                        value={textData.color}
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

export default TextInputPopup;
