import { useNavigate } from "react-router-dom"


const Navbar = () => {

    const navigate = useNavigate();

    //handle reset function
    const handleReset = () => {
        const confirmReset = window.confirm("Do you want to create a new canvas?");
        if (confirmReset) {
            navigate("/");
        }
    };
    return (
        <div className="relative shadow-2xl mt-2 px-4 py-2 flex items-center justify-between rounded-full w-[90%] bg-blue-600">
            {/* Left side - Canvas title */}
            <h1
                onClick={() => navigate("/")}
                className="cursor-pointer bg-white px-4 py-1 rounded-full shadow-md text-blue-500 font-medium hover:bg-black hover:text-white hover:font-semibold hover:scale-110 transition transform duration-300"
            >
                Canvas
            </h1>

            {/* Right side - Saved & New options */}
            <div className="flex items-center gap-8">
                <h1 onClick={()=>navigate("/saved")} className="font-semibold text-white hover:scale-105 hover:font-bold transition duration-300 cursor-pointer">
                    Saved
                </h1>
                <h1 onClick={handleReset} className="font-semibold text-white hover:scale-110 hover:font-bold transition duration-300 cursor-pointer">
                    New
                </h1>
            </div>
        </div>

    )
}

export default Navbar