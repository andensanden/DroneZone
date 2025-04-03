import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Login } from "./pages/Login";
import {Guidelines} from "./pages/Guidelines";
import { Account } from "./pages/account";
import { CreateAccount } from "./pages/CreateAccount";



function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guidelines" element={<Guidelines/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/createaccount" element={<CreateAccount/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
