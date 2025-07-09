
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import moment from "moment";
import { BASE_URL } from "../utils/api";
import Navbar from "../components/Navbar";


const CreatedCanvas = () => {
    const [canvases, setCanvases] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCanvases = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/canvas/all`);
            setCanvases(res?.data?.data);
        } catch (err) {
            toast.error("Failed to fetch canvas data");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this canvas?")) return;

        try {
            const res = await axios.delete(`${BASE_URL}/canvas/delete/${id}`);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setCanvases((prev) => prev.filter((item) => item._id !== id));
            }
        } catch (err) {
            toast.error("Failed to delete canvas");
        }
    };

    useEffect(() => {
        fetchCanvases();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="w-full flex items-center justify-center">
                <Navbar />
            </div>

            <h2 className="text-2xl mt-4 font-semibold mb-6 text-center">🎨 Saved Canvases</h2>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : canvases.length === 0 ? (
                <p className="text-center">No canvases found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {canvases?.map((canvas) => (
                        <div key={canvas._id} className="bg-white p-4 rounded-md shadow flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold">Canvas ID: {canvas?._id.slice(-6)}</h3>
                                <p className="text-sm text-gray-600">Size: {canvas?.width} × {canvas?.height}</p>
                                <p className="text-sm text-gray-500 font-semibold flex items-center">Saved on:<span className="ml-1 text-green-600">{moment(canvas?.updatedAt).format("MMMM D, YYYY h:mm A")}</span></p>
                            </div>

                            <div className="flex gap-3 justify-end mt-4">
                                <a
                                    href={canvas?.pdfUrl}
                                    target="_blank"
                                    download={`canvas_${canvas?._id}.pdf`}
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-2 text-sm hover:bg-blue-700"
                                >
                                    <FaDownload /> Download
                                </a>
                                <button
                                    onClick={() => handleDelete(canvas?._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2 text-sm hover:bg-red-700"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreatedCanvas;
