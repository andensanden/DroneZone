import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Login } from "./pages/Login";


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
