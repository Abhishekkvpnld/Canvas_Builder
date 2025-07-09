import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home";
import Canvas from "./pages/Canvas";
import CreatedCanvas from "./pages/CreatedCanvas";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/saved" element={<CreatedCanvas />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  )
}

export default App;