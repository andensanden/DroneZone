import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Login } from "./pages/Login";
import {Guidelines} from "./pages/Guidelines";
import { Account } from "./pages/Account";
import { CreateAccount } from "./pages/CreateAccount";
import { useGetUserAuth } from "@/hooks/useGetUserAuth";
import { Info } from "@/pages/info";


function App() {

  //Hook that gets user auth state / listens for auth changes. 
  // Always keeps application state in sync and ensures correct user experience
  useGetUserAuth();

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
        <Route path="/info" element={<Info/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer position="bottom-right" />
    </>
  )
}

export default App
