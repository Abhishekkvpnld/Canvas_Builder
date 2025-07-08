import { useNavigate } from "react-router-dom"


const Navbar = () => {

    const navigate = useNavigate();

    return (
        <div className="relative shadow-2xl mt-4 px-4 py-2 flex items-center justify-between rounded-full w-[90%] bg-blue-600">
            {/* Left side - Canvas title */}
            <h1
                onClick={() => navigate("/")}
                className="cursor-pointer bg-white px-4 py-1 rounded-full shadow-md text-blue-500 font-medium hover:bg-black hover:text-white hover:font-semibold hover:scale-110 transition transform duration-300"
            >
                Canvas
            </h1>

            {/* Right side - Saved & New options */}
            <div className="flex items-center gap-8">
                <h1 className="font-semibold text-white hover:scale-105 hover:font-bold transition duration-300 cursor-pointer">
                    Saved
                </h1>
                <h1 className="font-semibold text-white hover:scale-110 hover:font-bold transition duration-300 cursor-pointer">
                    New
                </h1>
            </div>
        </div>

    )
}

export default Navbar