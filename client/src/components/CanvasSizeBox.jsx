

const CanvasSizeBox = ({ width, setHeight, setWidth, height, handleCreateCanvas }) => {

    return (
        <div className="mt-6 bg-white text-gray-800 rounded-xl shadow-md p-6 w-full max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Canvas Size</h2>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <label className="text-md font-medium">Width (px):</label>
                    <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-24 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <label className="text-md font-medium">Height (px):</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-24 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={handleCreateCanvas}
                    className="mt-6 bg-gradient-to-r cursor-pointer from-blue-500 to-red-600 hover:from-red-600 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md"
                >
                    Create Canvas
                </button>
            </div>
        </div>
    );
};

export default CanvasSizeBox;