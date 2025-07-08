import { FaRegSquareFull } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { PiTextAaBold } from "react-icons/pi";
import { IoMdImage } from "react-icons/io";


const ButtonContainer = ({ setOpenSizeBox }) => {
    return (
        <div className="flex items-center justify-center gap-3 bg-slate-600 w-[11rem] p-1 rounded-md">
            <div onClick={() => setOpenSizeBox("rectangle")} className="p-2 border bg-white border-slate-300 rounded cursor-pointer"><FaRegSquareFull title="Add Rectangle" className="rounded hover:scale-110 hover:bg-red-400 text-red-800 hover:font-bold transition" /></div>
            <div onClick={() => setOpenSizeBox('circle')} className="p-2 border bg-white border-slate-300 rounded cursor-pointer"><FaRegCircle title="Add Circle" className="rounded hover:scale-110 text-red-800 hover:font-bold transition" /></div>
            <div onClick={() => setOpenSizeBox('text')} className="p-2 border bg-white border-slate-300 rounded cursor-pointer"><PiTextAaBold title="Add Text" className="rounded hover:scale-110 text-red-800 hover:font-bold transition" /></div>
            <div onClick={() => setOpenSizeBox("image")} className="p-2 border bg-white border-slate-300 rounded cursor-pointer"><IoMdImage title="Add Image" className="rounded hover:scale-110 text-red-800 hover:font-bold transition" /></div>
        </div>
    )
}

export default ButtonContainer