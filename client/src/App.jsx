import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast"
import Home from "./pages/Home";
import Canvas from "./pages/Canvas";



const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/canvas" element={<Canvas/>} />
    </Routes>
    <Toaster position="top-right"/>
   </Router>
  )
}

export default App;